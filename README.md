# ejs-static-converter

ejs-static-converter allows you to convert a node app that uses the EJS templating engine into a static HTML site, independent of any server code. This is useful for converting apps or websites that were made with Node.js and EJS for easier development but don't require any server-side code into static HTML.

The package will also render any EJS `include` functions like below into the HTML package, such as a header, navbar, etc. into the new HTML file.

```js
// Include the header HTML which contains universal tags, references and other metadata.
<%- include("index-header.ejs") -%>
```

## Installing the package
`express` and `ejs` are requirements for this package to work, as the site needs to be setup using the templating engine

Install the required dependencies:
```
npm install express ejs
```

Install the ejs-static-converter package:
```
npm install -g ejs-static-converter
```
<br>

## Project Structure

A `/public` and `/views` folder should be created in your project's root folder to contain the .ejs views and any public files such as CSS, images, etc.

When the convert function is run, all HTML files will be created inside a `/dist` directory in the project's root folder.

## Configuration
Create a configuration file `pages.config.js` somwhere in your project to define the pages to be converted. Here is an example config file stores in the `src/utils` folder:

```js
// src/utils/pages.config.js

// Add pages to convert here:
module.exports = [
  { template: 'index.ejs', output: 'index.html', data: { title: "Home" } },
  { template: 'pages/page-2.ejs', output: 'page-2/index.html', data: { title: "Page 2" } },
  { template: 'pages/page-3.ejs', output: 'page-3/index.html', data: { title: "Page 3" } }
];
```

## Running the Conversion
To convert your EJS site to a static HTML site, run the following command in your project root:

```
ejs-static-converter ./src/utils/pages.config.js
```

Where `/src/utils/pages.config.js` is the path to your config file.

## Example 'server.js' file:
Here's an example of how to set up your server and use the ejs-static-converter:


```js
// Main dependencies
const express = require("express");
const app = express();
const server = require("http").Server(app);

// Declare ejs, JSON formatting and set static files folder.
app.set("view engine", "ejs");
app.set("json spaces", 2);
app.use(express.static("public"));

// Home
app.get("/", (req, res) => {
    res.render("index", {
        title: "Home",
    });
});

// Page 2
app.get("/page-2", (req, res) => {
    res.render("pages/page-2", {
        title: "Page 2",
    });
});

// Page 3
app.get("/page-3", (req, res) => {
    res.render("pages/page-3", {
        title: "Page 3",
    });
});

// Initialise the server on port 3000.
server.listen(2000);
```

## Contributing

If you wan't to make a change or improvement, open a pull request or suggest a feature/bug as an issue.
