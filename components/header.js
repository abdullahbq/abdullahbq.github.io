class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.applyTheme();
    this.updateActiveLink();
  }

  render() {
    this.innerHTML = `
      <header style="margin-bottom: 58px;">
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark py-2 shadow">
          <div class="container-fluid">
            <div class="d-flex">
            <button id="toggle-btn" class="btn btn-outline-primary me-2">
                <i class="fas fa-list"></i>
              </button>
              <button class="btn btn-outline-warning me-2 text-light" id="toggleThemeBtn">
                <i class="fas fa-sun"></i>
              </button>
            </div>
            <a class="navbar-brand d-flex mx-5" href="index.html">
              <img src="images/inkredibledoc.png" alt="Your Logo" width="32" height="32" class="me-2"/>
                <span class="fw-bold">InkredibleDoc</span>
            </a>
            <button class="navbar-toggler btn btn-outline-warning border-warning text-light" style="padding: 9px 10px 9px 10px;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <i class="fas fa-hamburger"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                  <a class="nav-link" id="courses-link" href="courses.html">Courses</a>
                </li>
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
                  <button class="btn btn-outline-warning text-light" type="submit">
                    <i class="fas fa-search"></i>
                  </button>
              </form>
            </div>
          </div>
        </nav>
      </header>
    `;
  }

  setupEventListeners() {
    const toggleThemeBtn = this.querySelector("#toggleThemeBtn");
    if (toggleThemeBtn) {
      toggleThemeBtn.addEventListener("click", this.toggleTheme.bind(this));
    }
  }

  toggleTheme() {
    const currentTheme = localStorage.getItem("theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    this.applyTheme();
  }

  applyTheme() {
    const currentTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark-theme", currentTheme === "dark");
  }

  updateActiveLink() {
    const path = window.location.pathname;
    const links = {
      "/": "home-link",
      "/courses.html": "courses-link",
      "/blog.html": "blog-link",
      "/about.html": "about-link",
      "/services.html": "services-link",
      "/contact.html": "contact-link",
    };

    const currentLink = links[path];
    if (currentLink) {
      document
        .getElementById(currentLink)
        .classList.add("active", "border", "border-warning", "rounded-2");
    }
  }
}

customElements.define("header-component", Header);
