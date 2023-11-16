class FileViewer extends HTMLElement {
    constructor() {
        super();
        this.rootFolder = "courses";
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
        const filesHTML = folder.map((fileName, fileIndex) => `<li data-file="${fileIndex}" data-folder="${folderName}" class="file">${fileName.replace('.html', '')}</li>`).join("");
        filesContainer.innerHTML = filesHTML;

        const fileElements = this.querySelectorAll('.file');

        fileElements.forEach((fileElement) => fileElement.addEventListener('click', () => this.handleFileClick(fileElement.dataset.file, fileElement.dataset.folder)));
    }

    async render() {
        const defaultContent = "Select a file to view its content.";
        this.innerHTML = `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3" style="max-height: 100vh; overflow-y: auto;">
                        <div class="accordion" id="fileAccordion">
                            ${Object.keys(this.data).map((folderName, folderIndex) => `
                                <div class="accordion-item" id="${folderName}">
                                    <h2 class="accordion-header" id="folder${folderIndex}Header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#folder${folderIndex}" aria-expanded="false" aria-controls="folder${folderIndex}">
                                            ${folderName}
                                        </button>
                                    </h2>
                                    <div id="folder${folderIndex}" class="accordion-collapse collapse" aria-labelledby="folder${folderIndex}Header" data-bs-parent="#fileAccordion">
                                        <div class="accordion-body">
                                            <ul class="files"></ul>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="content">
                            <div class="content-container">
                                <h2>Welcome to File Explorer</h2>
                                <p>${defaultContent}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        Object.keys(this.data).forEach((folderName) => this.renderFolder(this.data[folderName], folderName));
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

                contentContainer.innerHTML = `<h2>${title}</h2><div>${bodyContent}</div>`;
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
