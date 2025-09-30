// header.js
const template = document.createElement('template');
template.innerHTML = `
  <div class="header-content">
    <!-- Mobile Menu Button -->
    <div class="mobile-menu-btn" id="mobile-menu-toggle" aria-label="Toggle navigation menu">
      <i class="fas fa-bars"></i>
    </div>

    <!-- Search Bar -->
    <div class="search-container">
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search courses, materials, students..." aria-label="Search" />
      </div>
    </div>

    <!-- Header Actions -->
    <div class="header-actions">
      <button class="action-btn" id="theme-toggle" aria-label="Toggle theme">
        <i class="fas fa-moon"></i>
      </button>

      <button class="action-btn" aria-label="Notifications">
        <i class="fas fa-bell"></i>
        <span class="notification-badge">3</span>
      </button>

      <div class="user-profile">
        <div class="user-avatar">KC</div>
        <div class="user-info">
          <div class="user-name">Krishna C</div>
          <div class="user-role">Student</div> 
        </div>
      </div>
    </div>
  </div>
`;

class AppHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Font Awesome
    const faLink = document.createElement('link');
    faLink.setAttribute('rel', 'stylesheet');
    faLink.setAttribute(
      'href',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    );
    shadow.appendChild(faLink);

    // External CSS
    const styleLink = document.createElement('link');
    styleLink.setAttribute('rel', 'stylesheet');
    styleLink.setAttribute('href', '/frontend/components/header/header.css');
    shadow.appendChild(styleLink);

    // Append template
    shadow.appendChild(template.content.cloneNode(true));

    // Initialize functionality
    this.initializeHeader(shadow);
  }

  initializeHeader(shadow) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeIcon = shadow.getElementById('theme-toggle').querySelector('i');
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    // Theme toggle
    const themeToggle = shadow.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      // Update icons in both header & sidebar
      themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      document.querySelector('app-sidebar')?.setAttribute('data-theme', newTheme);
      this.setAttribute('data-theme', newTheme);
    });

    // Mobile menu toggle
    const mobileMenuToggle = shadow.getElementById('mobile-menu-toggle');
    mobileMenuToggle.addEventListener('click', () => {
      const sidebar = document.querySelector('app-sidebar');
      sidebar.classList.toggle('mobile-open');
    });
  }
}

customElements.define('app-header', AppHeader);
