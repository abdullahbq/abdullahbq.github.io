class DocsComponent extends HTMLElement {
  connectedCallback() {
    this.contentFolderPath = this.getAttribute("content");
    this.sidebarDataURL = this.getAttribute("sidebar");
    this.contentName = this.contentFolderPath.split("/").pop();
    this.renderSkeleton();
    this.populateDocs();
  }

  renderSkeleton() {
    const container = document.createElement("div");
    container.classList.add("container-fluid");

    container.innerHTML = `
      <div class="row">
        <aside class="col-lg-3 col-md-5 noscrollbar bg-primary bg-opacity-10 p-1 pb-3" id="sidebar">
          <h4 class="text-center" style="font-weight: 900">${this.contentName}</h4>
          <div class="accordion" id="documentAccordion"></div>
        </aside>

        <main class="col-lg-9 col-md-7 m-0 p-0" id="content">
          <title-component title="${this.contentName}"></title-component>
          <div class="container p-3">Click a topic from the sidebar to start reading the topic.</div>
        </main>
      </div>
    `;

    this.appendChild(container);
  }

  async populateDocs() {
    try {
      const response = await fetch(this.sidebarDataURL);

      if (!response.ok) {
        throw new Error("Error loading file list.");
      }

      const data = await response.json();
      this.updateSidebar(data);
    } catch (error) {
      console.error("Error:", error);
      this.renderError("Error loading file list.");
    }
  }

  updateSidebar(data) {
    const accordion = this.querySelector("#documentAccordion");
    const fragment = document.createDocumentFragment();

    for (const [folderName, fileList] of Object.entries(data)) {
      if (Array.isArray(fileList)) {
        fragment.appendChild(this.createAccordionItem(folderName, fileList));
      } else {
        console.error(`Error: Invalid data format for key ${folderName}.`);
        this.renderError("Error loading file list.");
        break;
      }
    }

    accordion.innerHTML = "";
    accordion.appendChild(fragment);

    this.addEventListeners();
  }

  addEventListeners() {
    const accordion = this.querySelector("#documentAccordion");

    accordion.addEventListener("click", (event) => {
      const fileItem = event.target.closest(".file-item");
      if (fileItem) {
        const { folder, file } = fileItem.dataset;
        this.loadContent(folder, file);
      }
    });

    accordion.addEventListener("mouseover", (event) => {
      const fileItem = event.target.closest(".file-item");
      if (fileItem) {
        fileItem.style.fontWeight = "bold";
      }
    });

    accordion.addEventListener("mouseout", (event) => {
      const fileItem = event.target.closest(".file-item");
      if (fileItem) {
        fileItem.style.fontWeight = "normal";
      }
    });
  }

  createAccordionItem(folderName, fileList) {
    const accordionItem = document.createElement("div");
    accordionItem.classList.add("accordion-item");

    const targetId = `collapse${folderName.replace(/\s+/g, "_")}`;
    
    accordionItem.innerHTML = `
      <h2 class="accordion-header" id="heading${folderName}">
        <button class="accordion-button p-2 fw-bold"
                type="button" data-bs-toggle="collapse" data-bs-target="#${targetId}"
                aria-expanded="true" aria-controls="${targetId}">
          <i class="fas fa-folder-open me-2"></i>
          <span>${folderName}</span>
        </button>
      </h2>
      <div class="accordion-collapse collapse show" id="${targetId}" 
           aria-labelledby="heading${folderName}">
        <div class="accordion-body py-2 px-0 rounded-1">
          ${this.createFileList(fileList, folderName).outerHTML}
        </div>
      </div>`;

    // Toggle icon and update aria-expanded attribute on accordion button click
    accordionItem.querySelector(".accordion-button").addEventListener("click", () => {
      const icon = accordionItem.querySelector("i");
      const isExpanded = accordionItem.getAttribute("aria-expanded") === "true";
      accordionItem.setAttribute("aria-expanded", isExpanded ? "false" : "true");
      icon.classList.toggle("fa-folder-open");
      icon.classList.toggle("fa-folder");
    });

    return accordionItem;
  }

  createFileList(fileList, folderName) {
    const fileListElement = document.createElement("ul");
    fileListElement.classList.add("my-0", "px-3");
    fileListElement.style.listStyleType = "none";

    for (const fileName of fileList) {
      const listItem = document.createElement("li");
      listItem.textContent = fileName;
      listItem.classList.add("file-item");
      listItem.dataset.folder = folderName;
      listItem.dataset.file = fileName;
      listItem.style.cursor = "pointer";
      fileListElement.appendChild(listItem);
    }

    return fileListElement;
  }

  async loadContent(folderName, fileName) {
    try {
      const fullFileName = fileName + ".html";
      const response = await fetch(`${this.contentFolderPath}/${folderName}/${fullFileName}`);

      if (!response.ok) {
        throw new Error("Error loading content.");
      }

      const data = await response.text();
      this.updateContent(`<title-component title="${fileName}"></title-component><div class="container p-3">${data}</div>`);
    } catch (error) {
      this.updateContent(`<div class="container p-3">${error.message}</div>`);
    }
  }

  updateContent(html) {
    this.querySelector("#content").innerHTML = html;
  }

  renderError(message) {
    const sidebar = this.querySelector("#documentAccordion");
    sidebar.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
  }
}

customElements.define("docs-component", DocsComponent);
