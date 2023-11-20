const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

function parseMetadata(sourceContent) {
  const metadata = {};
  const lines = sourceContent.split('\n');
  let inMetadata = false;

  for (const line of lines) {
    if (line.trim() === '---') {
      inMetadata = !inMetadata;
    } else if (inMetadata) {
      const [key, value] = line.split(':').map(part => part.trim());
      metadata[key] = value;
    }
  }

  return metadata;
}

function generatePage(templatePath, sourcePath, outputPath) {
  const templateContent = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(templateContent);
  const sourceContent = fs.readFileSync(sourcePath, "utf8");
  const metadata = parseMetadata(sourceContent);
  const content = sourceContent.split('---')[2].trim(); // Assuming the markdown content follows the metadata
  const htmlContent = template({ ...metadata, content });
  fs.writeFileSync(outputPath, htmlContent);
}

function generateBlogPage(blogTemplatePath, sourceFiles, outputPath) {
  const blogTemplateContent = fs.readFileSync(blogTemplatePath, "utf8");
  const blogTemplate = handlebars.compile(blogTemplateContent);
  const posts = sourceFiles.map((sourceFile) => {
    const sourceContent = fs.readFileSync(sourceFile, "utf8");
    const metadata = parseMetadata(sourceContent);
    return { ...metadata, fileName: path.basename(sourceFile, ".md") };
  });

  const htmlContent = blogTemplate({ posts });
  fs.writeFileSync(outputPath, htmlContent);
}

const templatePath = "templates/post_template.hbs";
const contentsFolder = "contents";
const outputFolder = "";

const sourceFiles = fs
  .readdirSync(contentsFolder)
  .filter((file) => path.extname(file).toLowerCase() === ".md")
  .map((file) => path.join(contentsFolder, file));

sourceFiles.forEach((sourceFile) => {
  const fileNameWithoutExtension = path.basename(sourceFile, ".md");
  const outputFileName = `${fileNameWithoutExtension}.html`;
  const outputPath = path.join(outputFolder, outputFileName);
  generatePage(templatePath, sourceFile, outputPath);
});

const blogTemplatePath = "templates/blog_template.hbs";
const blogOutputPath = path.join(outputFolder, "blog.html");
generateBlogPage(blogTemplatePath, sourceFiles, blogOutputPath);
const rootFolder = 'courses';
const sidebarOutputPath = 'sidebar.json';
const folderNames = fs.readdirSync(rootFolder);
const folderContents = {};

folderNames.forEach(folderName => {
  const folderPath = path.join(rootFolder, folderName);
  folderContents[folderName] = fs.readdirSync(folderPath);
});

const jsonString = JSON.stringify(folderContents, null, 2);
fs.writeFileSync(sidebarOutputPath, jsonString);
