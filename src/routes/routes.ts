import { Application, Request, Response } from 'express';

const appRouter = (app: Application, version: string) => {
  require('./health')(app);

  app.get('/', (req: Request, res: Response) => {
    res.status(200).send(`Welcome to server express - v${encodeURI(version)}`);
  });
};

module.exports = appRouter;
