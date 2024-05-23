module.exports = [
    { template: 'home.ejs', output: 'index.html', data: { title: "Home" } },
    { template: 'services.ejs', output: 'services/index.html', data: { title: "Services" } },
    { template: 'services/service1.ejs', output: 'services/service1/index.html', data: { title: "Service 1" } },
    { template: 'legal/privacy/privacy.ejs', output: 'legal/privacy/index.html', data: { title: "Privacy" } },
    { template: '404.ejs', output: '404/index.html', data: { title: "404 - Page Not Found" } }
  ];
  