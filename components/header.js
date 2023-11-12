class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `        
      <header style="margin-bottom: 57px;">
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark shadow">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">
              <img src="images/inkredibledoc.png" alt="Your Logo" width="30" height="30" class="d-inline-block align-text-top">
              <strong>InkredibleDoc</strong>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                  <a class="nav-link" id="blog-link" href="blog.html">Blog</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="about-link" href="about.html">About</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="services-link" href="services.html">Services</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="contact-link" href="contact.html">Contact</a>
                </li>
              </ul>
              <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </header>
    `;

    // Get the current path
    const path = window.location.pathname;

    // Update the active class based on the current path
    const links = {
      "/": "home-link",
      "/blog.html": "blog-link",
      "/about.html": "about-link",
      "/services.html": "services-link",
      "/contact.html": "contact-link",
    };

    const currentLink = links[path];
    if (currentLink) {
      document.getElementById(currentLink).classList.add("active");
    }
  }
}

customElements.define("header-component", Header);
