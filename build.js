const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const matter = require("gray-matter");

function generatePage(templatePath, sourcePath, outputPath) {
  // Read template file
  const templateContent = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(templateContent);

  // Read source file
  const sourceContent = fs.readFileSync(sourcePath, "utf8");
  const { data, content } = matter(sourceContent);

  // Replace placeholders in template with actual content
  const htmlContent = template({ ...data, content });

  // Save the generated HTML page
  fs.writeFileSync(outputPath, htmlContent);
}

function generateBlogPage(blogTemplatePath, sourceFiles, outputPath) {
  // Read blog template file
  const blogTemplateContent = fs.readFileSync(blogTemplatePath, "utf8");
  const blogTemplate = handlebars.compile(blogTemplateContent);

  // Process each Markdown file
  const posts = sourceFiles.map((sourceFile) => {
    const sourceContent = fs.readFileSync(sourceFile, "utf8");
    const { data } = matter(sourceContent);

    // Assuming your template expects data like 'title'
    return { ...data, fileName: path.basename(sourceFile, ".md") };
  });

  // Replace placeholders in blog template with actual content
  const htmlContent = blogTemplate({ posts });

  // Save the generated blog HTML page
  fs.writeFileSync(outputPath, htmlContent);
}

// Generate pages for each Markdown file in the contents folder
const templatePath = "templates/post_template.hbs";
const contentsFolder = "contents";
const outputFolder = "";
const blogTemplatePath = "templates/blog_template.hbs"; // Update with your blog template file path

// Read the list of files in the contents folder
const sourceFiles = fs
  .readdirSync(contentsFolder)
  .filter((file) => path.extname(file).toLowerCase() === ".md")
  .map((file) => path.join(contentsFolder, file));

// Generate individual post pages
sourceFiles.forEach((sourceFile) => {
  const fileNameWithoutExtension = path.basename(sourceFile, ".md");
  const outputFileName = `${fileNameWithoutExtension}.html`;
  const outputPath = path.join(outputFolder, outputFileName);
  generatePage(templatePath, sourceFile, outputPath);
});

// Generate blog index page
const blogOutputPath = path.join(outputFolder, "blog.html");
generateBlogPage(blogTemplatePath, sourceFiles, blogOutputPath);
