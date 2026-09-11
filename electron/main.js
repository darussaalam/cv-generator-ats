import { app, BrowserWindow, globalShortcut, ipcMain, dialog, Tray, Menu, nativeImage } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import os from 'os';

import express from 'express';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let tray = null;
let isQuitting = false;
let currentConfig = { tabs: [], sounds: [] };
let overlayClients = [];

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const SERVER_PORT = 3123;
const localIP = getLocalIP();
const remoteURL = `http://${localIP}:${SERVER_PORT}`;
const overlayURL = `http://${localIP}:${SERVER_PORT}/overlay`;

function startLocalServer() {
  const expApp = express();
  expApp.use(cors());
  expApp.use(express.json());

  // Serve Web Remote Control (For Phone)
  expApp.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>Soundboard Remote</title>
        <style>
          body { background: #1c1c1c; color: white; font-family: sans-serif; margin: 0; padding: 20px; text-align: center; }
          h2 { margin-bottom: 20px; color: #888; }
          .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; max-width: 500px; margin: 0 auto; }
          .key { 
            background: black; border: 2px solid #333; border-radius: 12px;
            aspect-ratio: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;
            cursor: pointer; box-shadow: inset 0 2px 5px rgba(255,255,255,0.1); transition: 0.1s;
          }
          .key:active { transform: scale(0.95); border-color: #0066cc; }
          .icon { font-size: 2em; margin-bottom: 5px; }
          .label { font-size: 10px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 90%; }
        </style>
      </head>
      <body>
        <h2>Soundboard Remote</h2>
        <div class="grid" id="grid"></div>
        <script>
          async function load() {
            const res = await fetch('/config');
            const data = await res.json();
            const grid = document.getElementById('grid');
            grid.innerHTML = '';
            
            const activeProf = data.activeProfileId || (data.tabs && data.tabs[0] ? data.tabs[0].id : 'p1');
            const sounds = (data.sounds || []).filter(s => s.profileId === activeProf && s.type !== 'folder');
            
            sounds.forEach(s => {
              const el = document.createElement('div');
              el.className = 'key';
              el.innerHTML = \`<div class="icon">\${s.icon || '🎵'}</div><div class="label">\${s.name}</div>\`;
              el.onclick = () => fetch('/play/' + s.id, { method: 'POST' });
              grid.appendChild(el);
            });
          }
          load();
          setInterval(load, 5000);
        </script>
      </body>
      </html>
    `);
  });

  // OBS Stream Web Overlay Page (Transparent Background)
  expApp.get('/overlay', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>OBS Sound Overlay</title>
        <style>
          body { margin: 0; background: transparent; overflow: hidden; font-family: 'Segoe UI', sans-serif; }
          #container {
            position: absolute; bottom: 50px; right: 50px;
            display: flex; align-items: center; gap: 15px;
            background: rgba(15, 15, 15, 0.9); border: 2px solid #0066cc;
            padding: 15px 25px; border-radius: 16px; color: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.8);
            opacity: 0; transform: translateY(30px) scale(0.9);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          #container.show { opacity: 1; transform: translateY(0) scale(1); }
          .img { width: 60px; height: 60px; border-radius: 10px; object-fit: cover; }
          .icon { font-size: 40px; }
          .title { font-size: 20px; font-weight: bold; }
          .subtitle { font-size: 12px; color: #0066cc; text-transform: uppercase; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <div id="container">
          <div id="media"></div>
          <div>
            <div class="subtitle">Sound Triggered</div>
            <div class="title" id="title">Airhorn</div>
          </div>
        </div>
        <script>
          const evtSource = new EventSource('/overlay/stream');
          let hideTimeout;
          evtSource.onmessage = (e) => {
            const data = JSON.parse(e.data);
            const container = document.getElementById('container');
            const media = document.getElementById('media');
            const title = document.getElementById('title');
            
            title.innerText = data.name || 'Sound Effect';
            if (data.image) {
              media.innerHTML = \`<img class="img" src="\${data.image}" />\`;
            } else {
              media.innerHTML = \`<div class="icon">\${data.icon || '🎵'}</div>\`;
            }
            
            container.classList.add('show');
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => container.classList.remove('show'), 3000);
          };
        </script>
      </body>
      </html>
    `);
  });

  // SSE Stream for OBS Overlay
  expApp.get('/overlay/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    overlayClients.push(res);
    req.on('close', () => {
      overlayClients = overlayClients.filter(c => c !== res);
    });
  });

  expApp.post('/overlay/trigger', (req, res) => {
    const payload = req.body;
    overlayClients.forEach(client => {
      client.write(`data: ${JSON.stringify(payload)}\n\n`);
    });
    res.json({ success: true });
  });

  expApp.get('/config', (req, res) => {
    res.json(currentConfig);
  });

  expApp.post('/play/:id', (req, res) => {
    if (mainWindow) {
      mainWindow.webContents.send('remote-play-sound', req.params.id);
    }
    res.json({ success: true });
  });

  expApp.listen(SERVER_PORT, '0.0.0.0', () => {
    console.log('Remote server running on', remoteURL);
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1150,
    height: 720,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#141414',
      symbolColor: '#ffffff',
      height: 35
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false
    }
  });

  const isDev = process.env.VITE_DEV_SERVER_URL;
  if (isDev) mainWindow.loadURL(isDev);
  else mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));

  mainWindow.on('close', function (event) {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });
}

