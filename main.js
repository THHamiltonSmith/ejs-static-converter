// Convert an EJS template site to static HTML.

// References
const ejs = require("ejs");
var fs = require("fs");
const { cwd } = require('node:process');

// Main function
function convertSite(pages) {
    // For each page given by the user
    for (var i = 0; i < pages.length; i++) {
        // Replace any multi-word views that have a '-' with a space
        var titleName = pages[i].replaceAll("-", " ");

        // Render the .ejs file as a string.
        ejs.renderFile("./views/" + pages[i].toLowerCase() + ".ejs", (err, str) => {
            //
            // Don't create a directory for the index page.
            // For the rest, create a directory inside the users '/public' directory.
            if (pages[i] == "Index") {
                fs.writeFileSync(cwd() + "/public/index.html", str, function () {
                    handleStaticErrors(newErr);
                });
            } else {
                fs.mkdirSync(cwd() + "/public/" + pages[i].toLowerCase());
                fs.writeFileSync(cwd() + "/public/" + pages[i].toLowerCase() + "/index.html", str, function () {
                    handleStaticErrors(newErr);
                });
            }
        });
    }
}

// Handle errors when making a static file.
function handleStaticErrors(err) {
    if (err) {
        console.log(err);
        return false;
    }
    return true;
}

// Export the function
module.exports = convertSite;
