const fs = require("fs");
const path = require("path");

// Kebab case conversion function
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '_')
    .toLowerCase();
}

function parseMetadata(sourceContent) {
  const metadata = {};
  const lines = sourceContent.split("\n");
  let inMetadata = false;

  for (const line of lines) {
    if (line.trim() === "---") {
      inMetadata = !inMetadata;
    } else if (inMetadata) {
      const [key, value] = line.split(":").map((part) => part.trim());
      metadata[key] = value;
    }
  }

  return metadata;
}

function generatePostHtml(metadata, content) {
  return `
  <!DOCTYPE html>
    <html lang="en">

      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta name="author" content="${metadata.author}" />
        <title>${metadata.title}</title>
        <link href="assets/css/fontawesome.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/mystyles.css" rel="stylesheet" type="text/css" />
        <script src="assets/js/bootstrap.bundle.min.js" type="text/javascript" defer></script>
        <script src="components/header.js" type="text/javascript" defer></script>
        <script src="components/title.js" type="text/javascript" defer></script>
        <script src="components/footer.js" type="text/javascript" defer></script>
      </head>
      <body>
        <header-component></header-component>
        <div class="card border-0 rounded-0 shadow">
          <img src="assets/images/${metadata.image}.jpg" class="card-img-top rounded-0" alt=${metadata.title}>
            <div class="card-overlay position-absolute m-2">
              <p class="badge bg-success rounded-pill">${metadata.category}</p>
              <h1 class="card-title text-light" style="font-weight:900">${metadata.title}</h1>
            </div>
            <div class="card-body">
              <p class="card-text">${content}</p>
            </div>
            <div class="card-footer rounded-0 bg-primary bg-opacity-10">
              <small>By <strong>${metadata.author}</strong> | ${metadata.date}</small>
            </div>
        </div>
        <footer-component></footer-component>
      </body>
    </html>
  `;
}

