import { Application, Request, Response } from 'express';
const config = require('config');

module.exports = (app: Application) => {
  const serverConfig = config.get('server');
  const context = serverConfig.context;

  app.get(encodeURI(`${context}/health`), (req: Request, res: Response) => {
    res.json({ status: 'UP' });
  });
};
