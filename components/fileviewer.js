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
    }

    async loadFileContent(filePath) {
        try {
            const response = await fetch(filePath);
            if (response.ok) {
                return await response.text();
            } else {
                console.error("Failed to load file content:", response.status, response.statusText);
                return "Failed to load content";
            }
        } catch (error) {
            console.error("Error fetching the file:", error);
            return "Failed to load content";
        }
    }

    async renderFolder(folder, folderName) {
        const filesContainer = this.querySelector(`#${folderName} .files`);
        const filesHTML = folder.map((fileName, fileIndex) => `<li data-file="${fileIndex}" data-folder="${folderName}" class="file p-1" style="cursor: pointer">${fileName.replace('.html', '')}</li>`).join("");
        filesContainer.innerHTML = filesHTML;

        const fileElements = this.querySelectorAll('.file');

        fileElements.forEach((fileElement) => fileElement.addEventListener('click', () => this.handleFileClick(fileElement.dataset.file, fileElement.dataset.folder)));
    }

    async render() {
        const defaultContent = '<div><title-component title="Welcome to our Courses"></title-component></title-component><div class="container py-3"><h2>We offer tutorials for various courses.</h2><p>Click a topic from the sidebar to start reading the topic.</p></div></div>';
        this.innerHTML = `
            <section class="courses-section">  
                <div class="container-fluid">      
                    <div class="row">
                        <div class="col-md-4 p-0" style="overflow-y: auto;">
                            <div class="accordion" id="fileAccordion">
                                ${Object.keys(this.data).map((folderName, folderIndex) => `
                                    <div class="accordion-item border-0" id="${folderName}">
                                        <div class="accordion-header" id="folder${folderIndex}Header">
                                            <button class="accordion-button collapsed bg-primary bg-opacity-10 rounded-0"  style="font-size: 1.05rem; font-weight: 650; height: 38px" type="button" data-bs-toggle="collapse" data-bs-target="#folder${folderIndex}" aria-expanded="false" aria-controls="folder${folderIndex}">
                                                <i class="fas fa-folder me-2"></i>${folderName}
                                            </button>
                                        </div>
                                        <div id="folder${folderIndex}" class="accordion-collapse collapse" aria-labelledby="folder${folderIndex}Header" data-bs-parent="#fileAccordion">
                                            <div class="accordion-body p-0">
                                                <ul class="files pt-2 ms-2"></ul>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="col-md-8 p-0">
                            <div class="content">
                                <div class="content-container">                                
                                    ${defaultContent}
                                </div>
                            </div>
                        </div>         
                    </div>  
                </div>          
            </section>
        `;

        Object.keys(this.data).forEach((folderName) => this.renderFolder(this.data[folderName], folderName));

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
