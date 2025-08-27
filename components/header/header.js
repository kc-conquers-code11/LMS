// Create a template for the header
const template = document.createElement('template')
template.innerHTML = `
  <div class="header-content">
    <div class="mobile-menu-btn" id="mobile-menu-toggle">
      <i class="fas fa-bars"></i>
    </div>

    <div class="search-container">
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search courses, materials, students..."
          aria-label="Search"
        />
      </div>
    </div>

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
          <div class="user-name">Kyle Cooper</div>
          <div class="user-role">Student</div>
        </div>
      </div>
    </div>
  </div>
`

class AppHeader extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    // --- Styles with adoptedStyleSheets if supported ---
    if ('adoptedStyleSheets' in shadow) {
      fetch('../components/header/header.css')
        .then(res => res.text())
        .then(css => {
          const sheet = new CSSStyleSheet()
          sheet.replaceSync(css)
          shadow.adoptedStyleSheets = [sheet]
        })
    } else {
      const link = document.createElement('link')
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('href', '../components/header/header.css')
      shadow.appendChild(link)
    }

    // Theme toggle
    const themeToggle = shadow.getElementById('theme-toggle')
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme')
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', newTheme)
      localStorage.setItem('theme', newTheme)

      const icon = themeToggle.querySelector('i')
      icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'
    })

    // Mobile menu toggle
    const mobileMenuToggle = shadow.getElementById('mobile-menu-toggle')
    mobileMenuToggle.addEventListener('click', () => {
      document.querySelector('app-sidebar').classList.toggle('mobile-open')
    })
  }
}

// Define the custom element
customElements.define('app-header', AppHeader)
