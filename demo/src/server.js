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

// Page 3
app.get("/page-3", (req, res) => {
    res.render("page-3");
});

// Initialise the server on port 3000.
server.listen(3000);


//
// Convert to static site
//

// List the names of all .ejs files in the '/views' directory.
const pages = ["Index", "Page-2", "Page-3"]

// Run the function
convertToStatic(pages)

// If you don't need the function, comment it out so it doesn't convert your site when you don't need it.
// convertToStatic(pages)