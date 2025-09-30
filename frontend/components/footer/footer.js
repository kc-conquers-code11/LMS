// Create a template for the footer
const template = document.createElement('template');
template.innerHTML = `
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-left">
        <div class="logo">EduSync LMS</div>
        <div class="copyright">© <span id="year"></span> EduSync LMS &nbsp; | &nbsp; All Rights Reserved</div>
      </div>

      <nav class="footer-links">
        <a href="#" class="footer-link">Privacy Policy</a>
        <a href="#" class="footer-link">Terms of Service</a>
        <a href="#" class="footer-link">Help Center</a>
        <a href="#" class="footer-link">Contact Us</a>
      </nav>
    </div>
  </footer>
`;

class AppFooter extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));

    // Dynamic year update
    shadow.getElementById('year').textContent = new Date().getFullYear();

    // --- Styles with adoptedStyleSheets if supported ---
    if ('adoptedStyleSheets' in shadow) {
      fetch('/frontend/components/footer/footer.css')
        .then((res) => res.text())
        .then((css) => {
          const sheet = new CSSStyleSheet();
          sheet.replaceSync(css);
          shadow.adoptedStyleSheets = [sheet];
        });
    } else {
      const link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', '/frontend/components/footer/footer.css');
      shadow.appendChild(link);
    }
  }
}

customElements.define('app-footer', AppFooter);
