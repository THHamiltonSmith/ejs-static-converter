const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');
const fse = require('fs-extra'); // For copying directories

// If you're using __dirname and __filename in ES modules
const __filename = fileURLToPath(__filename);
const __dirname = path.dirname(__filename);

const pages = [
  { template: 'home.ejs', output: 'index.html', data: { title: "Home" } },
  { template: 'services.ejs', output: 'services/index.html', data: { title: "Services" } },
  { template: 'services/service1.ejs', output: 'services/service1/index.html', data: { title: "Service 1" } },
  { template: 'legal/privacy/privacy.ejs', output: 'legal/privacy/index.html', data: { title: "Privacy" } },
  { template: '404.ejs', output: '404/index.html', data: { title: "404 - Page Not Found" } }
];

const viewsDir = path.join(__dirname, 'views');
const outputDir = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');

// Ensure output directory exists
if (!fs.existsSync(outputDir)){
  fs.mkdirSync(outputDir);
}

// Render EJS templates to static HTML
pages.forEach(page => {
  const templatePath = path.join(viewsDir, page.template);
  const outputPath = path.join(outputDir, page.output);
  const outputDirPath = path.dirname(outputPath);

  // Ensure the output directory for the page exists
  if (!fs.existsSync(outputDirPath)) {
    fs.mkdirSync(outputDirPath, { recursive: true });
  }

  ejs.renderFile(templatePath, page.data, (err, str) => {
    if (err) {
      console.error(`Error rendering ${page.template}:`, err);
      return;
    }

    fs.writeFileSync(outputPath, str);
    console.log(`${page.output} generated successfully.`);
  });
});

// Copy the public directory to the output directory
fse.copySync(publicDir, outputDir, { overwrite: true }, (err) => {
  if (err) {
    console.error('Error copying public directory:', err);
  } else {
    console.log('Public assets copied successfully.');
  }
});
