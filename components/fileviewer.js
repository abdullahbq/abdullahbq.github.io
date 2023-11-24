class FileViewer extends HTMLElement {
    constructor() {
        super();
        this.data = {};
    }

    async connectedCallback() {
        try {
            const response = await fetch('sidebar.json');
            if (!response.ok) {
                throw new Error(`Failed to load folder data: ${response.status} - ${response.statusText}`);
            }
            this.data = await response.json();
            this.render();
        } catch (error) {
            console.error("Error fetching folder data:", error);
        }

        const hideSidebarBtn = document.querySelector('#hideSidebarBtn');
        hideSidebarBtn.addEventListener('click', () => this.toggleSidebar());

        // Add event listener for folder clicks
        const folderTree = this.querySelector('#folderTree');
        folderTree.addEventListener('click', (event) => this.handleFolderClick(event));
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
        const folderItem = document.createElement('li');
        folderItem.classList.add('folder-item');
        folderItem.innerHTML = `        
        <span class="folder-name fw-bold p-2 bg-primary bg-opacity-10 justify-content-start align-items-center d-flex border border-primary border-start-0 border-end-0 border-opacity-50" style="cursor: pointer;">
        <i class="fas fa-folder me-2"></i>${folderName}</span>
        <ul class="files-list"></ul>
      `;

        const filesList = folderItem.querySelector('.files-list');
        folder.forEach((fileName, fileIndex) => {
            const fileItem = document.createElement('li');
            fileItem.classList.add('file', 'bg-info', 'bg-opacity-10', 'py-1', 'px-2');
            fileItem.dataset.file = fileIndex;
            fileItem.dataset.folder = folderName;
            fileItem.style.cursor = 'pointer';
            fileItem.textContent = fileName.replace('.html', '');

            fileItem.addEventListener('click', () => this.handleFileClick(fileItem.dataset.file, fileItem.dataset.folder));

            filesList.appendChild(fileItem);
        });

        parentElement.appendChild(folderItem);
    }

    render() {
        const defaultContent = `
        <div>
          <title-component title="Welcome to our Courses"></title-component>
          <div class="container py-3">
            <h2>We offer tutorials for various courses.</h2>
            <p>Click a topic from the sidebar to start reading the topic.</p>
          </div>
        </div>
      `;

        this.innerHTML = `
        <section class="courses-section">  
          <div class="container-fluid">      
            <div class="row">
              <div class="col-md-4 p-0" style="overflow-y: auto;">
                <ul id="folderTree" class="folder-tree list-unstyled"></ul>
              </div>
              <div class="col-md-8 p-0">
                <div class="content">
                  <div class="content-container">${defaultContent}</div>
                </div>
              </div>         
            </div>  
          </div>          
        </section>
      `;

        const folderTree = this.querySelector('#folderTree');
        Object.keys(this.data).forEach((folderName) => this.renderFolder(this.data[folderName], folderName, folderTree));

        const hideSidebarBtn = this.querySelector('#hideSidebarBtn');
        hideSidebarBtn.addEventListener('click', () => this.toggleSidebar());
    }

    toggleSidebar() {
        const sidebar = this.querySelector('.col-md-4');
        sidebar.classList.toggle('d-none'); // or use 'hidden' if you prefer

        const contentColumn = this.querySelector('.col-md-8');

        if (sidebar.classList.contains('d-none')) {
            // Sidebar is hidden, set full width
            contentColumn.classList.add('col-md-12');
        } else {
            // Sidebar is visible, set original width
            contentColumn.classList.remove('col-md-12');
        }
    }

    // Handle folder click to expand/collapse the files tree
    handleFolderClick(event) {
        const target = event.target;
        if (target.classList.contains('folder-name')) {
            const filesList = target.nextElementSibling; // Get the <ul> element
            filesList.classList.toggle('expanded');
        }
    }

    async handleFileClick(fileIndex, folderName) {
        const contentContainer = this.querySelector('.content-container');
        const folder = this.data[folderName];
        const fileName = folder[fileIndex];

        const filePath = `courses/${folderName}/${fileName}`;

        try {
            const response = await fetch(filePath);
            if (response.ok) {
                const htmlContent = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlContent, 'text/html');

                const title = doc.querySelector('title').innerText;
                const bodyContent = doc.querySelector('body').innerHTML;

                contentContainer.innerHTML = `<title-component title="${title}"></title-component><div class="container p-3">${bodyContent}</div>`;
            } else {
                console.error("Failed to load file content:", response.status, response.statusText);
                contentContainer.innerHTML = "Failed to load content";
            }
        } catch (error) {
            console.error("Error fetching the file:", error);
            contentContainer.innerHTML = "Failed to load content";
        }
    }
}

customElements.define("file-viewer", FileViewer);
