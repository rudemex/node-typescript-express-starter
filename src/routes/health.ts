import { Application, Request, Response } from 'express';
import httpClient from '../utils/http-client';

module.exports = (app: Application, appConfig: any) => {
  const { context } = appConfig['server'];

  app.get(encodeURI(`${context}/health`), (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP' });
  });

  app.get(
    encodeURI(`${context}/rick`),
    async (req: Request, res: Response): Promise<any> => {
      const params = { name: 'rick', status: 'alive', page: 2 };

      const { status, data } = await httpClient.get(
        'https://rickandmortyapi.com/api/character/',
        {
          params,
        },
      );

      res.status(status).json(data);
    },
  );
};
