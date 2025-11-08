document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeLink = document.getElementById('theme-link');

  if (!themeLink) {
    console.warn('theme-link not found. Make sure <link id="theme-link" ...> exists in <head>.');
    return;
  }

  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  applyTheme(mq.matches ? 'dark' : 'light', true);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = themeLink.getAttribute('href').includes('theme-dark.css') ? 'dark' : 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme, true);
    });
  }

  const mqListener = (e) => {
    applyTheme(e.matches ? 'dark' : 'light', true);
  };

  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', mqListener);
  } else if (typeof mq.addListener === 'function') {
    mq.addListener(mqListener);
  }

  function applyTheme(theme, save = false) {
    if (theme === 'dark') {
      themeLink.setAttribute('href', './styles/theme-dark.css');
      if (themeIcon) themeIcon.textContent = '☀️';
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      themeLink.setAttribute('href', './styles/theme-light.css');
      if (themeIcon) themeIcon.textContent = '🌙';
      document.documentElement.setAttribute('data-theme', 'light');
    }

    if (save) {
      try {
        localStorage.setItem('theme', theme);
      } catch (err) {
        console.warn('Could not save theme to localStorage:', err);
      }
    }
  }
});
