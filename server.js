const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const { exec } = require("child_process");

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "POST" && url === "/saveFile") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const postData = querystring.parse(body);
      const { title, category, chapter, post } = postData;

      // Save the file
      const fileName = `${title}.html`;
      const categoryFolder = path.join(__dirname, "contents", category);
      const chapterFolder = path.join(categoryFolder, chapter);

      fs.mkdirSync(categoryFolder, { recursive: true });
      fs.mkdirSync(chapterFolder, { recursive: true });

      const filePath = path.join(chapterFolder, fileName);

      const content = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <title>${title}</title>
        </head>
        <body>
          <div>${post}</div>          
        </body>
        </html>
      `;

      fs.writeFile(filePath, content, (writeErr) => {
        if (writeErr) {
          console.error("Error writing to file:", writeErr);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        } else {
          // Run the build.js code
          exec("node build.js", (err, stderr) => {
            if (err) {
              // There was an error starting the process (e.g., build.js doesn't exist)
              console.error("Error running build.js:", err);
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("Internal Server Error");
            } else if (stderr) {
              // There was an error during the execution of build.js
              console.error("Error in build.js execution:", stderr);
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("Internal Server Error");
            } else {
              // build.js executed successfully
              console.log("Build code executed");
              res.writeHead(200, { "Content-Type": "text/plain" });
              res.end("File created successfully");
            }
          });
        }
      });
    });
  } else {
    // Serve your HTML file (admin.html)
    const htmlPath = path.join(__dirname, "admin.html");

    fs.readFile(htmlPath, "utf8", (readErr, data) => {
      if (readErr) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
});

const port = 8000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
