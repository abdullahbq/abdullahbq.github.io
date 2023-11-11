class About extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `        
      <div class="row align-items-center">
        <div class="col-md-6">
          <h2>Welcome to <strong>InkredibleDoc</strong></h2>
          <p>
            At Our Company, we are dedicated to providing innovative solutions and top-notch services to our clients. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            With a team of passionate and skilled professionals, we strive to exceed our clients' expectations and deliver results that make a positive impact. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Our commitment to excellence, integrity, and customer satisfaction sets us apart in the industry. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div class="col-md-6">
          <img src="images/sample.png" alt="About Us Image" class="img-fluid rounded shadow">
        </div>
      </div>       
    `;
  }
}

customElements.define("about-component", About);
