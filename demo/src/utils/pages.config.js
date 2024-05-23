// Add pages to convert here:

module.exports = [
  { template: 'index.ejs', output: 'index.html', data: { title: "Home" } },
  { template: 'pages/page-2.ejs', output: 'page-2/index.html', data: { title: "Page 2" } },
  { template: 'pages/page-3.ejs', output: 'page-3/index.html', data: { title: "Page 3" } }
];