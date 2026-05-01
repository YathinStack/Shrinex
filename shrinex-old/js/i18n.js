document.addEventListener('DOMContentLoaded', async () => {
  const defaultLang = 'en';
  let currentLang = localStorage.getItem('lang') || defaultLang;

  const loadLanguage = async (lang) => {
    try {
      const response = await fetch(`lang/${lang}.json`);
      if (!response.ok) throw new Error('Failed to load language file');
      const translations = await response.json();

      document.body.style.opacity = '0';
      
      setTimeout(() => {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          // Support nested keys like "hero.title" if needed, but simple keys preferred.
          if (translations[key]) {
            el.textContent = translations[key];
          }
        });

        // Update active class on language switcher
        document.querySelectorAll('.lang-btn').forEach(btn => {
          if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });

        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
      }, 200);

    } catch (error) {
      console.error('Error loading language:', error);
      document.body.style.opacity = '1';
    }
  };

  window.switchLanguage = (lang) => {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem('lang', lang);
    loadLanguage(lang);
  };

  // Initial load
  await loadLanguage(currentLang);
});
