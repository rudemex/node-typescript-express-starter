import { Application, Request, Response } from 'express';
import httpClient from '../utils/http-client';
import signale from '../utils/signale';
import { toStringify } from '../utils/converters';

module.exports = (app: Application, appConfig: any) => {
  const { context } = appConfig['server'];

  app.get(
    encodeURI(`${context}/character`),
    async (req: Request, res: Response): Promise<any> => {
      try {
        const params = { name: 'rick', status: 'alive', page: 2 };

        const { status, data } = await httpClient.get(
          'https://rickandmortyapi.com/api/character/',
          {
            params,
          },
        );

        res.status(status).send(data);
      } catch (error) {
        signale.error({
          prefix: '[spa-config] ERROR',
          message: toStringify(error),
        });
        res
          .status(error.status || 409)
          .send({ error_message: error.message, status: error.status || 409 });
      }
    },
  );
};
