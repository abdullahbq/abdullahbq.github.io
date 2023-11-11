class Jumbotron extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="jumbotron">
          <div class="container">            
            <h1 class="display-4">Welcome to Our Website!</h1>
            <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <hr class="my-4">
            <img src="images/inkredibledoc.png" alt="Jumbotron Image" class="img-fluid mb-3">
            <p>Learn more about our services and offerings.</p>
            <a class="btn btn-primary btn-lg" href="#" role="button">Learn More</a>
          </div>
        </div>
      `;
  }
}

customElements.define("jumbotron-component", Jumbotron);