function generateBlogHtml(posts) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog</title>
    <link href="assets/css/fontawesome.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/mystyles.css" rel="stylesheet" type="text/css" />
    <script src="assets/js/bootstrap.bundle.min.js" type="text/javascript" defer></script>
    <script src="components/header.js" type="text/javascript" defer></script>
    <script src="components/title.js" type="text/javascript" defer></script>
    <script src="components/footer.js" type="text/javascript" defer></script>
  </head>
  
  <body>
    <header-component showSearchButton></header-component>
    <section class="blog-section bg-primary bg-opacity-10">
      <title-component title="Blog"></title-component>
      <div class="container py-5">
        <div class="row">
          <div class="col-lg-12 mb-4 text-center">
            <div id="filterButtons">
              <button class="btn btn-outline-primary rounded-pill filter-btn m-2 active shadow" data-filter="all">All Categories</button>
              ${Array.from(new Set(posts.map((post) => post.category)))
                .map(
                  (category) => `
                    <button class="btn btn-outline-primary rounded-pill filter-btn me-2 shadow" data-filter="${category}">${category}</button>
                `
                )
                .join("")}
            </div>
          </div>
          ${posts
            .map(
              (post) => `
                <div class="col-lg-4 col-md-6 post-item" data-category="${post.category}">
                  <a href="${post.fileName}.html" class="text-decoration-none">
                    <div class="card border-primary shadow mb-4">
                      <div class="card-overlay position-absolute m-2">
                        <p class="badge bg-success rounded-pill">${post.category}</p>
                      </div>
                      <img src="assets/images/${post.image}.jpg" class="card-img-top" alt=${post.title}>
                      <div class="card-body">
                        <h4 class="fw-bold card-title text-primary">${post.title}</h4>
                        <p class="card-text">${post.description}</p>
                      </div>
                      <div class="card-footer bg-primary bg-opacity-10">
                        <p class="card-text">
                          <small>By <strong>${post.author}</strong> | ${post.date}</small>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>`
            )
            .join("")}
        </div>
      </div>
    </section>
    <footer-component></footer-component>
    <script>
    document.addEventListener('DOMContentLoaded', function () {
      const filterButtons = document.querySelectorAll('.filter-btn');
      const blogItems = document.querySelectorAll('.post-item');
      const searchInput = document.getElementById('searchInput');

      // Function to filter by category
      function filterByCategory(category) {
        blogItems.forEach(item => {
          const itemCategory = item.dataset.category;
          if (category === 'all' || category === itemCategory) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      }

      // Event listener for filter buttons
      filterButtons.forEach(button => {
        button.addEventListener('click', function () {
          filterButtons.forEach(btn => {
            btn.classList.remove('active');
          });
          this.classList.add('active');
          const selectedCategory = this.getAttribute('data-filter');
          filterByCategory(selectedCategory);
        });
      });

      // Event listener for search input
      searchInput.addEventListener('input', function () {
        const searchQuery = this.value.toLowerCase();

        // Check if search query is not empty
        if (searchQuery.trim() !== '') {
          // Activate "All" filter when searching
          filterButtons.forEach(btn => {
            btn.classList.remove('active');
          });
          filterButtons[0].classList.add('active');
        }

        // Filter blog items based on search query
        blogItems.forEach(item => {
          const itemTitle = item.querySelector('.card-title').innerText.toLowerCase();
          if (itemTitle.includes(searchQuery) || searchQuery.trim() === '') {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  </script>
  </body>
  
  </html>  
        `;
}

const contentsFolder = "contents/Blogs";
const outputFolder = "";

const sourceFiles = fs
  .readdirSync(contentsFolder)
  .filter((file) => path.extname(file).toLowerCase() === ".md")
  .map((file) => path.join(contentsFolder, file));

sourceFiles.forEach((sourceFile) => {
  const fileNameWithoutExtension = path.basename(sourceFile, ".md");
  const outputFileName = `${fileNameWithoutExtension}.html`;
  console.log(`File created: ${outputFileName}`);
  const outputPath = path.join(outputFolder, outputFileName);

  const sourceContent = fs.readFileSync(sourceFile, "utf8");
  const metadata = parseMetadata(sourceContent);
  const content = sourceContent.split("---")[2].trim();

  const postHtml = generatePostHtml(metadata, content);
  fs.writeFileSync(outputPath, postHtml);
});

const blogOutputPath = path.join(outputFolder, "blog.html");
console.log(`File created: ${blogOutputPath}`);
const posts = sourceFiles.map((sourceFile) => {
  const sourceContent = fs.readFileSync(sourceFile, "utf8");
  const metadata = parseMetadata(sourceContent);
  return { ...metadata, fileName: path.basename(sourceFile, ".md") };
});

const blogHtml = generateBlogHtml(posts);
fs.writeFileSync(blogOutputPath, blogHtml);

function generateSidebarJSON(rootFolder, sidebarOutputPath) {
  const folderNames = fs.readdirSync(rootFolder);
  const folderContents = {};

  folderNames.forEach((folderName) => {
    const folderPath = path.join(rootFolder, folderName);
    const fileNames = fs.readdirSync(folderPath);

    // Remove file extension from file names
    const filesWithoutExtension = fileNames.map((fileName) =>
      fileName.replace(".html", "")
    );

    folderContents[folderName] = filesWithoutExtension;
  });

  const jsonString = JSON.stringify(folderContents, null, 2);
  fs.writeFileSync(sidebarOutputPath, jsonString);
}

function createCourseObject(courseName) {
  return {
    courseName,
    rootFolder: `contents/${courseName}`,
    sidebarOutputPath: `sidebars/${toKebabCase(courseName)}.json`,
  };
}

const rootFolders = [
  createCourseObject("Digital Electronics"),
  createCourseObject("Embedded Systems"),
  createCourseObject("Web Development"),
  createCourseObject("Internet of Things"),
  createCourseObject("Electrical and Electronic Measurement")
];

// Generate JSON files for each entry in the array
rootFolders.forEach(({ rootFolder, sidebarOutputPath }) => {
  generateSidebarJSON(rootFolder, sidebarOutputPath);  
  console.log(`File created: ${sidebarOutputPath}`);
});


// Your HTML template
const courseTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>InkredibleDoc | Docs</title>
    <link href="assets/css/fontawesome.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/mystyles.css" rel="stylesheet" type="text/css" />
    <script src="assets/js/bootstrap.bundle.min.js" type="text/javascript" defer></script>
    <script src="components/header.js" type="text/javascript" defer></script>
    <script src="components/title.js" type="text/javascript" defer></script>
    <script src="components/footer.js" type="text/javascript" defer></script>
    <script src="components/docs.js" type="text/javascript" defer></script>
</head>

<body>
    <header-component showToggleButton></header-component>
    <docs-component content="{{CONTENT}}" sidebar="{{SIDEBAR}}"></docs-component>
    <footer-component></footer-component>
</body>

</html>`;

// Create HTML files
rootFolders.forEach((rootFolder) => {
  const outputHtml = courseTemplate
    .replace('{{CONTENT}}', rootFolder.rootFolder)
    .replace('{{SIDEBAR}}', rootFolder.sidebarOutputPath);

  const fileName = `${path.basename(rootFolder.sidebarOutputPath, '.json')}.html`;

  fs.writeFileSync(fileName, outputHtml);
  console.log(`File created: ${fileName}`);
});