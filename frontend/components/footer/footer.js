// Create a template for the footer
const template = document.createElement('template')
template.innerHTML = `
  <div class="footer-content">
    <div class="copyright">© 2023 EduSync LMS. All rights reserved.</div>

    <div class="footer-links">
      <a href="#" class="footer-link">Privacy Policy</a>
      <a href="#" class="footer-link">Terms of Service</a>
      <a href="#" class="footer-link">Help Center</a>
      <a href="#" class="footer-link">Contact Us</a>
    </div>
  </div>
`

class AppFooter extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    // --- Styles with adoptedStyleSheets if supported ---
    if ('adoptedStyleSheets' in shadow) {
      fetch('/frontend/components/footer/footer.css')
        .then((res) => res.text())
        .then((css) => {
          const sheet = new CSSStyleSheet()
          sheet.replaceSync(css)
          shadow.adoptedStyleSheets = [sheet]
        })
    } else {
      const link = document.createElement('link')
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('href', '/frontend/components/footer/footer.css')
      shadow.appendChild(link)
    }
  }
}

// Define custom element
customElements.define('app-footer', AppFooter)
