const fs = require('fs');
const routes = require('./api/routes');

fs.writeFileSync('data.json', JSON.stringify(routes));
