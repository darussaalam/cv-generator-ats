import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const initialEmptyState = {
  personal: {
    fullName: '',
    headline: '',
    location: '',
    email: '',
    phone: '',
    linkedin: '',
    website: '',
    portfolio: '',
    github: '',
  },
  summary: '',
  experiences: [
    {
      id: 'exp-1',
      position: '',
      company: '',
      period: '',
      location: '',
      bullets: '',
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: '',
      institution: '',
      period: '',
      gpa: '',
      details: '',
    },
  ],
  skills: {
    technical: '',
    methodologies: '',
    languages: '',
  },
  projects: [
    {
      id: 'proj-1',
      name: '',
      role: '',
      link: '',
      description: '',
    },
  ],
};

const sampleData = {
  personal: {
    fullName: 'ALYA PRATIWI SARI',
    headline: 'UI/UX Designer | Frontend Developer | Design Systems & Web Performance',
    location: 'Jakarta, Indonesia',
    email: 'alya.pratiwi.sari@example.com',
    phone: '+62 811-9876-5432',
    linkedin: 'https://www.linkedin.com/in/alya-pratiwi-sari',
    website: 'https://alyapratiwi.design',
    portfolio: 'https://portfolio.alyapratiwi.design',
    github: 'https://github.com/alyapratiwi',
  },
  summary:
    'UI/UX Designer and Frontend Developer with 5+ years crafting user-centered digital products, design systems, and performant web interfaces. Experienced in Figma, Design Thinking, React, Next.js, Tailwind CSS, accessibility, and cross-functional collaboration from research to launch. Passionate about bridging design and code for inclusive user experiences across web and mobile platforms.',
  experiences: [
    {
      id: 'exp-1',
      position: 'Senior UI/UX Designer',
      company: 'Luna Tech Studio',
      period: 'Jan 2023 - Present',
      location: 'Jakarta, Indonesia',
      bullets:
        'Lead end-to-end design for SaaS analytics dashboard serving 50k+ monthly active users, improving task completion rate by 35% through usability testing and iterative prototyping.\nBuilt and maintained Luna Design System in Figma with 200+ components, tokens, and documentation, reducing design to development handoff time by 40%.\nPartnered with frontend engineering team to ensure WCAG 2.1 AA accessibility compliance across all customer-facing web applications.',
    },
    {
      id: 'exp-2',
      position: 'Frontend Developer & UI Designer',
      company: 'Nusantara Digital Solutions',
      period: 'Jul 2020 - Des 2022',
      location: 'Bandung, Indonesia',
      bullets:
        'Developed and maintained 12+ responsive web applications using React, Next.js, and Tailwind CSS.\nOptimized Core Web Vitals across e-commerce portals, increasing Lighthouse performance scores from 64 to 96 and reducing bounce rates.\nCollaborated with product managers and stakeholders to conduct 20+ user interview sessions and translate insights into functional prototypes.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Sarjana Ilmu Komputer (S.Kom)',
      institution: 'Universitas Indonesia',
      period: '2016 - 2020',
      gpa: 'IPK 3.82 / 4.00',
      details: 'Fokus Rekayasa Perangkat Lunak dan Interaksi Manusia & Komputer.',
    },
  ],
  skills: {
    technical: 'Figma, React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, REST APIs, Git',
    methodologies: 'Design Systems, User Research, Usability Testing, Wireframing, Prototyping, Agile/Scrum, WCAG AA Accessibility',
    languages: 'Bahasa Indonesia (Native), English (Professional Working Proficiency)',
  },
  projects: [
    {
      id: 'proj-1',
      name: 'Enterprise Analytics Portal',
      role: 'Lead Designer & Frontend Architect',
      link: 'https://alyapratiwi.design/projects/analytics',
      description:
        'Redesain arsitektur informasi dan antarmuka analitik B2B dengan integrasi data real-time, meningkatkan engagement mingguan sebesar 28%.',
    },
  ],
};

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [data, setData] = useState(initialEmptyState);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const fileInputRef = useRef(null);

  // Theme setup (Light & Dark Mode)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('kangcv_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kangcv_theme', theme);
  }, [theme]);

  // PWA beforeinstallprompt listener
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleInstallApp = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
          showToast('Terima kasih telah menginstall Kang CV Mu!');
        }
        setInstallPrompt(null);
      });
    } else {
      showToast(
        'Untuk install di HP: buka menu browser (ikon titik tiga) lalu pilih "Tambahkan ke Layar Utama" / "Install App".'
      );
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3600);
  };

  const handlePersonalChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  const handleSummaryChange = (value) => {
    setData((prev) => ({
      ...prev,
      summary: value,
    }));
  };

  // Dynamic Experience Handlers
  const handleAddExperience = () => {
    const newId = `exp-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: newId,
          position: '',
          company: '',
          period: '',
          location: '',
          bullets: '',
        },
      ],
    }));
  };

  const handleRemoveExperience = (id) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((item) => item.id !== id),
    }));
  };

  const handleExperienceChange = (id, field, value) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Dynamic Education Handlers
  const handleAddEducation = () => {
    const newId = `edu-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: newId,
          degree: '',
          institution: '',
          period: '',
          gpa: '',
          details: '',
        },
      ],
    }));
  };

  const handleRemoveEducation = (id) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  const handleEducationChange = (id, field, value) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Dynamic Project Handlers
  const handleAddProject = () => {
    const newId = `proj-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: newId,
          name: '',
          role: '',
          link: '',
          description: '',
        },
      ],
    }));
  };

  const handleRemoveProject = (id) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }));
  };

  const handleProjectChange = (id, field, value) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Skills Handlers
  const handleSkillsChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [field]: value,
      },
    }));
  };

  // Toolbar Actions
  const handleLoadSample = () => {
    setData(JSON.parse(JSON.stringify(sampleData)));
    setHasGenerated(true);
    showToast('Data contoh berhasil dimuat.');
  };

  const handleLoadSampleAndOpenBuilder = () => {
    setData(JSON.parse(JSON.stringify(sampleData)));
    setHasGenerated(true);
    setCurrentView('builder');
    showToast('Data contoh dimuat ke editor CV.');
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const filename = data.personal.fullName
      ? `CV-${data.personal.fullName.replace(/\s+/g, '_')}.json`
      : 'CV-Data.json';
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Data CV berhasil diekspor ke format JSON.');
  };

  const processJsonFile = (file) => {
    if (!file || !file.name.endsWith('.json')) {
      showToast('Harap pilih berkas berekstensi .json');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!parsed.personal) {
          throw new Error('Format JSON tidak valid.');
        }
        setData(parsed);
        setHasGenerated(true);
        showToast('Berkas JSON berhasil diimpor.');
      } catch (err) {
        showToast('Gagal membaca berkas JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processJsonFile(file);
    }
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processJsonFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleGenerate = () => {
    if (!data.personal.fullName.trim()) {
      showToast('Nama Lengkap wajib diisi sebelum membuat preview.');
      return;
    }
    setHasGenerated(true);
    showToast('Preview dokumen ATS berhasil diperbarui.');
  };

  const handleDownloadPDF = () => {
    if (!hasGenerated) {
      if (!data.personal.fullName.trim()) {
        showToast('Lengkapi nama lengkap terlebih dahulu.');
        return;
      }
      setHasGenerated(true);
    }

    setTimeout(() => {
      window.print();
    }, 150);
  };

  const parseBullets = (bulletsText) => {
    if (!bulletsText) return [];
    return bulletsText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  };

  // ==========================================
  // VIEW 1: LANDING PAGE
  // ==========================================
  if (currentView === 'landing') {
    return (
      <div className="landing-wrapper">
        {/* Landing Navbar */}
        <header className="landing-nav no-print">
          <div className="landing-nav-inner">
            <div className="header-brand-group">
              <div className="brand-icon" aria-hidden="true">
                CV
              </div>
              <div className="brand-info">
                <h1>Kang CV Mu</h1>
                <p>Format ATS Standar • Web-based • 1-Klik PDF</p>
              </div>
            </div>

            <nav className="landing-menu" aria-label="Menu Utama">
              <a href="#beranda">Beranda</a>
              <a href="#fitur">Fitur ATS</a>
              <a href="#kontak">Kontak Pembuat</a>
            </nav>

            <div className="landing-nav-actions">
              {/* Cozy Theme Toggle Icon Only */}
              <button
                type="button"
                className="btn-theme-cozy"
                onClick={toggleTheme}
                aria-label={theme === 'light' ? 'Beralih ke mode gelap' : 'Beralih ke mode terang'}
                title={theme === 'light' ? 'Beralih ke mode gelap' : 'Beralih ke mode terang'}
              >
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
              </button>

              {/* Install PWA Button */}
              <button
                type="button"
                className="btn-install"
                onClick={handleInstallApp}
                title="Install aplikasi ke HP atau Komputer"
              >
                <PhoneIcon />
                <span>Install App</span>
              </button>

              {/* Enter Builder CTA */}
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setCurrentView('builder')}
              >
                Mulai Buat CV
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main id="beranda" className="landing-hero">
          <div className="hero-badge">
            Platform CV ATS Indonesia
          </div>

          <h1 className="hero-title">
            Buat CV Standar ATS Profesional, Cepat dan Bebas Ribet
          </h1>

          <p className="hero-subtitle">
            Rancang resume berformat standar Applicant Tracking System (ATS) langsung di peramban. 100% gratis, 1-klik unduh PDF vektor A4 berkualitas tinggi, dan data Anda tersimpan aman secara lokal tanpa perlu registrasi akun.
          </p>

          <div className="hero-ctas">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => setCurrentView('builder')}
            >
              Mulai Buat CV Sekarang
            </button>
            <button
              type="button"
              className="btn btn-outline btn-lg"
              onClick={handleLoadSampleAndOpenBuilder}
            >
              Buka dengan Data Contoh
            </button>
          </div>

          {/* Frosted Glass Hero Showcase */}
          <div className="hero-showcase">
            <div className="showcase-header">
              <div className="showcase-tag-list">
                <span className="showcase-tag">Single-Column ATS</span>
                <span className="showcase-tag">100% Vektor PDF</span>
                <span className="showcase-tag">Privasi Lokal</span>
              </div>
              <span>Live Preview Resume</span>
            </div>

            <div className="showcase-paper">
              <h2 className="showcase-name">ALYA PRATIWI SARI</h2>
              <p className="showcase-role">
                UI/UX Designer | Frontend Developer | Design Systems
              </p>
              <p className="showcase-contact">
                Jakarta, Indonesia | alya.pratiwi.sari@example.com | +62 811-9876-5432 | LinkedIn | Portfolio
              </p>
              <hr className="showcase-divider" />
              <h3 className="showcase-sec-title">PROFESSIONAL SUMMARY</h3>
              <p className="showcase-body">
                UI/UX Designer and Frontend Developer with 5+ years crafting user-centered digital products, design systems, and performant web interfaces. Experienced in Figma, Design Thinking, React, Next.js, and WCAG AA accessibility standards.
              </p>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section id="fitur" className="landing-section">
          <div className="section-header">
            <h2 className="section-title">Keunggulan Kang CV Mu</h2>
            <p className="section-subtitle">
              Dirancang dengan standar teknis yang mempermudah sistem ATS perusahaan membaca pengalaman dan keahlian Anda tanpa kesalahan parsing.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-badge" aria-hidden="true">
                1
              </div>
              <h3 className="feature-title">Format Single-Column Murni</h3>
              <p className="feature-desc">
                Tata letak kolom tunggal tanpa tabel rumit, kolom ganda yang bertumpuk, atau elemen grafis yang sering membuat sistem ATS gagal membaca data Anda.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-badge" aria-hidden="true">
                2
              </div>
              <h3 className="feature-title">Ekspor PDF Vektor A4</h3>
              <p className="feature-desc">
                Hasil cetak berformat A4 dengan teks asli yang dapat diseleksi dan dibaca mesin pemindai dokumen, bukan tangkapan layar gambar raster.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-badge" aria-hidden="true">
                3
              </div>
              <h3 className="feature-title">Privasi 100% Aman di Lokal</h3>
              <p className="feature-desc">
                Data pribadi dan riwayat karir Anda tidak dikirimkan ke server pihak ketiga atau basis data luar. Seluruh proses berjalan langsung di peramban Anda.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-badge" aria-hidden="true">
                4
              </div>
              <h3 className="feature-title">Cadangan Berkas JSON</h3>
              <p className="feature-desc">
                Dukung ekspor dan impor berkas JSON dengan fitur seret dan lepas. Simpan draf Anda ke perangkat dan lanjutkan pengeditan kapan pun.
              </p>
            </div>
          </div>
        </section>

        {/* Creator Profile & Contact Section */}
        <section id="kontak" className="creator-section">
          <div className="creator-inner">
            <div className="creator-card-main">
              <div className="creator-header-area">
                <div className="creator-avatar" aria-hidden="true">
                  D
                </div>
                <div className="creator-meta">
                  <h3>Darussalam</h3>
                  <p>Pengembang Kang CV Mu</p>
                </div>
              </div>

              <p className="creator-intro">
                Halo! Aplikasi <strong>Kang CV Mu</strong> ini saya kembangkan untuk membantu rekan-rekan pencari kerja di Indonesia agar bisa membuat CV berkualitas standar ATS secara gratis, cepat, dan tanpa ribet. Jika Anda memiliki saran perbaikan, pertanyaan teknis, atau ingin terhubung langsung, silakan hubungi saya melalui kontak resmi berikut:
              </p>

              <div className="contacts-grid">
                {/* WhatsApp Contact */}
                <div className="contact-item-card">
                  <div>
                    <span className="contact-channel-title">WhatsApp Resmi</span>
                    <p className="contact-channel-val">087725716394</p>
                  </div>
                  <a
                    href="https://wa.me/6287725716394"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    Chat via WhatsApp
                  </a>
                </div>

                {/* Email Contact */}
                <div className="contact-item-card">
                  <div>
                    <span className="contact-channel-title">Email Langsung</span>
                    <p className="contact-channel-val">drslm312@gmail.com</p>
                  </div>
                  <a
                    href="mailto:drslm312@gmail.com"
                    className="btn btn-outline btn-sm"
                  >
                    Kirim Email
                  </a>
                </div>

                {/* Instagram Contact */}
                <div className="contact-item-card">
                  <div>
                    <span className="contact-channel-title">Instagram Pribadi</span>
                    <p className="contact-channel-val">@drslm_22</p>
                  </div>
                  <a
                    href="https://instagram.com/drslm_22"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    Kunjungi Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Landing Footer */}
        <footer className="landing-footer no-print">
          <p>© 2026 Kang CV Mu. Dikembangkan oleh Darussalam.</p>
          <div className="footer-links">
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setCurrentView('builder')}
            >
              Buka Builder CV
            </button>
            <a href="https://wa.me/6287725716394" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href="mailto:drslm312@gmail.com">Email</a>
            <a href="https://instagram.com/drslm_22" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </footer>

        {/* Toast alert */}
        {toastMessage && (
          <div className="toast-msg" role="status" aria-live="polite">
            {toastMessage}
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW 2: CV GENERATOR BUILDER WORKSPACE
  // ==========================================
  return (
    <div>
      {/* Top Application Header */}
      <header className="app-header no-print">
        <div className="header-inner">
          <div className="header-brand-group">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => setCurrentView('landing')}
              title="Kembali ke Halaman Beranda"
            >
              ← Beranda
            </button>
            <div className="brand-icon" aria-hidden="true">
              CV
            </div>
            <div className="brand-info">
              <h1>Kang CV Mu</h1>
              <p>Format ATS Standar • Web-based • 1-Klik PDF</p>
            </div>
          </div>

          <div className="header-actions">
            {/* Cozy Theme Toggle Icon Only */}
            <button
              type="button"
              className="btn-theme-cozy"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Beralih ke mode gelap' : 'Beralih ke mode terang'}
              title={theme === 'light' ? 'Beralih ke mode gelap' : 'Beralih ke mode terang'}
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>

            <button
              type="button"
              className="btn btn-outline"
              onClick={handleLoadSample}
            >
              Load Contoh
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleExportJSON}
            >
              Export JSON
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Import JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGenerate}
            >
              Generate &amp; Preview
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleDownloadPDF}
            >
              Download PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Interface */}
      <main className="app-container">
        {/* Left Column: Form Builder (Full Width on Mobile) */}
        <section className="form-column no-print" aria-label="Formulir CV">
          {/* Card: Personal Information */}
          <div className="form-card">
            <div className="card-header">
              <h2 className="card-title">Personal Information</h2>
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="fullName">
                Nama Lengkap<span className="field-required">*</span>
              </label>
              <input
                id="fullName"
                className="form-input"
                type="text"
                value={data.personal.fullName}
                onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                placeholder="Misal: ALYA PRATIWI SARI"
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="headline">
                Headline
              </label>
              <input
                id="headline"
                className="form-input"
                type="text"
                value={data.personal.headline}
                onChange={(e) => handlePersonalChange('headline', e.target.value)}
                placeholder="Misal: UI/UX Designer | Frontend Developer"
              />
            </div>

            <div className="field-row">
              <div>
                <label className="field-label" htmlFor="location">
                  Lokasi
                </label>
                <input
                  id="location"
                  className="form-input"
                  type="text"
                  value={data.personal.location}
                  onChange={(e) => handlePersonalChange('location', e.target.value)}
                  placeholder="Jakarta, Indonesia"
                />
              </div>
              <div>
                <label className="field-label" htmlFor="email">
                  Email<span className="field-required">*</span>
                </label>
                <input
                  id="email"
                  className="form-input"
                  type="email"
                  value={data.personal.email}
                  onChange={(e) => handlePersonalChange('email', e.target.value)}
                  placeholder="nama@example.com"
                />
              </div>
            </div>

            <div className="field-row">
              <div>
                <label className="field-label" htmlFor="phone">
                  Phone (opsional)
                </label>
                <input
                  id="phone"
                  className="form-input"
                  type="tel"
                  value={data.personal.phone}
                  onChange={(e) => handlePersonalChange('phone', e.target.value)}
                  placeholder="+62 811-9876-5432"
                />
              </div>
              <div>
                <label className="field-label" htmlFor="linkedin">
                  LinkedIn URL
                </label>
                <input
                  id="linkedin"
                  className="form-input"
                  type="url"
                  value={data.personal.linkedin}
                  onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                  placeholder="https://www.linkedin.com/in/username"
                />
              </div>
            </div>

            <div className="callout-note">
              Tambahan baru: akan tampil di header: website | portfolio | github (klik, ATS-friendly)
            </div>

            <div className="field-row">
              <div>
                <label className="field-label" htmlFor="website">
                  Website
                </label>
                <input
                  id="website"
                  className="form-input"
                  type="url"
                  value={data.personal.website}
                  onChange={(e) => handlePersonalChange('website', e.target.value)}
                  placeholder="https://namadomain.com"
                />
              </div>
              <div>
                <label className="field-label" htmlFor="portfolio">
                  Portfolio URL
                </label>
                <input
                  id="portfolio"
                  className="form-input"
                  type="url"
                  value={data.personal.portfolio}
                  onChange={(e) => handlePersonalChange('portfolio', e.target.value)}
                  placeholder="https://portfolio.namadomain.com"
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="github">
                GitHub URL
              </label>
              <input
                id="github"
                className="form-input"
                type="url"
                value={data.personal.github}
                onChange={(e) => handlePersonalChange('github', e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>
          </div>

          {/* Card: Professional Summary */}
          <div className="form-card">
            <div className="card-header">
              <h2 className="card-title">Professional Summary</h2>
            </div>
            <div className="field-group">
              <label className="field-label" htmlFor="summary">
                Deskripsi Ringkas
              </label>
              <textarea
                id="summary"
                className="form-textarea"
                rows={5}
                value={data.summary}
                onChange={(e) => handleSummaryChange(e.target.value)}
                placeholder="Tuliskan ringkasan pengalaman, spesialisasi utama, dan nilai tambah profesional Anda..."
              />
              <span className="field-hint">
                Tips: sebutkan role, stack utama (Figma, React, Next.js, dll), dan value proposition.
              </span>
            </div>
          </div>

          {/* Card: Professional Experience */}
          <div className="form-card">
            <div className="card-header">
              <h2 className="card-title">Professional Experience</h2>
              <button
                type="button"
                className="btn btn-add"
                onClick={handleAddExperience}
              >
                + Tambah
              </button>
            </div>

            {data.experiences.map((exp, index) => (
              <div key={exp.id} className="dynamic-item">
                <div className="dynamic-header">
                  <span className="dynamic-label">#{index + 1} Pengalaman</span>
                  {data.experiences.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger-soft"
                      onClick={() => handleRemoveExperience(exp.id)}
                    >
                      Hapus
                    </button>
                  )}
                </div>

                <div className="field-row">
                  <div>
                    <label className="field-label" htmlFor={`exp-pos-${exp.id}`}>
                      Posisi
                    </label>
                    <input
                      id={`exp-pos-${exp.id}`}
                      className="form-input"
                      type="text"
                      value={exp.position}
                      onChange={(e) =>
                        handleExperienceChange(exp.id, 'position', e.target.value)
                      }
                      placeholder="Senior UI/UX Designer"
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor={`exp-comp-${exp.id}`}>
                      Perusahaan
                    </label>
                    <input
                      id={`exp-comp-${exp.id}`}
                      className="form-input"
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        handleExperienceChange(exp.id, 'company', e.target.value)
                      }
                      placeholder="Nama Perusahaan"
                    />
                  </div>
                </div>

                <div className="field-row">
                  <div>
                    <label className="field-label" htmlFor={`exp-per-${exp.id}`}>
                      Periode
                    </label>
                    <input
                      id={`exp-per-${exp.id}`}
                      className="form-input"
                      type="text"
                      value={exp.period}
                      onChange={(e) =>
                        handleExperienceChange(exp.id, 'period', e.target.value)
                      }
                      placeholder="Jan 2023 - Present"
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor={`exp-loc-${exp.id}`}>
                      Lokasi
                    </label>
                    <input
                      id={`exp-loc-${exp.id}`}
                      className="form-input"
                      type="text"
                      value={exp.location}
                      onChange={(e) =>
                        handleExperienceChange(exp.id, 'location', e.target.value)
                      }
                      placeholder="Jakarta, Indonesia"
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label" htmlFor={`exp-bul-${exp.id}`}>
                    Bullets (1 baris = 1 bullet)
                  </label>
                  <textarea
                    id={`exp-bul-${exp.id}`}
                    className="form-textarea"
                    rows={4}
                    value={exp.bullets}
                    onChange={(e) =>
                      handleExperienceChange(exp.id, 'bullets', e.target.value)
                    }
                    placeholder="Tuliskan pencapaian dengan action verb dan metrik terukur. Setiap baris baru otomatis menjadi satu bullet point."
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Card: Education */}
          <div className="form-card">
            <div className="card-header">
              <h2 className="card-title">Education</h2>
              <button
                type="button"
                className="btn btn-add"
                onClick={handleAddEducation}
              >
                + Tambah
              </button>
            </div>

            {data.education.map((edu, index) => (
              <div key={edu.id} className="dynamic-item">
                <div className="dynamic-header">
                  <span className="dynamic-label">#{index + 1} Pendidikan</span>
                  {data.education.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger-soft"
                      onClick={() => handleRemoveEducation(edu.id)}
                    >
                      Hapus
                    </button>
                  )}
                </div>

                <div className="field-row">
                  <div>
                    <label className="field-label" htmlFor={`edu-deg-${edu.id}`}>
                      Jenjang / Gelar
                    </label>
                    <input
                      id={`edu-deg-${edu.id}`}
                      className="form-input"
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(edu.id, 'degree', e.target.value)
                      }
                      placeholder="Sarjana Ilmu Komputer (S.Kom)"
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor={`edu-inst-${edu.id}`}>
                      Institusi / Universitas
                    </label>
                    <input
                      id={`edu-inst-${edu.id}`}
                      className="form-input"
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        handleEducationChange(edu.id, 'institution', e.target.value)
                      }
                      placeholder="Universitas Indonesia"
                    />
                  </div>
                </div>

                <div className="field-row">
                  <div>
                    <label className="field-label" htmlFor={`edu-per-${edu.id}`}>
                      Periode
                    </label>
                    <input
                      id={`edu-per-${edu.id}`}
                      className="form-input"
                      type="text"
                      value={edu.period}
                      onChange={(e) =>
                        handleEducationChange(edu.id, 'period', e.target.value)
                      }
                      placeholder="2016 - 2020"
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor={`edu-gpa-${edu.id}`}>
                      Nilai / IPK (opsional)
                    </label>
                    <input
                      id={`edu-gpa-${edu.id}`}
                      className="form-input"
                      type="text"
                      value={edu.gpa}
                      onChange={(e) =>
                        handleEducationChange(edu.id, 'gpa', e.target.value)
                      }
                      placeholder="IPK 3.82 / 4.00"
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label" htmlFor={`edu-det-${edu.id}`}>
                    Keterangan / Fokus Studi
                  </label>
                  <input
                    id={`edu-det-${edu.id}`}
                    className="form-input"
                    type="text"
                    value={edu.details}
                    onChange={(e) =>
                      handleEducationChange(edu.id, 'details', e.target.value)
                    }
                    placeholder="Rekayasa Perangkat Lunak, Penghargaan Lulusan Terbaik"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Card: Skills */}
          <div className="form-card">
            <div className="card-header">
              <h2 className="card-title">Skills &amp; Expertise</h2>
            </div>
            <div className="field-group">
              <label className="field-label" htmlFor="technicalSkills">
                Keahlian Teknis &amp; Tools
              </label>
              <input
                id="technicalSkills"
                className="form-input"
                type="text"
                value={data.skills.technical}
                onChange={(e) => handleSkillsChange('technical', e.target.value)}
                placeholder="Figma, React, Next.js, TypeScript, Tailwind CSS, Git"
              />
            </div>
            <div className="field-group">
              <label className="field-label" htmlFor="methodologies">
                Metodologi &amp; Kompetensi
              </label>
              <input
                id="methodologies"
                className="form-input"
                type="text"
                value={data.skills.methodologies}
                onChange={(e) => handleSkillsChange('methodologies', e.target.value)}
                placeholder="Design Systems, Usability Testing, Agile/Scrum, WCAG AA"
              />
            </div>
            <div className="field-group">
              <label className="field-label" htmlFor="languages">
                Bahasa
              </label>
              <input
                id="languages"
                className="form-input"
                type="text"
                value={data.skills.languages}
                onChange={(e) => handleSkillsChange('languages', e.target.value)}
                placeholder="Bahasa Indonesia (Native), English (Professional)"
              />
            </div>
          </div>

          {/* Card: Projects */}
          <div className="form-card">
            <div className="card-header">
              <h2 className="card-title">Featured Projects</h2>
              <button
                type="button"
                className="btn btn-add"
                onClick={handleAddProject}
              >
                + Tambah
              </button>
            </div>

            {data.projects.map((proj, index) => (
              <div key={proj.id} className="dynamic-item">
                <div className="dynamic-header">
                  <span className="dynamic-label">#{index + 1} Proyek</span>
                  {data.projects.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger-soft"
                      onClick={() => handleRemoveProject(proj.id)}
                    >
                      Hapus
                    </button>
                  )}
                </div>

                <div className="field-row">
                  <div>
                    <label className="field-label" htmlFor={`proj-name-${proj.id}`}>
                      Nama Proyek
                    </label>
                    <input
                      id={`proj-name-${proj.id}`}
                      className="form-input"
                      type="text"
                      value={proj.name}
                      onChange={(e) =>
                        handleProjectChange(proj.id, 'name', e.target.value)
                      }
                      placeholder="Enterprise Analytics Portal"
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor={`proj-role-${proj.id}`}>
                      Peran / Posisi
                    </label>
                    <input
                      id={`proj-role-${proj.id}`}
                      className="form-input"
                      type="text"
                      value={proj.role}
                      onChange={(e) =>
                        handleProjectChange(proj.id, 'role', e.target.value)
                      }
                      placeholder="Lead Designer & Architect"
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label" htmlFor={`proj-link-${proj.id}`}>
                    Link Proyek (URL)
                  </label>
                  <input
                    id={`proj-link-${proj.id}`}
                    className="form-input"
                    type="url"
                    value={proj.link}
                    onChange={(e) =>
                      handleProjectChange(proj.id, 'link', e.target.value)
                    }
                    placeholder="https://portfolio.com/project"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label" htmlFor={`proj-desc-${proj.id}`}>
                    Deskripsi Singkat &amp; Capaian
                  </label>
                  <textarea
                    id={`proj-desc-${proj.id}`}
                    className="form-textarea"
                    rows={2}
                    value={proj.description}
                    onChange={(e) =>
                      handleProjectChange(proj.id, 'description', e.target.value)
                    }
                    placeholder="Jelaskan tujuan, kontribusi Anda, dan hasil yang diraih."
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Live Preview (Desktop Only, Hidden on Mobile via CSS) */}
        <section className="preview-column" aria-label="Live Preview Dokumen ATS">
          <div className="preview-bar no-print">
            <h2 className="preview-title">Live Preview (PDF)</h2>
            <span className="preview-status">
              {hasGenerated ? 'Preview Terkini' : 'Generate untuk melihat hasil'}
            </span>
          </div>

          <div
            className="paper-wrapper"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div id="resume-print-area" className="ats-paper">
              {!hasGenerated ? (
                /* Empty state */
                <div className="empty-preview no-print">
                  <p className="empty-preview-text">Belum ada preview.</p>
                  <p className="empty-preview-subtext">
                    Klik tombol <strong>Generate &amp; Preview</strong> untuk melihat lembar PDF ATS Anda secara instan.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleGenerate}
                  >
                    Generate &amp; Preview
                  </button>
                </div>
              ) : (
                /* Active state: Strict ATS Resume Layout */
                <div>
                  {/* Header: Name, Headline & Contact Details */}
                  <div className="ats-header">
                    <h1 className="ats-name">{data.personal.fullName || 'NAMA LENGKAP'}</h1>
                    {data.personal.headline && (
                      <div className="ats-headline">{data.personal.headline}</div>
                    )}
                    <div className="ats-contacts">
                      {data.personal.location && <span>{data.personal.location}</span>}
                      {data.personal.location && data.personal.email && (
                        <span className="ats-sep" aria-hidden="true">|</span>
                      )}
                      {data.personal.email && (
                        <a href={`mailto:${data.personal.email}`}>{data.personal.email}</a>
                      )}
                      {data.personal.phone && (
                        <>
                          <span className="ats-sep" aria-hidden="true">|</span>
                          <span>{data.personal.phone}</span>
                        </>
                      )}
                      {data.personal.linkedin && (
                        <>
                          <span className="ats-sep" aria-hidden="true">|</span>
                          <a href={data.personal.linkedin} target="_blank" rel="noreferrer">
                            LinkedIn
                          </a>
                        </>
                      )}
                      {data.personal.website && (
                        <>
                          <span className="ats-sep" aria-hidden="true">|</span>
                          <a href={data.personal.website} target="_blank" rel="noreferrer">
                            Website
                          </a>
                        </>
                      )}
                      {data.personal.portfolio && (
                        <>
                          <span className="ats-sep" aria-hidden="true">|</span>
                          <a href={data.personal.portfolio} target="_blank" rel="noreferrer">
                            Portfolio
                          </a>
                        </>
                      )}
                      {data.personal.github && (
                        <>
                          <span className="ats-sep" aria-hidden="true">|</span>
                          <a href={data.personal.github} target="_blank" rel="noreferrer">
                            GitHub
                          </a>
                        </>
                      )}
                    </div>
                  </div>

                  <hr className="ats-divider" />

                  {/* Summary Section */}
                  {data.summary && (
                    <div className="ats-section">
                      <h2 className="ats-section-title">Professional Summary</h2>
                      <p className="ats-paragraph">{data.summary}</p>
                    </div>
                  )}

                  {/* Experience Section */}
                  {data.experiences.some((e) => e.position || e.company) && (
                    <div className="ats-section">
                      <h2 className="ats-section-title">Professional Experience</h2>
                      {data.experiences.map((exp) => {
                        const bullets = parseBullets(exp.bullets);
                        return (
                          <div key={exp.id} className="ats-exp-item">
                            <div className="ats-row">
                              <div>
                                <span className="ats-bold">{exp.position}</span>
                                {exp.company && (
                                  <span className="ats-subtext">, {exp.company}</span>
                                )}
                              </div>
                              <div className="ats-date-loc">
                                {exp.period}
                                {exp.period && exp.location && ' | '}
                                {exp.location}
                              </div>
                            </div>
                            {bullets.length > 0 && (
                              <ul className="ats-list">
                                {bullets.map((bullet, idx) => (
                                  <li key={idx}>{bullet}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Education Section */}
                  {data.education.some((e) => e.degree || e.institution) && (
                    <div className="ats-section">
                      <h2 className="ats-section-title">Education</h2>
                      {data.education.map((edu) => (
                        <div key={edu.id} className="ats-exp-item">
                          <div className="ats-row">
                            <div>
                              <span className="ats-bold">{edu.degree}</span>
                              {edu.institution && (
                                <span className="ats-subtext">, {edu.institution}</span>
                              )}
                            </div>
                            <div className="ats-date-loc">
                              {edu.period}
                              {edu.gpa && ` | ${edu.gpa}`}
                            </div>
                          </div>
                          {edu.details && (
                            <p className="ats-paragraph" style={{ marginTop: '2px' }}>
                              {edu.details}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skills Section */}
                  {(data.skills.technical ||
                    data.skills.methodologies ||
                    data.skills.languages) && (
                    <div className="ats-section">
                      <h2 className="ats-section-title">Skills &amp; Competencies</h2>
                      {data.skills.technical && (
                        <p className="ats-paragraph">
                          <strong>Keahlian Teknis &amp; Tools:</strong> {data.skills.technical}
                        </p>
                      )}
                      {data.skills.methodologies && (
                        <p className="ats-paragraph">
                          <strong>Metodologi:</strong> {data.skills.methodologies}
                        </p>
                      )}
                      {data.skills.languages && (
                        <p className="ats-paragraph">
                          <strong>Bahasa:</strong> {data.skills.languages}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Projects Section */}
                  {data.projects.some((p) => p.name) && (
                    <div className="ats-section">
                      <h2 className="ats-section-title">Featured Projects</h2>
                      {data.projects.map((proj) => (
                        <div key={proj.id} className="ats-exp-item">
                          <div className="ats-row">
                            <div>
                              <span className="ats-bold">{proj.name}</span>
                              {proj.role && (
                                <span className="ats-subtext">, {proj.role}</span>
                              )}
                            </div>
                            {proj.link && (
                              <div className="ats-date-loc">
                                <a href={proj.link} target="_blank" rel="noreferrer">
                                  {proj.link.replace(/^https?:\/\//, '')}
                                </a>
                              </div>
                            )}
                          </div>
                          {proj.description && (
                            <p className="ats-paragraph" style={{ marginTop: '2px' }}>
                              {proj.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Drop Zone Card */}
          <div
            className={`dropzone-card no-print ${isDragActive ? 'drag-active' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                fileInputRef.current?.click();
              }
            }}
          >
            Drag &amp; drop .json ke sini untuk Import, atau klik Import JSON
          </div>
        </section>
      </main>

      {/* Floating Bottom Action Bar for Mobile Screens (no preview needed, direct actions) */}
      <div className="mobile-bottom-bar no-print">
        <button
          type="button"
          className="btn btn-outline"
          onClick={handleLoadSample}
        >
          Load Contoh
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={handleExportJSON}
        >
          Export JSON
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </div>

      {/* Floating feedback notification */}
      {toastMessage && (
        <div className="toast-msg" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
