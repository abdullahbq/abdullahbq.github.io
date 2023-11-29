const fs = require("fs");
const path = require("path");

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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
          integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
          crossorigin="anonymous" />
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <script src="js/bootstrap.bundle.min.js" type="text/javascript" defer></script>
        <script src="components/header.js" type="text/javascript" defer></script>
        <script src="components/title.js" type="text/javascript" defer></script>
        <script src="components/footer.js" type="text/javascript" defer></script>
      </head>
      <body>
        <header-component></header-component>
        <div class="card border-0 rounded-0 shadow">
          <img src="images/${metadata.image}.png" class="card-img-top rounded-0" alt=${metadata.title}>
            <div class="card-overlay position-absolute m-2">
              <p class="badge bg-primary">${metadata.category}</p>
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
      integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
      crossorigin="anonymous" />
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <script src="js/bootstrap.bundle.min.js" type="text/javascript" defer></script>
    <script src="components/header.js" type="text/javascript" defer></script>
    <script src="components/title.js" type="text/javascript" defer></script>
    <script src="components/footer.js" type="text/javascript" defer></script>
  </head>
  
  <body>
    <header-component></header-component>
    <section class="blog-section bg-primary bg-opacity-10">
      <title-component title="Blog"></title-component>
      <div class="container py-5">
        <div class="row">
          <div class="col-lg-12 mb-4 text-center">
            <div id="filterButtons">
              <button class="btn btn-outline-primary rounded-pill filter-btn m-2 active" data-filter="all">All Categories</button>
              ${Array.from(new Set(posts.map((post) => post.category)))
                .map(
                  (category) => `
                    <button class="btn btn-outline-primary rounded-pill filter-btn me-2" data-filter="${category}">${category}</button>
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
                        <p class="badge bg-primary">${post.category}</p>
                      </div>
                      <img src="images/${post.image}.png" class="card-img-top" alt=${post.title}>
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
    
      filterButtons.forEach(button => {
        button.addEventListener('click', function () {
          // Remove "active" class from all filter buttons
          filterButtons.forEach(btn => {
            btn.classList.remove('active');
          });
    
          // Add "active" class to the clicked filter button
          this.classList.add('active');
    
          const selectedCategory = this.getAttribute('data-filter');
    
          blogItems.forEach(item => {
            const itemCategory = item.dataset.category;
    
            if (selectedCategory === 'all' || selectedCategory === itemCategory) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    });
    </script>
  </body>
  
  </html>  
        `;
}

const contentsFolder = "Blogs";
const outputFolder = "";

const sourceFiles = fs
  .readdirSync(contentsFolder)
  .filter((file) => path.extname(file).toLowerCase() === ".md")
  .map((file) => path.join(contentsFolder, file));

sourceFiles.forEach((sourceFile) => {
  const fileNameWithoutExtension = path.basename(sourceFile, ".md");
  const outputFileName = `${fileNameWithoutExtension}.html`;
  const outputPath = path.join(outputFolder, outputFileName);

  const sourceContent = fs.readFileSync(sourceFile, "utf8");
  const metadata = parseMetadata(sourceContent);
  const content = sourceContent.split("---")[2].trim();

  const postHtml = generatePostHtml(metadata, content);
  fs.writeFileSync(outputPath, postHtml);
});

const blogOutputPath = path.join(outputFolder, "blog.html");
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

// Array of root folders and corresponding sidebar output paths
const rootFolders = [
  {
    rootFolder: "Digital Electronics",
    sidebarOutputPath: "digital_electronics.json",
  },
  {
    rootFolder: "Embedded Systems",
    sidebarOutputPath: "embedded_systems.json",
  },
  {
    rootFolder: "Web Development",
    sidebarOutputPath: "web_development.json",
  },
];

// Generate JSON files for each entry in the array
rootFolders.forEach(({ rootFolder, sidebarOutputPath }) => {
  generateSidebarJSON(rootFolder, sidebarOutputPath);
});
