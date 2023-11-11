class Services extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col">
              <div class="card bg-danger bg-opacity-10 text-center shadow">
              <i class="fab fa-facebook fa-5x text-center pt-5"></i>
                <div class="card-body py-4">
                  <h4 class="card-title fw-bold">Service 1</h4>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card bg-danger bg-opacity-10 text-center shadow">
              <i class="fab fa-google fa-5x text-center pt-5"></i>
                <div class="card-body py-4">
                  <h4 class="card-title fw-bold">Service 2</h4>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card bg-danger bg-opacity-10 text-center shadow">
              <i class="fab fa-linkedin fa-5x text-center pt-5"></i>
                <div class="card-body py-4">
                  <h4 class="card-title fw-bold">Service 3</h4>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card bg-danger bg-opacity-10 text-center shadow">
              <i class="fab fa-instagram fa-5x text-center pt-5"></i>
                <div class="card-body py-4">
                  <h4 class="card-title fw-bold">Service 4</h4>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card bg-danger bg-opacity-10 text-center shadow">
              <i class="fab fa-youtube fa-5x text-center pt-5"></i>
                <div class="card-body py-4">
                  <h4 class="card-title fw-bold">Service 5</h4>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card bg-danger bg-opacity-10 text-center shadow">
              <i class="fab fa-bootstrap fa-5x text-center pt-5"></i>
                <div class="card-body py-4">
                  <h4 class="card-title fw-bold">Service 6</h4>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
            </div>
          </div>       
      `;
  }
}

customElements.define("services-component", Services);
