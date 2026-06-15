const htmlElement = document.documentElement;
const mobileNavButton = document.getElementById('mobileNavButton');
const mobileNav = document.getElementById('mobileNav');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function setTheme(theme) {
  const isDark = theme === 'dark';
  htmlElement.classList.toggle('dark', isDark);
  themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  themeToggle?.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  localStorage.setItem('theme', theme);
}

function getInitialTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

if (themeToggle) {
  setTheme(getInitialTheme());
  themeToggle.addEventListener('click', () => {
    setTheme(htmlElement.classList.contains('dark') ? 'light' : 'dark');
  });
}

mobileNavButton?.addEventListener('click', () => {
  mobileNav?.classList.toggle('hidden');
});

document.querySelectorAll('.nav-link').forEach((link) => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('text-primary', 'font-semibold');
  }
  link.addEventListener('click', () => {
    mobileNav?.classList.add('hidden');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => {
      item.classList.remove('bg-primary', 'text-white', 'border-primary');
      item.classList.add('bg-white', 'text-slate-700', 'border-slate-200', 'dark:bg-slate-900', 'dark:text-slate-300');
    });
    button.classList.add('bg-primary', 'text-white', 'border-primary');
    button.classList.remove('bg-white', 'text-slate-700', 'border-slate-200', 'dark:bg-slate-900', 'dark:text-slate-300');

    const filter = button.dataset.filter;
    document.querySelectorAll('.project-card').forEach((card) => {
      if (!card.dataset.category || filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    if (name && email && subject && message) {
      showNotification('Message sent successfully! I will get back to you soon.', 'success');
      contactForm.reset();
    } else {
      showNotification('Please complete all fields before sending.', 'error');
    }
  });
}

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.style.backgroundColor = type === 'success' ? '#16a34a' : '#ef4444';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3200);
}
