/**
 * Fahim Muntasir - Portfolio Interactive Engine
 * Ultra-Premium, Tactile Micro-Interactions & Performance
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDhakaClock();
  initNavScroll();
  initProjectFilters();
  initProjectModal();
  initTerminal();
  initCopyButtons();
  initKeyboardShortcuts();
  initSpotlightCards();
  initBibtexButtons();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('i');
  const storedTheme = localStorage.getItem('fahim_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', initialTheme);
  updateThemeIcon(initialTheme, themeIcon);

  themeToggle?.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('i');
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('fahim_theme', newTheme);
  updateThemeIcon(newTheme, themeIcon);
}

function updateThemeIcon(theme, iconEl) {
  if (!iconEl) return;
  if (theme === 'light') {
    iconEl.className = 'fa-solid fa-moon';
  } else {
    iconEl.className = 'fa-solid fa-sun';
  }
}

/* ==========================================================================
   2. Live Dhaka Clock & Dynamic Greeting
   ========================================================================== */
function initDhakaClock() {
  const clockEl = document.getElementById('dhaka-clock');
  const greetingEl = document.getElementById('hero-greeting');

  function updateTime() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const dhakaTimeStr = new Intl.DateTimeFormat('en-US', options).format(now);
      
      if (clockEl) {
        clockEl.textContent = dhakaTimeStr + ' (GMT+6)';
      }

      if (greetingEl) {
        const hour = parseInt(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Dhaka', hour: 'numeric', hour12: false }).format(now), 10);
        let greeting = 'Hello';
        if (hour >= 5 && hour < 12) greeting = 'Good morning';
        else if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
        else if (hour >= 17 && hour < 22) greeting = 'Good evening';
        else greeting = 'Burning the midnight oil? Welcome';

        greetingEl.textContent = `${greeting}, I'm`;
      }
    } catch (e) {
      if (clockEl) clockEl.textContent = 'Dhaka, Bangladesh';
    }
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* ==========================================================================
   3. Navigation & Smooth Scroll
   ========================================================================== */
function initNavScroll() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
    const icon = mobileToggle.querySelector('i');
    if (navMenu?.classList.contains('open')) {
      icon?.classList.replace('fa-bars', 'fa-xmark');
    } else {
      icon?.classList.replace('fa-xmark', 'fa-bars');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('open');
      mobileToggle?.querySelector('i')?.classList.replace('fa-xmark', 'fa-bars');
    });
  });

  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Projects Filter
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || (filter === 'mern' && category.includes('mern'))) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Project Case Study Modal Data & Handlers
   ========================================================================== */
