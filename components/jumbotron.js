class Jumbotron extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <section class="biodata-section bg-primary bg-opacity-10">
      <div class="container py-5">
        <div class="jumbotron">
          <div class="row align-items-center justify-content-center">
            <div class="col-md-8 text-center">
              <h1 class="fw-bold display-4">Welcome to InkredibleDoc!</h1>
              <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <hr class="my-4">
              <p>Learn more about our services and offerings.</p>
              <a class="btn btn-primary btn-lg" href="index.html" role="button">Learn More</a>
            </div>
            <div class="col-md-4 text-center">
              <img src="images/inkredibledoc.png" alt="Jumbotron Image" class="img-fluid rounded-circle shadow" style="width: 240px; height: 240px;">
            </div>
          </div>
        </div>
      </div>
      </section>`;
  }
}

customElements.define("jumbotron-component", Jumbotron);
