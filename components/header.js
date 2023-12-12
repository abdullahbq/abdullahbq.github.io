class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const showToggleButton = this.hasAttribute("showToggleButton");
    const showSearchButton = this.hasAttribute("showSearchButton");

    this.render(showToggleButton, showSearchButton);
    this.setupEventListeners();
    this.applyTheme();
    this.updateActiveLink();
    this.setupScrollToTop();
  }

  render(showToggleButton, showSearchButton) {
    this.innerHTML = `
      <header id="myHeader">
        <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top py-2 shadow">
          <div class="container-fluid">
            <div class="d-flex">
            ${
              showToggleButton
                ? `
                  <button id="toggle-btn" class="btn btn-outline-primary me-2 text-light shadow">
                    <i class="fas fa-list"></i>
                  </button>
                `
                : ""
            }
              <button class="btn btn-outline-primary text-light shadow" id="toggleThemeBtn">
                <i class="fas fa-sun"></i>
              </button>
            </div>
            <a class="navbar-brand d-flex mx-2 px-2" id="home-link" href="index.html">
              <img src="assets/images/inkredibledoc.png" alt="Your Logo" width="32" height="32" class="me-2"/>
                <span class="fw-bold">InkredibleDoc</span>
            </a>
            <button class="navbar-toggler btn btn-outline-primary border-primary text-light shadow" style="padding: 9px 10px 9px 10px;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <i class="fas fa-hamburger"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav me-auto mb-2 mb-md-0">              
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle px-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Courses
                </a>
                <ul class="dropdown-menu p-2">
                  <li><a class="dropdown-item rounded-2 my-1" id="digital_electronics-link" href="digital_electronics.html">Digital Electronics</a></li>
                  <li><a class="dropdown-item rounded-2 my-1" id="embedded_systems-link" href="embedded_systems.html">Embedded Systems</a></li>
                  <li><a class="dropdown-item rounded-2 my-1" id="web_development-link" href="web_development.html">Web Development</a></li>
                  <li><a class="dropdown-item rounded-2 my-1" id="internet_of_things-link" href="internet_of_things.html">Internet of Things</a></li>
                </ul>
              </li>
                <li class="nav-item">
                  <a class="nav-link px-2" id="blog-link" href="blog.html">Blog</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-2" id="publications-link" href="publications.html">Publications</a>
                </li>                
              <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle px-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                More
              </a>
              <ul class="dropdown-menu p-2">
                <li><a class="dropdown-item rounded-2 my-1" id="about-link" href="about.html">About</a></li>
                <li><a class="dropdown-item rounded-2 my-1" id="services-link" href="services.html">Services</a></li>
                <li><a class="dropdown-item rounded-2 my-1" id="contact-link" href="contact.html">Contact</a></li>
                <li><a class="dropdown-item rounded-2 my-1" id="gallery-link" href="gallery.html">Gallery</a></li>
                <li><a class="dropdown-item rounded-2 my-1" id="slides-link" href="slides.html">Slides</a></li>
                <li><a class="dropdown-item rounded-2 my-1" id="admin-link" href="http://localhost:8000/" target="_blank">Admin</a></li>
              </ul>
            </li>
              </ul>
              ${
                showSearchButton
                  ? `<form class="d-flex" role="search">
                <input id="searchInput" class="form-control me-2 border-primary shadow" type="search" placeholder="Search Blog Articles" aria-label="Search">
                  <button class="btn btn-outline-primary text-light shadow" type="submit">
                    <i class="fas fa-search"></i>
                  </button>
              </form>`
                  : ""
              }
            </div>
          </div>
        </nav>
        <scroll-to-top></scroll-to-top>
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
      "/index.html": "home-link",
      "/digital_electronics.html": "digital_electronics-link",
      "/embedded_systems.html": "embedded_systems-link",
      "/web_development.html": "web_development-link",
      "/internet_of_things.html": "internet_of_things-link",
      "/blog.html": "blog-link",
      "/about.html": "about-link",
      "/services.html": "services-link",
      "/contact.html": "contact-link",
      "/gallery.html": "gallery-link",
      "/slides.html": "slides-link",
      "/publications.html": "publications-link",
      "/admin.html": "admin-link",
    };

    const currentLink = links[path];
    if (currentLink) {
      document
        .getElementById(currentLink)
        .classList.add(
          "active",
          "border",
          "border-primary",
          "rounded-2",
          "bg-primary",
          "shadow"
        );
    }
  }

  setupScrollToTop() {
    // Create the scroll-to-top button dynamically
    const scrollToTopBtn = document.createElement("button");
    scrollToTopBtn.id = "scrollToTopBtn";
    scrollToTopBtn.className = "btn btn-primary shadow";
    scrollToTopBtn.style =
      "position: fixed; bottom: 20px; right: 20px; display: none; z-index: 5;";
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';

    // Append the button to the header
    this.appendChild(scrollToTopBtn);

    // Add scroll event listener to show/hide the button
    window.addEventListener("scroll", this.handleScroll.bind(this));

    // Add click event listener to scroll to top when the button is clicked
    scrollToTopBtn.addEventListener("click", this.scrollToTop.bind(this));
  }

  handleScroll() {
    const scrollToTopBtn = this.querySelector("#scrollToTopBtn");
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  }

  scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  }
}

customElements.define("header-component", Header);
