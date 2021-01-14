const config = require('config');
import signale from './utils/signale';
import app from './app';

const pjson = require('../package.json');

const serverConfig = config['server'];
const port = parseInt(serverConfig['port'], 10) || 8080;

app.listen(port, () => {
  signale.info(`🏷 Version: ${pjson['version']}`);
  signale.success(`🚀 App running on port: ${port}`);
});
