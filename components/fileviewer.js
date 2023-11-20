class FileViewer extends HTMLElement {
    constructor() {
        super();
        this.data = {};
    }

    connectedCallback() {
        this.setupSidebar();
        window.addEventListener('load', () => this.responsiveSidebar());
        window.addEventListener('resize', () => this.responsiveSidebar());
    }

    async loadFolderData() {
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
    }

    setupSidebar() {
        const sidebar = document.createElement('div');
        sidebar.id = 'docs-sidebar';
        document.body.appendChild(sidebar);
        this.loadFolderData(); // Move the call to loadFolderData here
    }

    responsiveSidebar() {
        const sidebar = document.getElementById('docs-sidebar');
        sidebar.classList.toggle('sidebar-hidden', window.innerWidth < 1200);
        sidebar.classList.toggle('sidebar-visible', window.innerWidth >= 1200);
    }

    renderFolder(folder, folderName) {
        const filesContainer = this.querySelector(`#${folderName} .files`);
        const filesHTML = folder.map((fileName, fileIndex) =>
            `<li id="${fileIndex}" data-file="${fileIndex}" data-folder="${folderName}" class="file mb-2" style="cursor: pointer">${fileName.replace('.html', '')}</li>`
        ).join("");
        filesContainer.innerHTML = filesHTML;
        filesContainer.addEventListener('click', (event) => {
            const fileElement = event.target.closest('.file');
            if (fileElement) {
                const { file, folder } = fileElement.dataset;
                this.handleFileClick(file, folder);
            }
        });
    }

    render() {
        const defaultContent = '<div><title-component title="Welcome to our Courses"></title-component></title-component><div class="container py-3"><h2>We offer tutorials for various courses.</h2><p>Click a topic from the sidebar to start reading the topic.</p></div></div>';
        this.innerHTML = `
            <section class="courses-section">                         
                <div id="docs-sidebar" class="docs-sidebar bg-primary bg-opacity-10">                       
                    ${Object.keys(this.data).map((folderName, folderIndex) => `
                        <div id="${folderName}">
                            <button id="${folderName}" class="w-100 h-20 d-flex align-items-center border-1 my-1" style="font-size: 1.05rem; font-weight: 600; height: 38px" data-bs-toggle="collapse" data-bs-target="#folder${folderIndex}">
                                <i class="fas fa-folder me-2"></i>
                                <span>${folderName}</span>
                            </button>                                   
                            <div id="folder${folderIndex}" class="collapse">
                                <ul class="files"></ul>                                       
                            </div>
                        </div>
                    `).join('')}                     
                </div>
                <div class="docs-content">             
                    <div class="content-container">
                        ${defaultContent}
                    </div> 
                </div>                                
            </section>
        `;
        Object.keys(this.data).forEach((folderName, folderIndex) => this.renderFolder(this.data[folderName], folderName, folderIndex));
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
                contentContainer.innerHTML = `<title-component title="${title}"></title-component><div class="container py-3">${bodyContent}</div>`;
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
