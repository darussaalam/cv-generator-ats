const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  onPanicTriggered: (callback) => ipcRenderer.on('panic-button-triggered', callback),
  onHotkeyTriggered: (callback) => ipcRenderer.on('hotkey-triggered', (_event, id) => callback(id)),
  
  registerHotkey: (id, hotkey) => ipcRenderer.invoke('register-hotkey', { id, hotkey }),
  unregisterHotkey: (hotkey) => ipcRenderer.invoke('unregister-hotkey', hotkey),
  unregisterAllHotkeys: () => ipcRenderer.invoke('unregister-all-hotkeys'),

  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
  openImageDialog: () => ipcRenderer.invoke('open-image-dialog'),
  saveConfig: (config) => ipcRenderer.invoke('save-config', config),
  loadConfig: () => ipcRenderer.invoke('load-config'),
  
  getRemoteUrl: () => ipcRenderer.invoke('get-remote-url'),
  getOverlayUrl: () => ipcRenderer.invoke('get-overlay-url'),
  triggerObsOverlay: (data) => ipcRenderer.invoke('trigger-obs-overlay', data),
  exportConfig: (config) => ipcRenderer.invoke('export-config-dialog', config),
  importConfig: () => ipcRenderer.invoke('import-config-dialog'),
  onRemotePlaySound: (callback) => ipcRenderer.on('remote-play-sound', (_event, id) => callback(id))
});



