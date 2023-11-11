class Title extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Get the title attribute value or default to "Default Title"
    const title = this.getAttribute("title") || "Default Title";

    this.innerHTML = `
        <div class="text-center bg-success bg-opacity-10 p-3 shadow">
          <h1>${title}</h1>
        </div>
      `;
  }
}

customElements.define("title-component", Title);
