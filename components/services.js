class Services extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="container">
          <h2>Our Services</h2>
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col">
              <div class="card h-100">
                <img src="images/inkredibledoc.png" class="card-img-top" alt="Service 1">
                <div class="card-body">
                  <h5 class="card-title">Service 1</h5>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100">
                <img src="images/inkredibledoc.png" class="card-img-top" alt="Service 2">
                <div class="card-body">
                  <h5 class="card-title">Service 2</h5>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100">
                <img src="images/inkredibledoc.png" class="card-img-top" alt="Service 3">
                <div class="card-body">
                  <h5 class="card-title">Service 3</h5>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
            </div>
            <!-- Add more cards as needed -->
          </div>
        </div>
      `;
  }
}

customElements.define("services-component", Services);
