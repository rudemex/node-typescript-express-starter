import { Application, Request, Response } from 'express';
import httpClient from '../utils/http-client';
import signale from '../utils/signale';
import { toStringify } from '../utils/converters';

module.exports = (app: Application, appConfig: any) => {
  const { context } = appConfig['server'];
  const { apiRick } = appConfig['services'];

  app.get(
    encodeURI(`${context}/character`),
    async (req: Request, res: Response): Promise<any> => {
      try {
        const params = { ...req.query };

        const urlService = encodeURI(`${apiRick}/character/`);
        const { status, data } = await httpClient.get(urlService, {
          params,
        });

        signale.success({
          prefix: '[character] RESPONSE BODY',
          message: toStringify(data),
        });

        res.status(status).send(data);
      } catch (error) {
        signale.error({
          prefix: '[character] ERROR',
          message: toStringify(error),
        });
        res
          .status(error.status || 409)
          .send({ error_message: error.message, status: error.status || 409 });
      }
    },
  );
};
