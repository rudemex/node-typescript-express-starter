import { Application, Request, Response } from 'express';

module.exports = (app: Application, appConfig: any) => {
  const { context } = appConfig['server'];

  app.get(encodeURI(`${context}/health`), (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP' });
  });
};
