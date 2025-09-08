const template = document.createElement('template');
template.innerHTML = `
  <div class="sidebar-content">
    <!-- Top bar for mobile (logo, menu toggle) -->
    
    <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    
    <div class="sidebar-top-actions">
      <div class="mobile-logo-container">
        <div class="logo-icon"><i class="fas fa-graduation-cap"></i></div>
        <div class="logo-text">EduSync LMS</div>
      </div>
    </div>

    <!-- Desktop Logo (hidden on mobile) -->
    <div class="desktop-logo-container">
      <div class="logo-icon"><i class="fas fa-graduation-cap"></i></div>
      <div class="logo-text">EduSync LMS</div>
    </div>

    <!-- Navigation -->
    <nav class="nav-section">
      <div class="section-title">Main Navigation</div>
      <div class="nav-item active"><div class="nav-icon"><i class="fas fa-home"></i></div><a href="/frontend/index.html">Dashboard</a></div>
      <div class="nav-item"><div class="nav-icon"><i class="fas fa-book"></i></div><a href="/frontend/html/courses.html">Courses</a></div>
      <div class="nav-item"><div class="nav-icon"><i class="fas fa-calendar-check"></i></div><a href="/frontend/html/attendance.html">Attendance</a></div>
      <div class="nav-item"><div class="nav-icon"><i class="fas fa-sticky-note"></i></div><a href="/frontend/html/notes.html">Notes</a></div>
    </nav>

    <nav class="nav-section">
      <div class="section-title">Resources</div>
      <div class="nav-item"><div class="nav-icon"><i class="fas fa-chart-line"></i></div><a href="/frontend/html/analytics.html">Analytics</a></div>
      <div class="nav-item"><div class="nav-icon"><i class="fas fa-tasks"></i></div><a href="/frontend/html/assignments.html">Assignments</a></div>
      <div class="nav-item"><div class="nav-icon"><i class="fas fa-comments"></i></div><a href="/frontend/html/announcements.html">Announcements</a></div>
      <div class="nav-item"><div class="nav-icon"><i class="fas fa-cog"></i></div><a href="/frontend/html/settings.html">Settings</a></div>
    </nav>
  </div>
`;

class AppSidebar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));

    // Font Awesome
    const faLink = document.createElement('link');
    faLink.setAttribute('rel', 'stylesheet');
    faLink.setAttribute(
      'href',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    );
    shadow.appendChild(faLink);

    // Load CSS
    if ('adoptedStyleSheets' in shadow) {
      fetch('/frontend/components/sidebar/sidebar.css')
        .then((res) => res.text())
        .then((css) => {
          const sheet = new CSSStyleSheet();
          sheet.replaceSync(css);
          shadow.adoptedStyleSheets = [sheet];
        });
    } else {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/frontend/components/sidebar/sidebar.css';
      shadow.appendChild(link);
    }

    // Mobile menu toggle
    const mobileMenuToggle = shadow.getElementById('mobile-menu-toggle');
    mobileMenuToggle.addEventListener('click', () => {
      this.classList.toggle('mobile-open');
      mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu on nav item click
    shadow.querySelectorAll('.nav-item a').forEach((link) => {
      link.addEventListener('click', () => {
        this.classList.remove('mobile-open');
        mobileMenuToggle.classList.remove('active');
      });
    });

    // Highlight active link
    const currentPath = window.location.pathname;
    shadow.querySelectorAll('.nav-item').forEach((item) => {
      const anchor = item.querySelector('a');
      if (anchor && currentPath.includes(anchor.getAttribute('href'))) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
}

customElements.define('app-sidebar', AppSidebar);
