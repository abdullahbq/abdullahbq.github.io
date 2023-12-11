class Sidebar extends HTMLElement {
  constructor() {
    super();
    this.data = {};
    this.coursesFolderPath = this.getAttribute("course");
    this.sidebarDataURL = this.getAttribute("sidebar");
    // Extract the course name from the coursesFolderPath
    this.courseName = this.coursesFolderPath.split("/").pop();
  }

  async connectedCallback() {
    try {
      const response = await fetch(this.sidebarDataURL);
      if (!response.ok) {
        throw new Error(
          `Failed to load folder data: ${response.status} - ${response.statusText}`
        );
      }
      this.data = await response.json();
      this.render();
    } catch (error) {
      console.error("Error fetching folder data:", error);
    }

    const folderTree = this.querySelector("#folderTree");
    folderTree.addEventListener("click", (event) =>
      this.handleFolderClick(event)
    );
  }

  async loadFileContent(filePath) {
    try {
      const response = await fetch(filePath);
      return response.ok ? await response.text() : "Failed to load content";
    } catch (error) {
      console.error("Error fetching the file:", error);
      return "Failed to load content";
    }
  }

  async renderFolder(folder, folderName, parentElement) {
    const folderItem = document.createElement("li");
    folderItem.classList.add("folder-item");

    // Create a span element for the folder name with an icon
    const folderSpan = document.createElement("span");
    folderSpan.classList.add(
      "folder-name",
      "fw-bold",
      "p-2",
      "justify-content-start",
      "align-items-center",
      "d-flex"
    );
    folderSpan.style.cursor = "pointer";
    folderSpan.innerHTML = `
      <i class="folder-icon fas fa-folder me-2 fa-lg text-primary"></i>${folderName}
    `;

    // Create an icon element within the span for toggling
    const folderIcon = folderSpan.querySelector(".folder-icon");

    // Create a ul element for the files within the folder
    const filesList = document.createElement("ul");
    filesList.classList.add("files-list");

    folder.forEach((fileName, fileIndex) => {
      const fileItem = document.createElement("li");
      fileItem.classList.add(
        "file",
        "bg-primary",
        "bg-opacity-10",
        "p-1",
        "list-unstyled"
      );
      fileItem.dataset.file = fileIndex;
      fileItem.dataset.folder = folderName;
      fileItem.style.cursor = "pointer";
      fileItem.textContent = fileName;

      fileItem.addEventListener("click", () =>
        this.handleFileClick(fileItem.dataset.file, fileItem.dataset.folder)
      );

      filesList.appendChild(fileItem);
    });

    // Append the files list to the folder item
    folderItem.appendChild(folderSpan);
    folderItem.appendChild(filesList);

    // Add a click event listener to toggle the folder state
    folderSpan.addEventListener("click", () => {
      folderItem.classList.toggle("folder-expanded");
      folderIcon.classList.toggle("fa-folder-open");
    });

    parentElement.appendChild(folderItem);
  }

  render() {
    const defaultContent = `
        <div>
          <title-component title="${this.courseName}"></title-component>
          <div class="container py-3">          
            <p class="text-center py-3">Click a topic from the sidebar to start reading the topic.</p>
          </div>
        </div>
      `;

    this.innerHTML = `
          <section class="sidebar-section">
            <div id="sidebar" class="bg-dark text-light">
            <ul id="folderTree" class="folder-tree list-unstyled mb-0"></ul>
            </div>    
            <div id="main-content"> 
            <div class="content-container">${defaultContent}</div>
            </div>
        </section>
        `;

    this.initializeToggleSidebar();

    const folderTree = this.querySelector("#folderTree");
    Object.keys(this.data).forEach((folderName) =>
      this.renderFolder(this.data[folderName], folderName, folderTree)
    );
  }

  initializeToggleSidebar() {
    const toggleBtn = document.querySelector("#toggle-btn");
    const sidebar = this.querySelector("#sidebar");
    const mainContent = this.querySelector("#main-content");

    toggleBtn.addEventListener("click", () => {
      const isSidebarHidden = sidebar.classList.toggle("d-none");

      if (isSidebarHidden) {
        mainContent.style.marginLeft = "0";
      } else {
        mainContent.style.marginLeft = "0";
      }
    });
  }

  handleFolderClick(event) {
    const target = event.target;
    if (target.classList.contains("folder-name")) {
      const filesList = target.nextElementSibling;
      filesList.classList.toggle("expanded");
    }
  }

  async handleFileClick(fileIndex, folderName) {
    const contentContainer = this.querySelector(".content-container");
    const folder = this.data[folderName];
    const fileName = folder[fileIndex];

    // Append ".html" extension to the file name
    const fileNameWithExtension = `${fileName}.html`;

    // Use template literals to construct the file path dynamically
    const filePath = `${this.coursesFolderPath}/${folderName}/${fileNameWithExtension}`;

    try {
      const response = await fetch(filePath);
      if (response.ok) {
        const htmlContent = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");

        const title = doc.querySelector("title").innerText;
        const bodyContent = doc.querySelector("body").innerHTML;

        contentContainer.innerHTML = `<title-component title="${title}"></title-component><div class="container p-3">${bodyContent}</div>`;
      } else {
        console.error(
          "Failed to load file content:",
          response.status,
          response.statusText
        );
        contentContainer.innerHTML = "Failed to load content";
      }
    } catch (error) {
      console.error("Error fetching the file:", error);
      contentContainer.innerHTML = "Failed to load content";
    }
  }
}

customElements.define("sidebar-component", Sidebar);
