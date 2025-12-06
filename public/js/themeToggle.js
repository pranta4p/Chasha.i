document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.createElement('button');
    themeToggleBtn.className = 'theme-toggle-btn theme-toggle-fixed';
    themeToggleBtn.innerHTML = `
        <svg class="icon-sun" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 24px; height: 24px; display: none;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg class="icon-moon" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 24px; height: 24px; display: none;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
    `;


    const currentTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);


    document.body.appendChild(themeToggleBtn);

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        const sun = themeToggleBtn.querySelector('.icon-sun');
        const moon = themeToggleBtn.querySelector('.icon-moon');
        if (theme === 'dark') {
            sun.style.display = 'block';
            moon.style.display = 'none';
        } else {
            sun.style.display = 'none';
            moon.style.display = 'block';
        }
    }
});
