class Intro extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
            <section class="intro-section bg-warning bg-opacity-10 vh-100">
                <div class="container py-5">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-lg-8 col-xl-7 col-xxl-6">
                            <div class="my-5 text-center text-xl-start">
                                <h1 class="display-5 fw-bolder mb-2">Welcome to InkredibleDoc!</h1>
                                <p class="lead fw-normal mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit!</p>
                                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                    <a class="btn btn-primary btn-lg px-4 me-sm-3 shadow" href="#features">Get Started</a>
                                    <a class="btn btn-outline-dark btn-lg px-4 shadow" href="#!">Learn More</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img class="img-fluid rounded-3 my-5 shadow" src="assets/images/4.png" alt="InkredibleDoc" /></div>
                    </div>
                </div>
            </section>
        `;
  }
}

customElements.define("intro-component", Intro);
