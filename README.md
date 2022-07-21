# ejs-static-converter

ejs-static-converter allows you to convert a node app that uses the EJS templating engine into a static HTML site, independant from any server code. This is useful for converting apps or websites that were made with node and ejs for easier development but don't require any server-side code into static HTML.

The package will also render any ejs `include` functions like below into the HTML package, such as a header, navbar etc. into the new HTML file.

```js
    // Include the header HTML which contains universal tags, references and other metadata.
    <%- include("indexHeader.ejs") -%>
```

### Installing the package
`express` and `ejs` are requirements for this package to work, as the site needs to be setup using the templating engine

```
npm i express ejs
```

```
npm i ejs-static-converter
```
<br>

A `/public` and `/views` folder should be created in your project's root folder to contain the .ejs views and any public files such as CSS, images etc. 

When the convert function is run, all html files will be created inside their own directory in the `/public` folder so all file references still work with the exception of the `index.ejs` file.

## Example 'server.js' file:
```js
// Main dependencies
const express = require("express");
const app = express();
const server = require("http").Server(app);

// References
const ejs = require("ejs");
var fs = require("fs");
const convertToStatic = require("ejs-static-converter")

// Declare ejs, JSON formatting and set static files folder.
app.set("view engine", "ejs");
app.set("json spaces", 2);
app.use(express.static("public"));

// Home
app.get("/", (req, res) => {
    res.render("index");
});

// Page 2
app.get("/page-2", (req, res) => {
    res.render("page-2");
});

// Initialise the server on port 3000.
server.listen(3000);


//
// Convert to static site
//

// List the names of all .ejs files in the '/views' directory.
const pages = ["Index", "Page-2"]

// Run the function
convertToStatic(pages)

// If you don't need the function, comment it out so it doesn't convert your site when you don't need it.
// convertToStatic(pages)
```

## Contributing

If you wan't to make a change or improvement, open a pull request or suggest a feature/bug as an issue.
