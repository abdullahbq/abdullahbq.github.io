class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <footer class="bg-success bg-opacity-10 border-top border-white">
        <div class="container py-5">
          <div class="row">
            <div class="col-md-6">
              <h2>About Us</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div class="col-md-3">
              <h2>Quick Links</h2>
              <ul>
                <li><a href="#" class="text-dark">Home</a></li>
                <li><a href="#" class="text-dark">Services</a></li>
                <li><a href="#" class="text-dark">Contact Us</a></li>
              </ul>
            </div>
            <div class="col-md-3">
              <h2>Follow Us</h2>
              <ul class="list-unstyled social-icons">
                <li class="d-inline-block mr-2"><a href="#" target="_blank"><i class="fab fa-facebook fa-2x me-2"></i></a></li>
                <li class="d-inline-block mr-2"><a href="#" target="_blank"><i class="fab fa-twitter fa-2x me-2"></i></a></li>
                <li class="d-inline-block mr-2"><a href="#" target="_blank"><i class="fab fa-instagram fa-2x me-2"></i></a></li>
                <li class="d-inline-block"><a href="#" target="_blank"><i class="fab fa-github fa-2x me-2"></i></a></li>
              </ul>
            </div>
          </div>
          <div class="text-center mt-5">
            <p class="text-dark">&copy; 2023 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("footer-component", Footer);
