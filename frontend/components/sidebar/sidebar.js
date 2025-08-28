// Create a template for the sidebar
const template = document.createElement('template')
template.innerHTML = `
  <div class="sidebar-content">
    <div class="logo-container">
      <div class="logo-icon">
        <i class="fas fa-graduation-cap"></i>
      </div>
      <div>
        <div class="logo-text">EduSync LMS</div>
        <div class="welcome-text">Welcome, KC!</div>
      </div>
    </div>

    <nav class="nav-section">
      <div class="section-title">Main Navigation</div>

      <div class="nav-item active">
        <div class="nav-icon"><i class="fas fa-home"></i></div>
        <a href="/html/index.html"><span>Dashboard</span></a>
      </div>

      <div class="nav-item">
        <div class="nav-icon"><i class="fas fa-book"></i></div>
        <a href="/html/courses.html"><span>Courses</span></a>
      </div>

      <div class="nav-item">
        <div class="nav-icon"><i class="fas fa-calendar-check"></i></div>
        <a href="/html/attendance.html"><span>Attendance</span></a>
      </div>

      <div class="nav-item">
        <div class="nav-icon"><i class="fas fa-sticky-note"></i></div>
        <a href="/html/notes.html"><span>Notes</span></a>
      </div>
    </nav>

    <nav class="nav-section">
      <div class="section-title">Resources</div>

      <div class="nav-item">
        <div class="nav-icon"><i class="fas fa-chart-line"></i></div>
        <a href="/html/analytics.html"><span>Analytics</span></a>
      </div>

      <div class="nav-item">
        <div class="nav-icon"><i class="fas fa-tasks"></i></div>
        <a href="/html/assignments.html"><span>Assignments</span></a>
      </div>

      <div class="nav-item">
        <div class="nav-icon"><i class="fas fa-comments"></i></div>
        <a href="/html/announcements.html"><span>Announcements</span></a>
      </div>

      <div class="nav-item">
        <div class="nav-icon"><i class="fas fa-cog"></i></div>
        <a href="/html/settings.html"><span>Settings</span>
      </div>
    </nav>

  </div>
`

class AppSidebar extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    // --- Styles with adoptedStyleSheets if supported ---
    if ('adoptedStyleSheets' in shadow) {
      fetch('../components/sidebar/sidebar.css')
        .then((res) => res.text())
        .then((css) => {
          const sheet = new CSSStyleSheet()
          sheet.replaceSync(css)
          shadow.adoptedStyleSheets = [sheet]
        })
    } else {
      const link = document.createElement('link')
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('href', '../components/sidebar/sidebar.css')
      shadow.appendChild(link)
    }

    const mobileMenuToggle = shadow.getElementById('mobile-menu-toggle')
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', () => {
        document.querySelector('app-sidebar').classList.toggle('mobile-open')
      })
    }
  }
}

// Define custom element
customElements.define('app-sidebar', AppSidebar)
