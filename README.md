# ejs-static-converter

ejs-static-converter allows you to convert a node app that uses the EJS templating engine into a static HTML site, independant from any server code. This is useful for converting apps or websites that were made with node and ejs for easier development but don't require any server-side code into static HTML.


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

## Example 'server.js' file:
```js
// Main dependencies
const express = require("express");
const app = express();
const server = require("http").Server(app);

// References
const ejs = require("ejs");
var fs = require("fs");
const staticGen = require("static-generator")

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
const pages = ["Index", "Filmatic"]

// Run the function
staticGen(pages)
```
