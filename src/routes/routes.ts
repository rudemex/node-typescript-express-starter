import { Application, Request, Response } from 'express';

const appRouter = (app: Application, appConfig: any, version: string) => {
  // Routes
  require('./health')(app, appConfig);

  app.get('/', (req: Request, res: Response) => {
    res.status(200).send(`Welcome to server express - v${encodeURI(version)}`);
  });
};

module.exports = appRouter;
