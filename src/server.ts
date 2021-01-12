const config = require('config');
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import signale from './utils/signale';
import { toStringify } from './utils/converters';
import { swagger } from './swagger';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const pjson = require('../package.json');

//signale.info('Using config: ', config);
const appConfig = config;
const serverConfig = appConfig['server'];
const swaggerConfig = appConfig['swagger'];

const port = parseInt(serverConfig['port'], 10) || 8080;

const corsOptions = {
  origin:
    serverConfig['corsEnabled'] == 'true'
      ? serverConfig['origins'].split(',')
      : '*',
  methods: serverConfig['methodsAllowed'],
  credentials: serverConfig['corsCredentials'],
  allowedHeaders: serverConfig['headersAllowed'],
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  const output_reqHeaders = {
    output: req['headers'],
  };

  const output_reqBody = {
    output: req['body'],
  };

  if (serverConfig['showLogInterceptor'] == 'true') {
    signale.info({
      prefix: `[INTERCEPTOR] REQUEST TO`,
      message: encodeURI(req['url']),
    });
    signale.info({
      prefix: `[INTERCEPTOR] REQUEST HEADERS`,
      message: toStringify(output_reqHeaders),
    });
    signale.info({
      prefix: `[INTERCEPTOR] REQUEST BODY `,
      message: toStringify(output_reqBody),
    });
  }

  const allowedOrigins = serverConfig['origins'].split(',');
  const origin = req['headers']['origin'] || '*';

  if (
    serverConfig['corsEnabled'] == 'true' &&
    allowedOrigins.includes(origin)
  ) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', serverConfig['methodsAllowed']);
    res.header('Access-Control-Allow-Headers', serverConfig['headersAllowed']);
    res.header('Access-Control-Allow-Credentials', 'true');
    corsOptions.origin = origin;
  }

  next();
});

signale.info('Using cors config: ', toStringify(corsOptions));
app.use(cors(corsOptions));

if (swaggerConfig['enabled'] == 'true') {
  swagger(app, serverConfig);
}

routes(app, appConfig, pjson['version']);

app.listen(port, () => {
  signale.info(`🏷 Version: ${pjson['version']}`);
  signale.success(`🚀 App running on port: ${port}`);
});
