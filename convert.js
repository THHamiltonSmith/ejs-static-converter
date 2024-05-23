#!/usr/bin/env node

const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

// Ensure arguments are provided
if (process.argv.length < 3) {
  console.error('Usage: node convert.js <path to pages.config.js>');
  process.exit(1);
}

// Get the configuration file path from the arguments
const configPath = path.resolve(process.argv[2]);

// Check if the configuration file exists
if (!fs.existsSync(configPath)) {
  console.error(`Configuration file not found: ${configPath}`);
  process.exit(1);
}

// Load pages configuration
const pages = require(configPath);

// Define base directories relative to the project root
const projectRoot = process.cwd();
const viewsDir = path.join(projectRoot, 'views');
const outputDir = path.join(projectRoot, 'dist');
const publicDir = path.join(projectRoot, 'public');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
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