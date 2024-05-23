// src/server.js

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