class Pricing extends HTMLElement {
  constructor() {
    super();
    this.state = {
      imgs: [
        {
          author: "The Lazy Artist Gallery",
          tag: "People",
          src: "m1",
        },
        {
          author: "Daria Shevtsova",
          tag: "Food",
          src: "m2",
        },
        {
          author: "Kasuma",
          tag: "Animals",
          src: "m3",
        },
        {
          author: "Dominika Roseclay",
          tag: "Plants",
          src: "m4",
        },
        {
          author: "Scott Webb",
          tag: "Plants",
          src: "m5",
        },
        {
          author: "Jeffrey Czum",
          tag: "People",
          src: "m2",
        },
        {
          author: "Dominika Roseclay",
          tag: "Food",
          src: "m4",
        },
        {
          author: "Valeria Boltneva",
          tag: "Animals",
          src: "m3",
        },
      ],
      filters: [
        { name: "People", status: false },
        { name: "Animals", status: false },
        { name: "Plants", status: false },
        { name: "Food", status: false },
      ],
      all: true,
    };
  }

  connectedCallback() {
    this.render();
  }

  setFilter(e) {
    e.preventDefault();
    const { filters } = this.state;
    const index = e.currentTarget.dataset.index;

    filters[index].status = !filters[index].status;
    this.setState({ filters });

    this.updateFilters();
    this.updateImgs();
  }

  setAll() {
    const { filters } = this.state;

    filters.forEach((filter) => {
      filter.status = false;
    });

    this.setState({ all: true, filters });
  }

  updateFilters() {
    const { filters } = this.state;
    const allFiltersTrue = filters.every((filter) => filter.status === true);
    const allFiltersFalse = filters.every((filter) => filter.status === false);

    if (allFiltersTrue || allFiltersFalse) {
      this.setAll();
    } else {
      this.setState({ all: false });
    }
  }

  updateImgs() {
    const { filters, imgs } = this.state;
    let newImgs = [];
    let a = 0;

    imgs.forEach((img) => {
      filters.forEach((filter) => {
        if (img.tag === filter.name && filter.status === true) {
          newImgs[a] = img;
          a++;
        }
      });
    });

    this.setState({ imgs: newImgs });
  }

  render() {
    this.innerHTML = `
          <section class="portfolio-section bg-primary bg-opacity-10">
            <title-component title="Portfolio"></title-component>  
            <div class="container py-5">
              <div class="text-center mb-4">
                <button
                  type="button"
                  class="${
                    this.state.all
                      ? "btn m-1 bg-primary rounded-pill text-light shadow"
                      : "btn btn-outline-secondary rounded-pill m-1 shadow"
                  }"
                  id="allButton"
                >
                  All Products
                </button>
                ${this.state.filters
                  .map(
                    (filter, i) => `<button
                    type="button"
                    class="${
                      filter.status
                        ? "btn m-1 bg-primary rounded-pill text-light shadow"
                        : "btn btn-outline-secondary rounded-pill m-1 shadow"
                    }"
                    data-index="${i}"
                    id="filterButton${i}"
                  >
                    ${filter.name}
                  </button>`
                  )
                  .join("")}
              </div>
              ${
                this.state.all
                  ? this.state.imgs
                      .map(
                        (img) => `<div class="col-lg-3 col-md-4 col-sm-12">
                        <div class="card shadow mb-4 border-primary p-2">
                          <div class="figure shadow">
                            <img
                              class="card-img"
                              src="${img.src}.jpg"
                              alt="${img.src}"
                            />
                            <div class="figcaption">
                              <h5 class="text-light fw-bold">${img.author} </h5>
                              <span class="text-primary">${img.tag}</span>
                            </div>
                          </div>
                        </div>
                      </div>`
                      )
                      .join("")
                  : ""
              }
            </div>
          </section>
        `;

    // Add event listeners after the HTML has been rendered
    document
      .getElementById("allButton")
      .addEventListener("click", () => this.setAll());

    this.state.filters.forEach((filter, i) => {
      document
        .getElementById(`filterButton${i}`)
        .addEventListener("click", (e) => this.setFilter(e));
    });
  }
}

customElements.define("pricing-component", Pricing);