function createTray() {
  const icon = nativeImage.createEmpty();
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: () => mainWindow.show() },
    { label: 'Quit', click: () => { isQuitting = true; app.quit(); } }
  ]);
  tray.setToolTip('Soundboard Pro');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => mainWindow.show());
}

app.whenReady().then(() => {
  createWindow();
  createTray();
  startLocalServer();

  globalShortcut.register('CommandOrControl+Shift+P', () => {
    if (mainWindow) mainWindow.webContents.send('panic-button-triggered');
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('get-remote-url', () => remoteURL);
ipcMain.handle('get-overlay-url', () => overlayURL);

ipcMain.handle('trigger-obs-overlay', (event, data) => {
  overlayClients.forEach(client => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
  return true;
});

// IPC Handlers
ipcMain.handle('register-hotkey', (event, { id, hotkey }) => {
  try {
    const success = globalShortcut.register(hotkey, () => {
      if (mainWindow) mainWindow.webContents.send('hotkey-triggered', id);
    });
    return { success, hotkey };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('unregister-hotkey', (event, hotkey) => {
  globalShortcut.unregister(hotkey);
  return true;
});

ipcMain.handle('unregister-all-hotkeys', () => {
  globalShortcut.unregisterAll();
  return true;
});

// File Dialogs
ipcMain.handle('open-file-dialog', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Audio Files', extensions: ['mp3', 'wav', 'ogg'] }]
  });
  return result;
});

ipcMain.handle('open-image-dialog', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Image Files', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp'] }]
  });
  return result;
});

// Export & Import Backup
ipcMain.handle('export-config-dialog', async (event, configData) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: 'Backup Soundboard Config',
    defaultPath: 'soundboard_backup.json',
    filters: [{ name: 'JSON Files', extensions: ['json'] }]
  });
  if (!result.canceled && result.filePath) {
    await fs.writeFile(result.filePath, JSON.stringify(configData, null, 2));
    return { success: true, filePath: result.filePath };
  }
  return { success: false };
});

ipcMain.handle('import-config-dialog', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Import Soundboard Backup',
    properties: ['openFile'],
    filters: [{ name: 'JSON Files', extensions: ['json'] }]
  });
  if (!result.canceled && result.filePaths.length > 0) {
    const content = await fs.readFile(result.filePaths[0], 'utf-8');
    const parsed = JSON.parse(content);
    return { success: true, data: parsed };
  }
  return { success: false };
});

// Config Persistence
const getConfigPath = () => path.join(app.getPath('userData'), 'soundboard_config_v5.json');

ipcMain.handle('save-config', async (event, config) => {
  try {
    currentConfig = config;
    await fs.writeFile(getConfigPath(), JSON.stringify(config, null, 2));
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('load-config', async () => {
  try {
    const data = await fs.readFile(getConfigPath(), 'utf-8');
    const parsed = JSON.parse(data);
    currentConfig = parsed;
    return { success: true, data: parsed };
  } catch (err) {
    return { success: false, error: err.message };
  }
});
