import React, { useState, useEffect, useRef, useMemo } from 'react';
import JSZip from 'jszip';
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

function SparklesIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 7.5v9l-8 4.5-8-4.5v-9l8-4.5 8 4.5Z" />
      <path d="M12 12v9" />
      <path d="m12 12 8-4.5" />
      <path d="M12 12 4 7.5" />
    </svg>
  );
}

function ShieldCheckIcon() {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CopyIcon() {
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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CloseIcon() {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ChevronDownIcon({ isOpen }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease',
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function MagicWandIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 4-2 2" />
      <path d="m15 9-2-2" />
      <path d="M19 13 8 2" />
      <path d="M22 10 11 1" />
      <path d="m3 21 9-9" />
      <path d="m12.5 15.5 2 2" />
      <path d="m2 16 2-2" />
      <path d="m6 20 2-2" />
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

  // Pro Mode & Smart Features States
  const [isProMode, setIsProMode] = useState(true);
  const [proPreset, setProPreset] = useState('executive'); // 'executive' | 'modern' | 'freshgrad'
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [showAuditDrawer, setShowAuditDrawer] = useState(true);

  // AI Assistant States
  const [aiModal, setAiModal] = useState({
    isOpen: false,
    title: '',
    section: '',
    targetId: null,
    meta: {},
    originalText: '',
    suggestedText: '',
    tone: 'impact', // 'impact' | 'technical' | 'concise'
    isGenerating: false,
  });
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem('kangcv_gemini_key') || '';
  });
  const [showAiSettings, setShowAiSettings] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');

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

  const extractYearFromPeriod = (period) => {
    if (!period) return 0;
    const p = period.toLowerCase();
    if (p.includes('sekarang') || p.includes('present') || p.includes('saat ini')) {
      return 9999;
    }
    const matches = period.match(/\b(19\d\d|20\d\d)\b/g);
    if (!matches || matches.length === 0) return 0;
    return Math.max(...matches.map(Number));
  };

  const handleAutoArrange = () => {
    // 1. Sort experiences reverse chronologically
    const sortedExperiences = [...data.experiences].sort((a, b) => {
      return extractYearFromPeriod(b.period) - extractYearFromPeriod(a.period);
    });

    // 2. Normalize and polish experience bullets
    const polishedExperiences = sortedExperiences.map((exp) => {
      if (!exp.bullets) return exp;
      const lines = exp.bullets.split('\n');
      const cleanedLines = lines
        .map((line) => {
          let trimmed = line.trim();
          if (!trimmed) return '';
          // Strip leading list symbols like -, *, •, >, 1., etc.
          trimmed = trimmed.replace(/^[\s*\-•>·\d.)]+/, '').trim();
          // Capitalize first letter
          if (trimmed.length > 0) {
            trimmed = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
          }
          // Normalize multiple spaces
          trimmed = trimmed.replace(/\s{2,}/g, ' ');
          return trimmed;
        })
        .filter((line) => line.length > 0);

      return {
        ...exp,
        bullets: cleanedLines.join('\n'),
      };
    });

    // 3. Sort education reverse chronologically
    const sortedEducation = [...data.education].sort((a, b) => {
      return extractYearFromPeriod(b.period) - extractYearFromPeriod(a.period);
    });

    setData((prev) => ({
      ...prev,
      experiences: polishedExperiences,
      education: sortedEducation,
    }));

    setHasGenerated(true);
    showToast('CV berhasil disusun otomatis: kronologi & butir pencapaian dirapikan untuk HRD!');
  };

  const hrAudit = useMemo(() => {
    let score = 0;
    const tips = [];
    let actionVerbCount = 0;
    let metricCount = 0;

    const actionVerbList = [
      'mengembangkan', 'memimpin', 'merancang', 'meningkatkan', 'mengelola',
      'menganalisis', 'menyusun', 'mengkoordinasi', 'mengoptimalkan', 'membangun',
      'meluncurkan', 'mengintegrasikan', 'mengeksekusi', 'menghasilkan', 'mengurangi',
      'menerapkan', 'menginisiasi', 'mengarahkan', 'mengotomatisasi',
      'led', 'developed', 'designed', 'built', 'implemented', 'improved',
      'managed', 'created', 'optimized', 'launched', 'delivered', 'spearheaded'
    ];

    // Check 1: Name & Headline (15 pts)
    if (data.personal.fullName.trim().length >= 3) {
      score += 8;
    } else {
      tips.push('Lengkapi Nama Lengkap Anda.');
    }
    if (data.personal.headline.trim().length >= 5) {
      score += 7;
    } else {
      tips.push('Tambahkan Headline posisi yang spesifik agar HRD langsung paham bidang keahlian Anda.');
    }

    // Check 2: Contact Completeness (20 pts)
    if (data.personal.email.trim()) score += 8;
    else tips.push('Email aktif wajib diisi.');

    if (data.personal.phone.trim()) score += 6;
    else tips.push('Cantumkan nomor WhatsApp/HP aktif untuk panggilan wawancara.');

    if (
      data.personal.linkedin.trim() ||
      data.personal.github.trim() ||
      data.personal.portfolio.trim() ||
      data.personal.website.trim()
    ) {
      score += 6;
    } else {
      tips.push('Cantumkan tautan profil LinkedIn atau portofolio untuk verifikasi rekam jejak.');
    }

    // Check 3: Summary (15 pts)
    const summaryWords = data.summary.trim()
      ? data.summary.trim().split(/\s+/).length
      : 0;
    if (summaryWords >= 25 && summaryWords <= 120) {
      score += 15;
    } else if (summaryWords > 0) {
      score += 8;
      tips.push('Panjang ringkasan profesional disarankan 30-90 kata berorientasi pada pencapaian.');
    } else {
      tips.push('Tulis ringkasan profil singkat agar menarik perhatian HRD dalam 6 detik pertama.');
    }

    // Check 4: Experience & Bullets (20 pts)
    const validExp = data.experiences.filter(
      (e) => e.position.trim() || e.company.trim()
    );
    if (validExp.length >= 1) {
      score += 10;
      const allBullets = validExp
        .map((e) => e.bullets || '')
        .join('\n')
        .toLowerCase();

      // Check Action Verbs
      actionVerbList.forEach((verb) => {
        const regex = new RegExp(`\\b${verb}\\b`, 'gi');
        const matches = allBullets.match(regex);
        if (matches) actionVerbCount += matches.length;
      });

      if (actionVerbCount >= 3) {
        score += 10;
      } else {
        score += Math.min(actionVerbCount * 3, 6);
        tips.push('Gunakan kata kerja aksi aktif di awal butir pengalaman (misal: Memimpin, Mengembangkan, Mengoptimalkan).');
      }

      // Check Metrics (Numbers / Percentages) (15 pts)
      const metricRegex = /\b(\d+[\d,.]*\s*(%|x|juta|ribu|miliar|orang|klien|user|pengguna)|rp\.?\s*\d+|\d{2,})\b/gi;
      const metricMatches = allBullets.match(metricRegex);
      if (metricMatches) {
        metricCount = metricMatches.length;
        score += 15;
      } else {
        tips.push('Sertakan angka atau persentase terukur pada capaian kerja (misal: "meningkatkan efisiensi 25%").');
      }
    } else {
      tips.push('Tambahkan minimal 1 riwayat pengalaman kerja atau proyek organisasi.');
    }

    // Check 5: Skills (15 pts)
    if (data.skills.technical.trim() || data.skills.methodologies.trim()) {
      score += 15;
    } else {
      tips.push('Isi bagian keahlian teknis atau metodologi yang relevan dengan kualifikasi lowongan.');
    }

    return {
      score: Math.min(score, 100),
      actionVerbCount,
      metricCount,
      tips: tips.slice(0, 3),
    };
  }, [data]);

  const generateCoverEmailText = () => {
    const name = data.personal.fullName.trim() || 'Pelamar Kerja';
    const headline = data.personal.headline.trim() || 'Posisi Terkait';
    const email = data.personal.email.trim() || '-';
    const phone = data.personal.phone.trim() || '-';
    const linkedin = data.personal.linkedin.trim();
    const portfolio =
      data.personal.portfolio.trim() || data.personal.github.trim();

    return `Subjek: Lamaran Pekerjaan: ${headline} - ${name}

Yth. Tim Rekrutmen / HRD,
[Nama Perusahaan]

Perkenalkan, saya ${name}, seorang ${headline}. Melalui email ini, saya bermaksud untuk mengajukan lamaran pekerjaan pada posisi yang relevan dengan keahlian dan latar belakang profesional saya di perusahaan Bapak/Ibu.

Ringkasan Kualifikasi Utama:
1. Rekam jejak kerja berorientasi pada hasil nyata dan efisiensi terukur.
2. Penguasaan keahlian teknis: ${data.skills.technical || 'Keahlian teknis dan kompetensi industri relevan'}.
3. Pendekatan kerja terstruktur, disiplin, dan mampu beradaptasi cepat dalam tim.

Bersama surat elektronik ini, saya telah melampirkan berkas Curriculum Vitae (CV) berformat ATS (Applicant Tracking System) untuk memberikan rincian lengkap mengenai perjalanan karir, pendidikan, dan portofolio saya.

Saya sangat menyambut baik kesempatan wawancara untuk mendiskusikan lebih lanjut kontribusi yang dapat saya berikan kepada perusahaan Bapak/Ibu.

Terima kasih atas perhatian dan kesempatan yang diberikan.

Hormat saya,

${name}
Email: ${email}
WhatsApp/Telepon: ${phone}${linkedin ? `\nLinkedIn: ${linkedin}` : ''}${portfolio ? `\nPortofolio: ${portfolio}` : ''}
`;
  };

  const handleCopyCoverEmail = () => {
    const text = generateCoverEmailText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Naskah email lamaran berhasil disalin ke clipboard.');
      });
    } else {
      showToast('Naskah email siap disalin dari kotak teks.');
    }
  };

  const handleDownloadPackageZip = async () => {
    try {
      const zip = new JSZip();
      const safeName = data.personal.fullName
        ? data.personal.fullName.replace(/\s+/g, '_')
        : 'Pelamar';

      // 1. Data JSON
      zip.file(`Data_Cadangan_${safeName}.json`, JSON.stringify(data, null, 2));

      // 2. Cover Email TXT
      const emailContent = generateCoverEmailText();
      zip.file(`Template_Email_Lamaran_${safeName}.txt`, emailContent);

      // 3. Petunjuk Pengiriman HRD
      const guideContent = `PETUNJUK PENGIRIMAN BERKAS KE HRD
====================================
1. Cetak CV ke PDF:
   - Gunakan tombol 'Download PDF' di Kang CV Mu.
   - Pada jendela cetak browser, pilih Destination: 'Save as PDF'.
   - Atur Paper size: A4, Margin: None / Default.
   - Simpan berkas dengan nama: CV_${safeName}_ATS.pdf

2. Pengiriman Email ke HRD:
   - Buka template email dari file 'Template_Email_Lamaran_${safeName}.txt'.
   - Salin naskah ke badan email pengiriman lamaran.
   - Lampirkan berkas PDF CV yang telah Anda simpan.
   - Disarankan mengirim pada jam kerja (Senin - Kamis, pukul 08.30 - 10.30 WIB untuk tingkat respons tertinggi).

3. File Cadangan (.json):
   - Simpan file 'Data_Cadangan_${safeName}.json'.
   - Kapan saja Anda ingin memperbarui atau mencetak ulang CV, cukup gunakan tombol 'Import JSON' di Kang CV Mu.
`;
      zip.file(`Petunjuk_Pengiriman_HRD_${safeName}.txt`, guideContent);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Paket_HRD_${safeName}.zip`;
      link.click();
      URL.revokeObjectURL(url);

      showToast('Paket Berkas HRD (.zip) berhasil diunduh.');
    } catch (err) {
      showToast('Gagal membuat paket berkas zip: ' + err.message);
    }
  };

  // ==========================================
  // AI ASSISTANT & CONTENT OPTIMIZER ENGINE
  // ==========================================
  const callGeminiAPI = async (promptText) => {
    if (!geminiApiKey.trim()) return null;
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 500,
            },
          }),
        }
      );
      if (!response.ok) return null;
      const json = await response.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return text
          .trim()
          .replace(/\u2014/g, ':')
          .replace(/^```[a-z]*\n/i, '')
          .replace(/\n```$/, '');
      }
    } catch (e) {
      console.warn('Gemini API call skipped, using built-in smart engine:', e);
    }
    return null;
  };

  const generateLocalAIPolish = (section, rawText, meta = {}, tone = 'impact') => {
    const text = (rawText || '').trim();

    if (section === 'headline') {
      const base = text || data.personal.headline || 'Spesialis Profesional';
      const cleanBase = base.split('|')[0].trim() || 'Software Engineer';
      const skillsPart = data.skills.technical
        ? data.skills.technical.split(',').slice(0, 3).map((s) => s.trim()).join(', ')
        : 'Sistem Terintegrasi, Analisis Data & Eksekusi Solusi';

      if (tone === 'technical') {
        return `${cleanBase} | ${skillsPart} | Efisiensi & Arsitektur Sistem`;
      }
      if (tone === 'concise') {
        return `${cleanBase} | ${skillsPart}`;
      }
      return `${cleanBase} | ${skillsPart} | Berorientasi pada Dampak Bisnis`;
    }

    if (section === 'summary') {
      const headline = data.personal.headline || 'Profesional Berdedikasi';
      const skills = data.skills.technical
        ? data.skills.technical.split(',').slice(0, 4).map((s) => s.trim()).join(', ')
        : 'keahlian teknis dan manajemen proyek';

      if (text.length > 30) {
        if (tone === 'technical') {
          return `${headline} dengan fokus mendalam pada implementasi standar teknis modern dan penguasaan ${skills}. Berpengalaman merancang arsitektur alur kerja yang terstruktur, meminimalkan latensi proses hingga 30%, serta memastikan kepatuhan standar kualitas industri. Terbiasa memimpin kolaborasi lintas divisi untuk menghadirkan solusi komputasi yang tangguh dan terukur.`;
        }
        if (tone === 'concise') {
          return `${headline} dengan penguasaan kuat pada ${skills}. Terbukti mampu mengeksekusi proyek tepat waktu dengan peningkatan efisiensi proses kerja hingga 25%. Siap berkontribusi secara langsung dalam mendukung target operasional dan pertumbuhan tim.`;
        }
        return `${headline} dengan pengalaman terbukti dalam mendorong efisiensi operasional dan pengembangan solusi berbasis ${skills}. Memiliki rekam jejak dalam meningkatkan produktivitas tim hingga 35% melalui pendekatan kerja berbasis data dan perbaikan berkelanjutan. Berkomitmen kuat menghadirkan nilai nyata bagi pertumbuhan perusahaan melalui kepemimpinan kolaboratif.`;
      }

      return `${headline} dengan keahlian teruji dalam ${skills}. Berpengalaman mengelola proyek dari inisiasi hingga evaluasi dengan fokus pada pencapaian terukur dan efisiensi waktu kerja. Memiliki etos kerja terstruktur, kemampuan komunikasi aktif, dan dedikasi tinggi dalam mencapai target strategis perusahaan.`;
    }

    if (section === 'bullets') {
      const role = meta.position || 'Profesional';
      const company = meta.company ? `di ${meta.company}` : '';

      const lines = text
        ? text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0)
        : [];

      if (lines.length === 0) {
        return `Memimpin inisiatif kunci ${company} sebagai ${role}, meningkatkan efisiensi alur kerja operasional sebesar 30% melalui perbaikan proses berkala.\nMerancang dan menerapkan strategi kerja terpadu bersama tim lintas fungsi, memastikan seluruh target diselesaikan tepat waktu dengan tingkat akurasi 98%.\nMenganalisis metrik performa secara rutin dan menyusun rekomendasi tindakan yang memangkas waktu siklus pekerjaan hingga 25%.`;
      }

      const powerVerbs = [
        'Mengembangkan', 'Memimpin', 'Merancang', 'Mengoptimalkan',
        'Mengintegrasikan', 'Mengelola', 'Mengeksekusi', 'Menganalisis'
      ];

      return lines
        .map((line, idx) => {
          let clean = line.replace(/^[\s*\-•>·\d.)]+/, '').trim();
          if (!clean) return '';
          clean = clean.replace(
            /^(bertanggung jawab untuk|bertanggung jawab atas|tugasnya|bantu|membantu|mengerjakan|pekerjaan saya|ikut serta dalam)\s*/i,
            ''
          );
          clean = clean.charAt(0).toUpperCase() + clean.slice(1);

          const startsWithVerb = powerVerbs.some((v) =>
            clean.toLowerCase().startsWith(v.toLowerCase().slice(0, 5))
          );
          const verb = powerVerbs[idx % powerVerbs.length];
          const hasMetric = /\b(\d+%|\d+x|\d+\s*(orang|user|klien|juta)|rp\.?\s*\d+|\d{2,})\b/i.test(
            clean
          );

          let polished = clean;
          if (!startsWithVerb) {
            polished = `${verb} ${clean.charAt(0).toLowerCase() + clean.slice(1)}`;
          }

          if (!hasMetric) {
            if (tone === 'technical') {
              polished += ', meningkatkan efisiensi teknis dan waktu respon sistem hingga 30%';
            } else if (tone === 'concise') {
              polished += ' dengan tingkat ketercapaian target 100%';
            } else {
              polished += ', menghasilkan peningkatan efisiensi proses kerja hingga 25%';
            }
          }

          return polished.replace(/\.\s*$/, '') + '.';
        })
        .filter(Boolean)
        .join('\n');
    }

    if (section === 'project') {
      const name = meta.name || 'Proyek Unggulan';
      const role = meta.role || 'Lead Contributor';
      const cleanDesc = text
        ? text.replace(/^[\s*\-•>·]+/, '').trim()
        : 'Pengembangan arsitektur terintegrasi';

      if (tone === 'technical') {
        return `Merancang dan mengimplementasikan arsitektur teknis ${name} sebagai ${role}, mengintegrasikan modul performa tinggi yang memangkas waktu pemrosesan data hingga 35%.`;
      }
      if (tone === 'concise') {
        return `Mengeksekusi ${name} sebagai ${role}, menyelesaikan seluruh ruang lingkup pekerjaan tepat waktu dengan tingkat kepuasan pengguna 95%.`;
      }
      return `Memimpin perancangan dan eksekusi ${name} sebagai ${role}, mentransformasikan ${
        cleanDesc.charAt(0).toLowerCase() + cleanDesc.slice(1)
      } menjadi solusi terukur yang meningkatkan efisiensi operasional hingga 30%.`;
    }

    return text;
  };

  const handleTriggerAIPolish = async (
    section,
    currentText,
    targetId = null,
    meta = {}
  ) => {
    const titles = {
      headline: 'Poles Headline Profesional (AI)',
      summary: 'Poles Ringkasan Profil STAR (AI)',
      bullets: 'Poles Butir Pengalaman Kerja STAR (AI)',
      project: 'Poles Deskripsi Proyek Unggulan (AI)',
    };

    setAiModal({
      isOpen: true,
      title: titles[section] || 'Poles Konten AI',
      section,
      targetId,
      meta,
      originalText: currentText || '',
      suggestedText: 'Sedang menganalisis dan memoles naskah Anda...',
      tone: 'impact',
      isGenerating: true,
    });

    let result = null;
    if (geminiApiKey.trim()) {
      let prompt = '';
      if (section === 'headline') {
        prompt = `You are an elite executive ATS resume consultant. Rewrite this resume headline in Indonesian to be high-impact, professional, and ATS keyword-rich: "${currentText}". Keep it under 15 words. Return ONLY the rewritten text without quotation marks or em dashes.`;
      } else if (section === 'summary') {
        prompt = `You are an executive ATS resume consultant. Rewrite this professional summary in Indonesian following the 3-sentence recruiter formula (Identity + STAR Impact + Value Proposition): "${currentText}". Strict rule: DO NOT use any em dash characters. Return ONLY the rewritten paragraph without commentary.`;
      } else if (section === 'bullets') {
        prompt = `You are an executive ATS resume consultant. Transform these bullet points for ${
          meta.position || 'the role'
        } into strict STAR bullet points in Indonesian with strong active power verbs and quantifiable metrics: \n${currentText}\nStrict rule: DO NOT use any em dash characters. 1 line per bullet point. Return ONLY the bullets without conversational filler.`;
      } else if (section === 'project') {
        prompt = `You are an executive ATS resume consultant. Rewrite this project description for ${
          meta.name || 'a project'
        } in Indonesian to highlight role, technology, and measurable outcome: "${currentText}". DO NOT use any em dash characters. Return ONLY the rewritten text.`;
      }
      result = await callGeminiAPI(prompt);
    }

    if (!result) {
      result = generateLocalAIPolish(section, currentText, meta, 'impact');
    }

    setAiModal((prev) => ({
      ...prev,
      suggestedText: result,
      isGenerating: false,
    }));
  };

  const handleChangeAiTone = (newTone) => {
    setAiModal((prev) => ({
      ...prev,
      tone: newTone,
      isGenerating: true,
      suggestedText: 'Menerapkan penyesuaian gaya...',
    }));

    setTimeout(() => {
      const result = generateLocalAIPolish(
        aiModal.section,
        aiModal.originalText,
        aiModal.meta,
        newTone
      );
      setAiModal((prev) => ({
        ...prev,
        suggestedText: result,
        isGenerating: false,
      }));
    }, 180);
  };

  const handleApplyAiSuggestion = () => {
    const { section, targetId, suggestedText } = aiModal;
    if (!suggestedText) return;

    if (section === 'headline') {
      handlePersonalChange('headline', suggestedText);
    } else if (section === 'summary') {
      handleSummaryChange(suggestedText);
    } else if (section === 'bullets') {
      handleExperienceChange(targetId, 'bullets', suggestedText);
    } else if (section === 'project') {
      handleProjectChange(targetId, 'description', suggestedText);
    }

    setHasGenerated(true);
    setAiModal((prev) => ({ ...prev, isOpen: false }));
    showToast('Polesan AI berhasil diterapkan ke formulir CV Anda!');
  };

  const handleSaveGeminiKey = (key) => {
    setGeminiApiKey(key.trim());
    localStorage.setItem('kangcv_gemini_key', key.trim());
    setShowAiSettings(false);
    showToast(
      key.trim()
        ? 'Kunci Gemini API berhasil disimpan di peramban!'
        : 'Kunci Gemini dihapus. Kembali ke mesin lokal bawaan.'
    );
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
          <div className="hero-split-grid">
            <div className="hero-copy-col">
              <div className="hero-badge">
                <span className="hero-badge-dot" aria-hidden="true"></span>
                Standar Format HRD &amp; ATS Global
              </div>

              <h1 className="hero-title">
                Buat Resume Standar ATS.
                <span className="hero-title-accent">Lolos Seleksi Kerja.</span>
              </h1>

              <p className="hero-subtitle">
                Tingkatkan peluang panggilan wawancara kerja dengan resume berformat standar ATS murni. 100% teks vektor asli yang mudah dipindai oleh software HRD, bebas biaya, tanpa login, dan privasi Anda tersimpan aman langsung di peramban.
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

              <div className="hero-proof-list">
                <span className="hero-proof-item">
                  <span className="hero-proof-check" aria-hidden="true">✓</span> Single-Column ATS Murni
                </span>
                <span className="hero-proof-item">
                  <span className="hero-proof-check" aria-hidden="true">✓</span> 100% Vektor PDF A4
                </span>
                <span className="hero-proof-item">
                  <span className="hero-proof-check" aria-hidden="true">✓</span> Privasi Lokal Tanpa Database
                </span>
              </div>
            </div>

            <div className="hero-visual-col">
              <div className="hero-mock-pedestal">
                <div
                  className="hero-showcase-card"
                  onClick={() => setCurrentView('builder')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setCurrentView('builder');
                    }
                  }}
                  title="Klik untuk membuka editor CV"
                >
                  <div className="showcase-header">
                    <span className="showcase-pill">100% ATS Parsable</span>
                    <span>A4 Margin 15mm</span>
                  </div>

                  <div className="showcase-paper">
                    <h2 className="showcase-name">ALYA PRATIWI SARI</h2>
                    <p className="showcase-role">
                      UI/UX Designer | Frontend Developer | Design Systems
                    </p>
                    <p className="showcase-contact">
                      Jakarta, Indonesia | alya.pratiwi.sari@example.com | +62 811-9876-5432 | LinkedIn
                    </p>
                    <hr className="showcase-divider" />
                    <h3 className="showcase-sec-title">PROFESSIONAL SUMMARY</h3>
                    <p className="showcase-body">
                      UI/UX Designer and Frontend Developer with 5+ years crafting user-centered digital products, design systems, and performant web interfaces. Experienced in Figma, React, Next.js, and WCAG AA accessibility standards.
                    </p>
                    <h3 className="showcase-sec-title" style={{ marginTop: '10px' }}>WORK EXPERIENCE</h3>
                    <p className="showcase-body">
                      <strong>Senior UI/UX Designer</strong>, Luna Tech Studio | Jan 2023 - Present
                    </p>
                    <p className="showcase-body" style={{ color: '#475569', fontSize: '0.73rem', marginTop: '3px' }}>
                      • Lead end-to-end design for SaaS analytics dashboard serving 50k+ monthly active users.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* ATS Education & Comparison Section */}
        <section className="landing-section">
          <div className="section-header">
            <span className="section-tag">Edukasi Standar Rekrutmen</span>
            <h2 className="section-title">Mengapa Harus Format ATS?</h2>
            <p className="section-subtitle">
              Lebih dari 75% CV pelamar kerja gugur di tahap awal seleksi otomatis karena sistem penyaring HRD gagal membaca format dokumen yang berantakan atau bertumpuk.
            </p>
          </div>

          <div className="comparison-grid">
            {/* Card: Graphic/Canva Format */}
            <div className="compare-card compare-card-bad">
              <span className="compare-badge-bad">Beresiko Gagal di ATS</span>
              <h3 className="compare-title">Format Grafis / Desain Biasa</h3>
              <ul className="compare-list">
                <li>
                  <span className="compare-icon-bad" aria-hidden="true">✕</span>
                  <span>Kolom ganda atau tata letak tabel rumit membuat alur baca sistem ATS menjadi acak dan terpotong.</span>
                </li>
                <li>
                  <span className="compare-icon-bad" aria-hidden="true">✕</span>
                  <span>Teks sering diekspor sebagai gambar atau kurva bitmap yang tidak dapat dibaca oleh mesin pencari kata kunci.</span>
                </li>
                <li>
                  <span className="compare-icon-bad" aria-hidden="true">✕</span>
                  <span>Ikon dekoratif, rating bintang keahlian, dan foto profil membingungkan algoritma penyaring HRD.</span>
                </li>
              </ul>
            </div>

            {/* Card: Kang CV Mu Standard ATS */}
            <div className="compare-card compare-card-good">
              <span className="compare-badge-good">Rekomendasi Standar ATS</span>
              <h3 className="compare-title">Format Standar Kang CV Mu</h3>
              <ul className="compare-list">
                <li>
                  <span className="compare-icon-good" aria-hidden="true">✓</span>
                  <span>Struktur kolom tunggal (*single-column*) murni dengan hirarki baca atas ke bawah yang logis dan konsisten.</span>
                </li>
                <li>
                  <span className="compare-icon-good" aria-hidden="true">✓</span>
                  <span>Ekspor teks vektor A4 beresolusi tinggi yang 100% dapat diseleksi, dicari, dan diparsing otomatis oleh software HRD.</span>
                </li>
                <li>
                  <span className="compare-icon-good" aria-hidden="true">✓</span>
                  <span>Tipografi klasik standar industri (Times New Roman / Calibri) yang diakui secara global oleh Workday, Taleo, dan Greenhouse.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical 3-Step Process Section */}
        <section className="landing-section" style={{ paddingTop: '10px' }}>
          <div className="section-header">
            <span className="section-tag">Alur Praktis</span>
            <h2 className="section-title">3 Langkah Mudah Miliki CV Impian</h2>
            <p className="section-subtitle">
              Tanpa perlu menginstal perangkat lunak berat atau mendaftar akun. Siap dalam hitungan menit.
            </p>
          </div>

          <div className="process-grid">
            <div className="process-card">
              <div className="process-step-num" aria-hidden="true">01</div>
              <h3 className="process-title">Isi Data Karir</h3>
              <p className="process-desc">
                Masukkan identitas, ringkasan profil, pengalaman kerja, pendidikan, dan keahlian Anda melalui formulir terstruktur kami.
              </p>
            </div>

            <div className="process-card">
              <div className="process-step-num" aria-hidden="true">02</div>
              <h3 className="process-title">Pratinjau Langsung</h3>
              <p className="process-desc">
                Lihat simulasi dokumen A4 standar ATS secara instan di layar komputer Anda untuk memastikan tidak ada kesalahan ketik.
              </p>
            </div>

            <div className="process-card">
              <div className="process-step-num" aria-hidden="true">03</div>
              <h3 className="process-title">1-Klik Unduh PDF</h3>
              <p className="process-desc">
                Cetak atau unduh dokumen PDF vektor A4 resmi yang siap dikirimkan ke berbagai portal lowongan kerja impian Anda.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="fitur" className="landing-section">
          <div className="section-header">
            <span className="section-tag">Fitur Unggulan</span>
            <h2 className="section-title">Keunggulan Teknis Kang CV Mu</h2>
            <p className="section-subtitle">
              Dibangun dengan teknologi web modern untuk performa tinggi, privasi penuh, dan hasil cetak dokumen berkualitas profesional.
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
              <h3 className="feature-title">Susunkan Otomatis (HR Ready)</h3>
              <p className="feature-desc">
                Satu klik untuk mengurutkan riwayat secara kronologis terbalik, membersihkan format butir pencapaian, dan menonjolkan kata kerja aksi STAR.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-badge" aria-hidden="true">
                3
              </div>
              <h3 className="feature-title">Paket Berkas HRD (.ZIP)</h3>
              <p className="feature-desc">
                Unduh bundel siap lamar lengkap: PDF A4 resmi, template naskah cover email lamaran, dan data cadangan JSON dalam satu arsip ZIP.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-badge" aria-hidden="true">
                4
              </div>
              <h3 className="feature-title">Audit Kualitas ATS &amp; HR</h3>
              <p className="feature-desc">
                Pemeriksaan langsung skor keterbacaan (0-100), pendeteksian kata kerja aktif, dan kuantifikasi capaian (angka dan persentase) secara real-time.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-badge" aria-hidden="true">
                5
              </div>
              <h3 className="feature-title">Ekspor PDF Vektor A4</h3>
              <p className="feature-desc">
                Hasil cetak berformat A4 dengan teks asli yang dapat diseleksi dan dibaca mesin pemindai dokumen, bukan tangkapan layar gambar raster.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-badge" aria-hidden="true">
                6
              </div>
              <h3 className="feature-title">Privasi 100% Aman di Lokal</h3>
              <p className="feature-desc">
                Data pribadi dan riwayat karir Anda tidak pernah dikirimkan ke server eksternal. Seluruh pemrosesan berjalan sepenuhnya di peramban Anda.
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

            {/* Smart Auto-Arrange for HR Button */}
            <button
              type="button"
              className="btn btn-accent"
              onClick={handleAutoArrange}
              title="Urutkan riwayat secara kronologis dan rapikan butir pencapaian untuk menarik perhatian HRD"
            >
              <SparklesIcon />
              <span>Susun Otomatis</span>
            </button>

            {/* HR Package Bundle Button */}
            <button
              type="button"
              className="btn btn-package"
              onClick={() => setShowPackageModal(true)}
              title="Paket Berkas HRD: PDF A4, JSON, dan Template Cover Email Lamaran"
            >
              <PackageIcon />
              <span>Paket HRD</span>
            </button>

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
          {/* CV Pro Control Bar & Preset Switcher */}
          <div className="pro-control-bar">
            <div className="pro-pill-group">
              <span className="pro-badge-pill">
                <ShieldCheckIcon />
                <span>MODE CV PRO</span>
              </span>
              <span className="pro-sub-note">Standar ATS Terverifikasi</span>
              <button
                type="button"
                className="btn-ai-pill"
                onClick={() => {
                  setTempApiKey(geminiApiKey);
                  setShowAiSettings(true);
                }}
                title="Pengaturan AI: Gunakan mesin offline bawaan atau sambungkan Kunci Gemini API"
              >
                <MagicWandIcon />
                <span>{geminiApiKey ? 'Gemini AI Aktif' : 'AI Offline Aktif'}</span>
              </button>
            </div>

            <div className="preset-selector" role="group" aria-label="Pilihan Preset Format ATS">
              <span className="preset-selector-label">Preset Format:</span>
              <div className="preset-buttons">
                <button
                  type="button"
                  className={`btn-preset ${proPreset === 'executive' ? 'active' : ''}`}
                  onClick={() => {
                    setProPreset('executive');
                    setHasGenerated(true);
                  }}
                  title="Preset klasik Serif (Times New Roman), pembatas rapi, orientasi profesional mapan"
                >
                  Executive Serif
                </button>
                <button
                  type="button"
                  className={`btn-preset ${proPreset === 'modern' ? 'active' : ''}`}
                  onClick={() => {
                    setProPreset('modern');
                    setHasGenerated(true);
                  }}
                  title="Preset Sans-Serif bersih dan modern, kategori teknis terstruktur rapi"
                >
                  Modern Sans
                </button>
                <button
                  type="button"
                  className={`btn-preset ${proPreset === 'freshgrad' ? 'active' : ''}`}
                  onClick={() => {
                    setProPreset('freshgrad');
                    setHasGenerated(true);
                  }}
                  title="Preset khusus Fresh Graduate: memprioritaskan riwayat Pendidikan dan Proyek di bagian atas"
                >
                  Fresh Graduate
                </button>
              </div>
            </div>
          </div>

          {/* Live HR Quality Audit Card */}
          <div className="hr-audit-card">
            <div
              className="hr-audit-header"
              onClick={() => setShowAuditDrawer((prev) => !prev)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setShowAuditDrawer((prev) => !prev);
                }
              }}
              aria-expanded={showAuditDrawer}
            >
              <div className="hr-audit-main-info">
                <div
                  className={`audit-score-circle ${
                    hrAudit.score >= 80
                      ? 'score-high'
                      : hrAudit.score >= 50
                      ? 'score-med'
                      : 'score-low'
                  }`}
                >
                  <span>{hrAudit.score}</span>
                  <small>/100</small>
                </div>
                <div>
                  <div className="audit-title-row">
                    <h3 className="audit-card-title">Audit Kualitas HR &amp; ATS</h3>
                    <span className="audit-grade-tag">
                      {hrAudit.score >= 85
                        ? 'Sangat Siap Dilirik HRD'
                        : hrAudit.score >= 65
                        ? 'Standar ATS Terpenuhi'
                        : 'Perlu Pengisian Tambahan'}
                    </span>
                  </div>
                  <div className="audit-micro-tags">
                    <span className="audit-tag">
                      <strong>{hrAudit.actionVerbCount}</strong> Kata Kerja Aksi (STAR)
                    </span>
                    <span className="audit-tag">
                      <strong>{hrAudit.metricCount}</strong> Capaian Terukur (Angka/%)
                    </span>
                  </div>
                </div>
              </div>

              <div className="audit-header-right">
                <button
                  type="button"
                  className="btn btn-accent btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAutoArrange();
                  }}
                  title="Susunkan otomatis data Anda"
                >
                  <SparklesIcon />
                  <span>Susun Otomatis</span>
                </button>
                <span className="audit-collapse-icon" aria-hidden="true">
                  <ChevronDownIcon isOpen={showAuditDrawer} />
                </span>
              </div>
            </div>

            {showAuditDrawer && (
              <div className="hr-audit-content">
                <div className="audit-progress-track">
                  <div
                    className="audit-progress-fill"
                    style={{ width: `${hrAudit.score}%` }}
                  />
                </div>

                {hrAudit.tips.length > 0 ? (
                  <div className="audit-tips-box">
                    <p className="audit-tips-title">Saran Optimasi untuk Menarik Minat HRD:</p>
                    <ul className="audit-tips-list">
                      {hrAudit.tips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="audit-perfect-note">
                    CV Anda telah memenuhi seluruh kriteria utama pindaian ATS dan format 6 detik HRD. Siap untuk diekspor ke PDF dan dilampirkan ke lamaran kerja!
                  </div>
                )}
              </div>
            )}
          </div>

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
              <div className="field-label-row">
                <label className="field-label" htmlFor="headline">
                  Headline
                </label>
                <button
                  type="button"
                  className="btn-ai-field"
                  onClick={() =>
                    handleTriggerAIPolish('headline', data.personal.headline)
                  }
                  title="Poles headline dengan AI agar ramah ATS dan menarik minat HRD"
                >
                  <MagicWandIcon />
                  <span>Poles AI</span>
                </button>
              </div>
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
              <button
                type="button"
                className="btn-ai-field"
                onClick={() => handleTriggerAIPolish('summary', data.summary)}
                title="Poles ringkasan profesional dengan formula 3 kalimat HRD"
              >
                <MagicWandIcon />
                <span>Poles AI (STAR)</span>
              </button>
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
                      placeholder="PT Maju Bersama"
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
                  <div className="field-label-row">
                    <label className="field-label" htmlFor={`exp-bul-${exp.id}`}>
                      Pencapaian &amp; Tanggung Jawab (1 baris = 1 butir)
                    </label>
                    <button
                      type="button"
                      className="btn-ai-field"
                      onClick={() =>
                        handleTriggerAIPolish('bullets', exp.bullets, exp.id, {
                          position: exp.position,
                          company: exp.company,
                        })
                      }
                      title="Ubah butir pengalaman menjadi format STAR dengan kata kerja aktif dan metrik terukur"
                    >
                      <MagicWandIcon />
                      <span>Poles AI (STAR)</span>
                    </button>
                  </div>
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
                  <div className="field-label-row">
                    <label className="field-label" htmlFor={`proj-desc-${proj.id}`}>
                      Deskripsi Singkat &amp; Capaian
                    </label>
                    <button
                      type="button"
                      className="btn-ai-field"
                      onClick={() =>
                        handleTriggerAIPolish('project', proj.description, proj.id, {
                          name: proj.name,
                          role: proj.role,
                        })
                      }
                      title="Poles deskripsi proyek dengan AI agar menonjolkan peran dan capaian nyata"
                    >
                      <MagicWandIcon />
                      <span>Poles AI</span>
                    </button>
                  </div>
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
            <div
              id="resume-print-area"
              className={`ats-paper ${isProMode ? `preset-${proPreset}` : ''}`}
            >
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

                  {/* Dynamic Section Ordering based on proPreset */}
                  {proPreset === 'freshgrad' ? (
                    <>
                      {/* 1. Education */}
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

                      {/* 2. Featured Projects */}
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

                      {/* 3. Skills */}
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

                      {/* 4. Experience / Internship */}
                      {data.experiences.some((e) => e.position || e.company) && (
                        <div className="ats-section">
                          <h2 className="ats-section-title">Work Experience &amp; Internships</h2>
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
                    </>
                  ) : (
                    <>
                      {/* Standard / Executive / Modern Order */}
                      {/* 1. Experience */}
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

                      {/* 2. Education */}
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

                      {/* 3. Skills */}
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

                      {/* 4. Projects */}
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
                    </>
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

      {/* Floating Bottom Action Bar for Mobile Screens */}
      <div className="mobile-bottom-bar no-print">
        <button
          type="button"
          className="btn btn-outline"
          onClick={handleLoadSample}
          title="Muat data contoh"
        >
          Contoh
        </button>
        <button
          type="button"
          className="btn btn-accent"
          onClick={handleAutoArrange}
          title="Susunkan Otomatis untuk HRD"
        >
          <SparklesIcon />
          <span>Susun</span>
        </button>
        <button
          type="button"
          className="btn btn-package"
          onClick={() => setShowPackageModal(true)}
          title="Paket Berkas HRD"
        >
          <PackageIcon />
          <span>Paket HRD</span>
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </div>

      {/* Modal Paket Berkas HRD */}
      {showPackageModal && (
        <div
          className="modal-overlay no-print"
          onClick={() => setShowPackageModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-pkg-title"
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title-group">
                <div className="modal-icon-badge" aria-hidden="true">
                  <PackageIcon />
                </div>
                <div>
                  <h3 id="modal-pkg-title" className="modal-title">
                    Paket Berkas Siap Lamar HRD
                  </h3>
                  <p className="modal-subtitle">
                    Berkas lengkap terstandarisasi untuk meningkatkan peluang dipanggil wawancara
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setShowPackageModal(false)}
                aria-label="Tutup jendela paket berkas"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-intro">
                HRD dan tim rekrutmen menyukai pelamar kerja yang rapi, profesional, dan menyediakan berkas siap proses. Paket ini mengemas seluruh kebutuhan pengiriman lamaran Anda dalam satu klik:
              </p>

              <div className="pkg-items-grid">
                {/* Item 1: PDF ATS */}
                <div className="pkg-item-card">
                  <div className="pkg-item-header">
                    <span className="pkg-badge">Dokumen Utama</span>
                    <h4>1. CV ATS Resmi (PDF A4)</h4>
                  </div>
                  <p>
                    Format standar single-column yang lolos parser ATS dan nyaman dibaca human recruiter.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      setShowPackageModal(false);
                      handleDownloadPDF();
                    }}
                  >
                    Buka Dialog Cetak PDF
                  </button>
                </div>

                {/* Item 2: Cover Email */}
                <div className="pkg-item-card">
                  <div className="pkg-item-header">
                    <span className="pkg-badge">Siap Salin</span>
                    <h4>2. Template Cover Email Lamaran</h4>
                  </div>
                  <p>
                    Naskah pengantar formal untuk badan email pelamaran, memuat salam hormat dan 3 keunggulan Anda.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={handleCopyCoverEmail}
                  >
                    <CopyIcon /> Salin Naskah Email
                  </button>
                </div>

                {/* Item 3: Data JSON Backup */}
                <div className="pkg-item-card">
                  <div className="pkg-item-header">
                    <span className="pkg-badge">Cadangan</span>
                    <h4>3. Berkas Data Cadangan (.JSON)</h4>
                  </div>
                  <p>
                    Data terstruktur untuk menyimpan isian formulir agar bisa Anda perbarui sewaktu-waktu di Kang CV Mu.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={handleExportJSON}
                  >
                    Unduh JSON
                  </button>
                </div>
              </div>

              {/* Preview Naskah Email Box */}
              <div className="email-preview-box">
                <div className="email-preview-header">
                  <span>Pratinjau Naskah Email Lamaran:</span>
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs"
                    onClick={handleCopyCoverEmail}
                  >
                    <CopyIcon /> Salin Teks
                  </button>
                </div>
                <textarea
                  className="email-preview-textarea"
                  readOnly
                  rows={6}
                  value={generateCoverEmailText()}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowPackageModal(false)}
              >
                Tutup
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDownloadPackageZip}
              >
                <PackageIcon />
                <span>Unduh Seluruh Paket (.ZIP)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal AI Content Optimizer (Before vs After) */}
      {aiModal.isOpen && (
        <div
          className="modal-overlay no-print"
          onClick={() => setAiModal((prev) => ({ ...prev, isOpen: false }))}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-ai-title"
        >
          <div
            className="modal-card modal-ai-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title-group">
                <div className="modal-icon-badge badge-ai" aria-hidden="true">
                  <MagicWandIcon />
                </div>
                <div>
                  <h3 id="modal-ai-title" className="modal-title">
                    {aiModal.title}
                  </h3>
                  <p className="modal-subtitle">
                    Optimasi cerdas berbasis formula STAR dan standar pemindaian HRD
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setAiModal((prev) => ({ ...prev, isOpen: false }))}
                aria-label="Tutup jendela polesan AI"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="modal-body">
              {/* Tone Selection Tabs */}
              <div className="ai-tone-bar">
                <span className="ai-tone-label">Pilih Karakter Teks:</span>
                <div className="ai-tone-buttons">
                  <button
                    type="button"
                    className={`btn-ai-tone ${aiModal.tone === 'impact' ? 'active' : ''}`}
                    onClick={() => handleChangeAiTone('impact')}
                  >
                    Dampak &amp; Hasil (Rekomendasi)
                  </button>
                  <button
                    type="button"
                    className={`btn-ai-tone ${aiModal.tone === 'technical' ? 'active' : ''}`}
                    onClick={() => handleChangeAiTone('technical')}
                  >
                    Spesialis Teknis
                  </button>
                  <button
                    type="button"
                    className={`btn-ai-tone ${aiModal.tone === 'concise' ? 'active' : ''}`}
                    onClick={() => handleChangeAiTone('concise')}
                  >
                    Ringkas &amp; Terpadu
                  </button>
                </div>
              </div>

              {/* Side-by-side comparison */}
              <div className="ai-compare-grid">
                <div className="ai-box ai-box-before">
                  <div className="ai-box-header">
                    <span className="ai-box-tag tag-before">Teks Asli Anda</span>
                  </div>
                  <div className="ai-box-content">
                    {aiModal.originalText ? (
                      <p>{aiModal.originalText}</p>
                    ) : (
                      <em className="text-muted">(Kolom sebelumnya masih kosong)</em>
                    )}
                  </div>
                </div>

                <div className="ai-box ai-box-after">
                  <div className="ai-box-header">
                    <span className="ai-box-tag tag-after">
                      <MagicWandIcon /> Hasil Polesan AI Pro
                    </span>
                  </div>
                  <div className="ai-box-content">
                    {aiModal.isGenerating ? (
                      <div className="ai-loading-state">
                        <span className="ai-spinner" aria-hidden="true"></span>
                        <p>{aiModal.suggestedText}</p>
                      </div>
                    ) : (
                      <textarea
                        className="ai-editable-textarea"
                        rows={6}
                        value={aiModal.suggestedText}
                        onChange={(e) =>
                          setAiModal((prev) => ({
                            ...prev,
                            suggestedText: e.target.value,
                          }))
                        }
                        title="Anda dapat menyunting teks ini secara bebas sebelum menerapkan"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="ai-note-box">
                <p>
                  <strong>Tips HRD:</strong> Teks hasil polesan AI menggunakan struktur kata kerja aktif dan estimasi metrik kuantitatif. Anda dapat menyesuaikan angka persentase atau nominal agar 100% akurat dengan pencapaian riil Anda.
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setAiModal((prev) => ({ ...prev, isOpen: false }))}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn btn-ai-apply"
                disabled={aiModal.isGenerating || !aiModal.suggestedText}
                onClick={handleApplyAiSuggestion}
              >
                <MagicWandIcon />
                <span>Terapkan ke CV Saya</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pengaturan Kunci Gemini API (Opsional) */}
      {showAiSettings && (
        <div
          className="modal-overlay no-print"
          onClick={() => setShowAiSettings(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-settings-title"
        >
          <div
            className="modal-card modal-settings-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title-group">
                <div className="modal-icon-badge badge-ai" aria-hidden="true">
                  <MagicWandIcon />
                </div>
                <div>
                  <h3 id="modal-settings-title" className="modal-title">
                    Pengaturan Asisten AI
                  </h3>
                  <p className="modal-subtitle">
                    Mesin bawaan offline aktif, opsi sambungkan Google Gemini API
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setShowAiSettings(false)}
                aria-label="Tutup jendela pengaturan AI"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-intro">
                Secara default, Kang CV Mu menggunakan <strong>Mesin AI Cerdas Bawaan</strong> yang bekerja 100% lokal, cepat, dan tanpa biaya. Jika Anda ingin menggunakan model bahasa generatif Google Gemini 1.5 Flash untuk analisis mendalam, Anda dapat memasukkan kunci API gratis Anda di bawah ini:
              </p>

              <div className="field-group">
                <label className="field-label" htmlFor="geminiApiKey">
                  Google Gemini API Key (Opsional)
                </label>
                <input
                  id="geminiApiKey"
                  className="form-input"
                  type="password"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                />
                <span className="field-hint">
                  Kunci API hanya disimpan di peramban (localStorage) Anda dan tidak dikirim ke server Kang CV Mu. Dapatkan gratis di{' '}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Google AI Studio
                  </a>
                  .
                </span>
              </div>
            </div>

            <div className="modal-footer">
              {geminiApiKey && (
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => handleSaveGeminiKey('')}
                >
                  Hapus Kunci (Gunakan Offline)
                </button>
              )}
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowAiSettings(false)}
              >
                Tutup
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSaveGeminiKey(tempApiKey)}
              >
                Simpan Pengaturan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating feedback notification */}
      {toastMessage && (
        <div className="toast-msg" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
