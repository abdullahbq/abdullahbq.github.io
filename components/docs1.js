class DocsComponent extends HTMLElement {
    connectedCallback() {
      this.initializeAttributes();
      this.renderSkeleton();
      this.populateDocs();
    }
  
    initializeAttributes() {
      this.contentFolderPath = this.getAttribute("content");
      this.sidebarDataURL = this.getAttribute("sidebar");
      this.contentName = this.contentFolderPath.split("/").pop();
    }
  
    renderSkeleton() {
      const container = document.createElement("div");
      container.classList.add("container-fluid");
  
      container.innerHTML = `
        <div class="row">
          ${this.createSidebar()}
          ${this.createMainContent()}
        </div>
      `;
  
      this.appendChild(container);
    }
  
    createSidebar() {
      const sidebar = document.createElement("aside");
      sidebar.classList.add("col-lg-3", "col-md-5", "noscrollbar", "bg-primary", "bg-opacity-10", "p-1", "pb-3", "d-flex", "flex-column");
      sidebar.id = "sidebar";
  
      sidebar.innerHTML = `
        <h4 class="text-center" style="font-weight: 900">${this.contentName}</h4>
        <div id="accordionContainer"></div>
      `;
  
      return sidebar.outerHTML;
    }
  
    createMainContent() {
      const mainContent = document.createElement("main");
      mainContent.classList.add("col-lg-9", "col-md-7", "m-0", "p-0");
      mainContent.id = "content";
  
      mainContent.innerHTML = `
        <title-component title="${this.contentName}"></title-component>
        <div class="container py-3" id="contentContainer"></div>
      `;
  
      return mainContent.outerHTML;
    }
  
    async populateDocs() {
      try {
        const response = await fetch(this.sidebarDataURL);
  
        if (!response.ok) {
          throw new Error("Failed to load file list.");
        }
  
        const data = await response.json();
        this.updateSidebar(data);
      } catch (error) {
        console.error("Error:", error);
        this.renderError("Error loading file list.");
      }
    }
  
    updateSidebar(data) {
      const accordionContainer = this.querySelector("#accordionContainer");
      const fragment = document.createDocumentFragment();
  
      for (const [folderName, fileList] of Object.entries(data)) {
        if (Array.isArray(fileList)) {
          fragment.appendChild(this.generateAccordion(folderName, fileList));
        } else {
          console.error(`Error: Invalid data format for key ${folderName}.`);
          this.renderError("Error loading file list.");
          break;
        }
      }
  
      accordionContainer.innerHTML = "";
      accordionContainer.appendChild(fragment);
  
      this.addEventListeners();
    }
  
    addEventListeners() {
      const accordionContainer = this.querySelector("#accordionContainer");
  
      accordionContainer.addEventListener("click", (event) => {
        const accordionItem = event.target.closest(".accordion-item-header");
        if (accordionItem) {
          this.handleAccordionItemClick(accordionItem);
        }
  
        const fileItem = event.target.closest(".file-item");
        if (fileItem) {
          const folder = fileItem.dataset.folder;
          const file = fileItem.dataset.file;
          this.loadContent(folder, file);
        }
      });
    }
  
    generateAccordion(folderName, fileList) {
      const accordionItem = document.createElement("div");
      accordionItem.classList.add("accordion-item");
  
      const targetId = `collapse${folderName.replace(/\s+/g, "_")}`;
      const contentPath = `${this.contentFolderPath}/${folderName}`;
  
      accordionItem.innerHTML = `
        <div class="accordion-item-header p-3 d-flex align-items-center" style="cursor: pointer; font-size: 1.2rem"
            data-folder="${folderName}" data-file="${fileList[0]}">
          <span class="fw-bold">${folderName}</span>
        </div>
        <div class="accordion-item-content p-3 bg-primary bg-opacity-10" id="${targetId}" style="display: none;" data-content="${contentPath}">
          ${this.createFileList(fileList, folderName).outerHTML}
        </div>
      `;
  
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
        const contentPath = `${this.contentFolderPath}/${folderName}/${fullFileName}`;
        const response = await fetch(contentPath);
  
        if (!response.ok) {
          throw new Error("Error loading content.");
        }
  
        const data = await response.text();
        this.updateContent(data);
      } catch (error) {
        this.updateContent(`<div class="container p-3">${error.message}</div>`);
      }
    }
  
    updateContent(html) {
      const contentContainer = this.querySelector("#contentContainer");
      if (contentContainer) {
        contentContainer.innerHTML = html;
      } else {
        console.error("Error: #contentContainer not found");
      }
    }
  
    handleAccordionItemClick(accordionItem) {
      const content = accordionItem.nextElementSibling;
  
      if (content.style.display === 'none') {
        content.style.display = 'block';
        accordionItem.classList.add('active');
      } else {
        content.style.display = 'none';
        accordionItem.classList.remove('active');
      }
    }
  
    renderError(message) {
      const accordionContainer = this.querySelector("#accordionContainer");
      accordionContainer.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
    }
  }
  
  customElements.define("docs-component", DocsComponent);
  