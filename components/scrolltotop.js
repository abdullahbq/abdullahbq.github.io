class ScrollToTop extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <button id="scrollToTopBtn" class="btn btn-primary" style="position: fixed; bottom: 20px; right: 20px; display: none;">
          Scroll to Top
        </button>
      `;

    window.addEventListener("scroll", this.handleScroll.bind(this));

    const scrollToTopBtn = this.querySelector("#scrollToTopBtn");
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

customElements.define("scroll-to-top", ScrollToTop);
