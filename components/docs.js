class DocsComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="container-fluid m-0 p-0">
        <div class="row m-0 p-0">
          <aside class="col-lg-3 col-md-5 noscrollbar bg-primary bg-opacity-10 pb-4" id="sidebar">
          <h4 class="fw-bold text-center py-2 pb-0">Documents</h4>
            <div class="accordion" id="documentAccordion"></div>
          </aside>

          <main class="col-lg-9 col-md-7 m-0 p-0" id="content">
            <title-component title="Documentation"></title-component>
            <div class="container p-4">Click a topic from the sidebar to start reading the topic.</div>
          </main>
        </div>
      </div>`;

    this.populateDocs();
  }

  async populateDocs() {
    try {
      const response = await fetch(this.getAttribute('sidebar'));

      if (!response.ok) {
        throw new Error('Error loading file list.');
      }

      const data = await response.json();
      this.updateSidebar(data);
    } catch (error) {
      console.error('Error:', error);
      this.renderError('Error loading file list.');
    }
  }

  updateSidebar(data) {
    const accordion = this.querySelector('#documentAccordion');
    accordion.innerHTML = ''; // Clear existing content

    for (const folderName in data) {
      if (data.hasOwnProperty(folderName) && Array.isArray(data[folderName])) {
        accordion.appendChild(this.createAccordionItem(folderName, data[folderName]));
      } else {
        console.error(`Error: Invalid data format for key ${folderName}.`);
        this.renderError('Error loading file list.');
        break;
      }
    }

    // Add event listeners after updating the sidebar
    this.addEventListeners();
  }

  addEventListeners() {
    const accordion = this.querySelector('#documentAccordion');

    accordion.addEventListener('click', (event) => {
      const fileItem = event.target.closest('.file-item');
      if (fileItem) {
        const folderName = fileItem.dataset.folder;
        const fileName = fileItem.dataset.file;
        this.loadContent(folderName, fileName);
      }
    });

    accordion.addEventListener('mouseover', (event) => {
      const fileItem = event.target.closest('.file-item');
      if (fileItem) {
        fileItem.style.fontWeight = 'bold';
      }
    });

    accordion.addEventListener('mouseout', (event) => {
      const fileItem = event.target.closest('.file-item');
      if (fileItem) {
        fileItem.style.fontWeight = 'normal';
      }
    });
  }

  createAccordionItem(folderName, fileList) {
    const accordionItem = document.createElement('div');
    accordionItem.classList.add('accordion-item');

    const accordionHeader = document.createElement('h2');
    accordionHeader.classList.add('accordion-header');
    accordionHeader.id = `heading${folderName}`;

    const accordionButton = document.createElement('button');
  accordionButton.classList.add('accordion-button', 'p-2', 'fw-bold');
  accordionButton.setAttribute('type', 'button');
  const targetId = `collapse${folderName.replace(/\s+/g, '_')}`;
  accordionButton.setAttribute('data-bs-toggle', 'collapse');
  accordionButton.setAttribute('data-bs-target', `#${targetId}`);
  accordionButton.setAttribute('aria-expanded', 'true');
  accordionButton.setAttribute('aria-controls', targetId);

    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-folder-open', 'me-2'); // Using Font Awesome class for folder icon

    const folderNameElement = document.createElement('span');
    folderNameElement.textContent = folderName;

    accordionButton.appendChild(icon);
    accordionButton.appendChild(folderNameElement);

    accordionHeader.appendChild(accordionButton);

    const accordionBody = document.createElement('div');
  accordionBody.classList.add('accordion-collapse', 'collapse', 'show');
  accordionBody.id = targetId;
  accordionBody.setAttribute('aria-labelledby', `heading${folderName}`);
  
    const accordionBodyContent = document.createElement('div');
    accordionBodyContent.classList.add('accordion-body', 'p-2','rounded');

    const fileListElement = this.createFileList(fileList, folderName);
    accordionBodyContent.appendChild(fileListElement);
    accordionBody.appendChild(accordionBodyContent);

    accordionItem.appendChild(accordionHeader);
    accordionItem.appendChild(accordionBody);

    // Toggle icon and update aria-expanded attribute on accordion button click
    accordionButton.addEventListener('click', () => {
    const isExpanded = accordionButton.getAttribute('aria-expanded') === 'true';
    accordionButton.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    icon.classList.toggle('fa-folder-open');
    icon.classList.toggle('fa-folder');
    });

    return accordionItem;
  }

  createFileList(fileList, folderName) {
    const fileListElement = document.createElement('ul');
    fileListElement.classList.add('mb-0');

    fileList.forEach(fileName => {
      const listItem = document.createElement('li');
      listItem.textContent = fileName;
      listItem.classList.add('file-item'); // Add a class for event listeners
      listItem.dataset.folder = folderName;
      listItem.dataset.file = fileName;
      listItem.style.cursor = 'pointer';
      fileListElement.appendChild(listItem);
    });

    return fileListElement;
  }

  async loadContent(folderName, fileName) {
    try {
      const fullFileName = fileName + '.html';
      const response = await fetch(`${this.getAttribute('content')}/${folderName}/${fullFileName}`);

      if (!response.ok) {
        throw new Error('Error loading content.');
      }

      const data = await response.text();
      this.updateContent(`<title-component title="${fileName}"></title-component><div class="container p-4">${data}</div>`);
    } catch (error) {
      this.updateContent(`<div class="container p-3">${error.message}</div>`);
    }
  }

  updateContent(html) {
    this.querySelector('#content').innerHTML = html;
  }

  renderError(message) {
    const sidebar = this.querySelector('#documentAccordion');
    sidebar.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
  }
}

customElements.define('docs-component', DocsComponent);
