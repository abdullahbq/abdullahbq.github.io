class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.applyTheme();
    this.updateActiveLink();
    this.setupScrollToTop();
  }

  render() {
    this.innerHTML = `
      <header style="margin-bottom: 58px;">
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark py-2 shadow">
          <div class="container-fluid">
            <div class="d-flex">
            <button id="toggle-btn" class="btn btn-outline-primary me-2 text-light">
                <i class="fas fa-list"></i>
              </button>
              <button class="btn btn-outline-primary me-2 text-light" id="toggleThemeBtn">
                <i class="fas fa-sun"></i>
              </button>
            </div>
            <a class="navbar-brand d-flex mx-5" href="index.html">
              <img src="images/inkredibledoc.png" alt="Your Logo" width="32" height="32" class="me-2"/>
                <span class="fw-bold">InkredibleDoc</span>
            </a>
            <button class="navbar-toggler btn btn-outline-primary border-primary text-light" style="padding: 9px 10px 9px 10px;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <i class="fas fa-hamburger"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item mx-auto">
                  <a class="nav-link px-2" id="courses-link" href="courses.html">Courses</a>
                </li>
                <li class="nav-item mx-auto">
                  <a class="nav-link px-2" id="blog-link" href="blog.html">Blog</a>
                </li>
                <li class="nav-item mx-auto">
                  <a class="nav-link px-2" id="about-link" href="about.html">About</a>
                </li>
                <li class="nav-item mx-auto">
                  <a class="nav-link px-2" id="services-link" href="services.html">Services</a>
                </li>
                <li class="nav-item mx-auto">
                  <a class="nav-link px-2" id="contact-link" href="contact.html">Contact</a>
                </li>
              </ul>
              <form class="d-flex" role="search">
                <input class="form-control me-2 border-primary" type="search" placeholder="Search" aria-label="Search">
                  <button class="btn btn-outline-primary text-light" type="submit">
                    <i class="fas fa-search"></i>
                  </button>
              </form>
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
        .classList.add(
          "active",
          "border",
          "border-primary",
          "rounded-2",
          "bg-primary"
        );
    }
  }

  setupScrollToTop() {
    // Create the scroll-to-top button dynamically
    const scrollToTopBtn = document.createElement("button");
    scrollToTopBtn.id = "scrollToTopBtn";
    scrollToTopBtn.className = "btn btn-primary";
    scrollToTopBtn.style =
      "position: fixed; bottom: 20px; right: 20px; display: none;";
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