const projectDetails = {
  'playground': {
    title: 'Smart Playground Booking & Tournament Management',
    tagline: 'Streamlining community sports reservations & competitive tournaments',
    problem: 'Local sports arenas (cricket, football, badminton) suffer from double bookings, delayed manual phone confirmations, and chaotic knockout tournament scheduling on whiteboards.',
    solution: 'Built a full-stack MERN application offering real-time turf slot reservations, dynamic pricing based on peak hours, and an automated tournament bracket builder with live scoreboards.',
    features: [
      'Interactive time-slot calendar with instant slot reservation and instant lock to prevent double booking.',
      'Automated single-elimination tournament bracket generator.',
      'Facility dashboard for pitch owners to manage pricing, cash-in reports, and slot maintenance.',
      'Mobile-responsive design optimized for players booking on the go.'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'RESTful APIs'],
    repo: 'https://github.com/fahim-m30',
    live: 'https://smart-playground-booking-tournament.vercel.app/login.html'
  },
  'shop-manager': {
    title: 'Shop Manager (POS & Inventory Suite)',
    tagline: 'Real-time retail inventory tracking and automated sales billing',
    problem: 'Small and medium retail shops in Dhaka frequently lose revenue due to undetected stock shortages, error-prone manual receipt paper logs, and zero sales analytics.',
    solution: 'Engineered a modern retail management application that syncs stock levels in real time, generates clean printable PDF invoices on checkout, and provides daily revenue analytics.',
    features: [
      'Real-time inventory deduction upon POS sale with low-stock warning banners.',
      'Instant automated invoice generation formatted for standard thermal receipts & A4.',
      'Role-based access control (Admin vs. Cashier/Sales Staff) to protect financial data.',
      'Interactive sales analytics graph displaying revenue, top-selling items, and profit margins.'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Recharts', 'JWT Auth'],
    repo: 'https://github.com/fahim-m30',
    live: 'https://shop-manager-bd.vercel.app/'
  },
  'flight-booking': {
    title: 'Online Flight Booking Management System',
    tagline: 'Multi-route reservation platform with automated ticketing',
    problem: 'Traditional academic flight projects often neglect structural relational modeling, leading to data inconsistency and poor ticket validation.',
    solution: 'Architected a robust flight reservation engine designed with thorough Data Flow Diagrams (DFD) and relational database normalisation. Handles multi-city routes, user authentication, and PDF e-ticket issuance.',
    features: [
      'Advanced flight search queries filtering by departure, arrival, transit, and seat class.',
      'Dynamic ticket fare computation factoring in seat tier and baggage add-ons.',
      'Automated PDF ticket generator with unique booking reference code and QR placeholder.',
      'Comprehensive administrative control over flight schedules and passenger manifests.'
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML5/CSS3', 'DFD Modeling'],
    repo: 'https://github.com/fahim-m30'
  },
  'federated-ids': {
    title: 'A Hybrid Synthetic Oversampling and Federated Learning Framework for Class-Imbalanced Intrusion Detection in Heterogeneous Networks',
    tagline: '2026 IEEE SPICSCON (BAUET, Bangladesh) • Snaholata Mondal, Md. Julker Nain Rakib, Fahim Muntasir',
    problem: 'Benchmark intrusion detection datasets (CIC-UNSW-NB15 and CICIDS2017) exhibit acute class imbalance where rare, sophisticated attacks are vastly outnumbered by benign traffic. In decentralized network environments, statistical client heterogeneity and privacy restrictions prevent pooling raw telemetry, causing conventional models to overlook zero-day attacks.',
    solution: 'Designed and evaluated a hybrid federated intrusion detection framework combining 3 synthetic oversampling techniques (SMOTE, SMOTE-Tomek, GAN-based SMOTE) with 6 federated learning optimization algorithms (FedAvg, FedProx, FedDyn, SCAFFOLD, DP-Fed, FedOpt). Added SHAP and LIME for transparent model explainability.',
    features: [
      'Comparative benchmarking across individual (CICIDS2017, CIC-UNSW-NB15) and merged heterogeneous datasets.',
      'Comprehensive evaluation of 6 FL optimization algorithms with client drift mitigation and Differential Privacy.',
      'Achieved up to 0.9997 F1-score on minority attack vector detection while strictly preserving local client data privacy.',
      'Model interpretability via SHAP (global feature importance) and LIME (local instance predictions).',
      'Presented at 2026 IEEE International Conference on Signal Processing, Information, Communication and Systems (SPICSCON).'
    ],
    tech: ['Python', 'Federated Learning (6 Alg.)', 'GAN-based SMOTE', 'PyTorch / TensorFlow', 'SHAP & LIME (XAI)', 'Differential Privacy'],
    repo: 'https://github.com/fahim-m30',
    live: 'assets/papers/ieee-spicscon-2026-federated-ids.pdf'
  },
  'alzheimer-mri': {
    title: 'Explainable AI for Multi-Class Alzheimer’s Disease Severity',
    tagline: 'Deep learning MRI severity classification with clinical interpretability',
    problem: 'Diagnosing Alzheimer’s stages (Non-Demented, Very Mild, Mild, Moderate) from structural MRI is hindered by dataset imbalance and the "black box" nature of deep neural networks, making clinicians reluctant to trust model predictions.',
    solution: 'Authored an explainable and class-imbalance-aware deep learning framework for brain MRI classification, utilizing Grad-CAM to generate visual heatmaps pinpointing neurological atrophy.',
    features: [
      'Multi-class severity classification from 2D/3D structural brain MRI slices.',
      'Incorporated class-balanced loss functions and rigorous augmentation pipelines.',
      'Integrated Grad-CAM attention heatmaps highlighting hippocampal shrinkage to assist radiologists.',
      'Currently under review as a submitted journal manuscript.'
    ],
    tech: ['Python', 'CNNs / Deep Learning', 'Grad-CAM', 'Medical Imaging', 'PyTorch/TensorFlow'],
    repo: 'https://github.com/fahim-m30'
  },
  'secure-messenger': {
    title: 'Web-Based Secure Messaging Platform',
    tagline: 'Encrypted communication with session integrity',
    problem: 'Lightweight web messaging systems frequently suffer from session hijacking and unauthenticated message injections.',
    solution: 'Built a web-based secure communication application with encrypted payloads, strict input sanitization, and session verification.',
    features: [
      'Encrypted message exchange preventing plaintext database interception.',
      'Session token validation and CSRF defenses.',
      'Real-time inbox sync using lightweight polling/AJAX.',
      'Clean, distraction-free conversational UI.'
    ],
    tech: ['PHP', 'SQL', 'JavaScript', 'Cryptography', 'CSS3'],
    repo: 'https://github.com/fahim-m30'
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const detailButtons = document.querySelectorAll('.btn-details');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectDetails[projectId];
      if (!data) return;

      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-tagline').textContent = data.tagline;
      document.getElementById('modal-problem').textContent = data.problem;
      document.getElementById('modal-solution').textContent = data.solution;
      
      const featuresList = document.getElementById('modal-features');
      featuresList.innerHTML = '';
      data.features.forEach(feat => {
        const li = document.createElement('li');
        li.textContent = feat;
        featuresList.appendChild(li);
      });

      const techContainer = document.getElementById('modal-tech');
      techContainer.innerHTML = '';
      data.tech.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tech-chip';
        span.textContent = t;
        techContainer.appendChild(span);
      });

      const repoBtn = document.getElementById('modal-repo-link');
      if (repoBtn) repoBtn.href = data.repo;

      const liveBtn = document.getElementById('modal-live-link');
      if (liveBtn) {
        if (data.live) {
          liveBtn.href = data.live;
          liveBtn.style.display = 'inline-flex';
        } else {
          liveBtn.style.display = 'none';
        }
      }

      modalOverlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  function closeModal() {
    modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   6. Interactive Terminal
   ========================================================================== */
function initTerminal() {
  const terminalBody = document.getElementById('terminal-body');
  const chips = document.querySelectorAll('.term-chip');
  if (!terminalBody) return;

  const terminalResponses = {
    'whoami': 'Fahim Muntasir — Software Engineer & Tech Researcher based in Dhaka, BD. Passionate about MERN stack systems and federated machine learning.',
    'skills': 'Languages: Python, Golang, JavaScript, PHP, C/C++\nWeb: React, Next.js, Node.js, Express, Django, Tailwind CSS\nDatabases: MongoDB, MySQL, SQL\nSpecializations: Federated Learning, Class-Imbalance in ML, System Architecture.',
    'research': '1. IEEE SPICSCON 2026: "A Hybrid Synthetic Oversampling and Federated Learning Framework for Class-Imbalanced Intrusion Detection in Heterogeneous Networks."\n2. Submitted: "An Explainable Deep Learning Framework for Multi-Class Alzheimer’s Disease Severity from Brain MRI."',
    'experience': 'Software Engineer Intern @ Zentura Agency (June 2026 – Sep 2026): Collaborated with agile teams to build scalable web apps, clean code standards, and agile sprint workflows.',
    'interests': 'Full-stack engineering, distributed systems, medical AI diagnostics, privacy-preserving machine learning, and clean maintainable codebases.',
    'contact': 'Email: fmuntasir488@gmail.com\nPhone: +880 1581876432, +880 1629857561\nGitHub: github.com/fahim-m30\nLinkedIn: linkedin.com/in/fahim-muntasir-086b0b26b',
    'clear': '__CLEAR__'
  };

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });

  function executeCommand(cmd) {
    if (cmd === 'clear') {
      terminalBody.innerHTML = `
        <div class="term-line">
          <span class="term-prompt">fahim@dev:~$</span> <span class="term-cmd">clear</span>
        </div>
        <div class="term-line" style="color: #64748b; font-size: 0.8rem;">
          Terminal cleared. Click any command below to explore.
        </div>
      `;
      return;
    }

    const response = terminalResponses[cmd] || `Command not found: ${cmd}. Try whoami, skills, or research.`;

    const commandBlock = document.createElement('div');
    commandBlock.className = 'term-line';
    commandBlock.innerHTML = `
      <div><span class="term-prompt">fahim@dev:~$</span> <span class="term-cmd">${cmd}</span></div>
      <div class="term-output">${response.replace(/\n/g, '<br>')}</div>
    `;

    terminalBody.appendChild(commandBlock);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
}

/* ==========================================================================
   7. Copy to Clipboard Utility with Toast
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showGlobalToast(`Copied "${textToCopy}" to clipboard!`);
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
        setTimeout(() => {
          btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
        }, 2000);
      }).catch(() => {
        showGlobalToast('Press Ctrl+C to copy');
      });
    });
  });
}

function showGlobalToast(msg) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-msg');
  if (!toast) return;
  if (toastMessage) toastMessage.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   8. Keyboard Shortcuts (T for Theme, Esc for Modal)
   ========================================================================== */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // If user is typing in an input or textarea, ignore
    if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

    if (e.key === 't' || e.key === 'T') {
      toggleTheme();
      showGlobalToast('Switched Theme (Key: T)');
    } else if (e.key === 'Escape') {
      const modalOverlay = document.getElementById('project-modal');
      if (modalOverlay?.classList.contains('active')) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
}

/* ==========================================================================
   9. Spotlight Card Mouse-Tracking Effect (Linear.app Style)
   ========================================================================== */
function initSpotlightCards() {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = `radial-gradient(circle 320px at ${x}px ${y}px, rgba(245, 158, 11, 0.08), var(--bg-card) 70%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = 'var(--bg-card)';
    });
  });
}

/* ==========================================================================
   10. BibTeX Citation Quick Copy
   ========================================================================== */
function initBibtexButtons() {
  const bibtexBtns = document.querySelectorAll('.bibtex-btn');
  const bibtexEntry = `@inproceedings{mondal2026hybrid,
  author    = {Mondal, Snaholata and Rakib, Md. Julker Nain and Muntasir, Fahim},
  title     = {A Hybrid Synthetic Oversampling and Federated Learning Framework for Class-Imbalanced Intrusion Detection in Heterogeneous Networks},
  booktitle = {2026 IEEE International Conference on Signal Processing, Information, Communication and Systems (SPICSCON)},
  pages     = {1--6},
  year      = {2026},
  organization = {IEEE}
}`;

  bibtexBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(bibtexEntry).then(() => {
        showGlobalToast('Copied IEEE SPICSCON BibTeX Citation!');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> BibTeX Copied';
        setTimeout(() => {
          btn.innerHTML = '<i class="fa-solid fa-quote-right"></i> Copy BibTeX';
        }, 2500);
      });
    });
  });
}
