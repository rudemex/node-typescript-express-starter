import { Application, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import signale from './utils/signale';

const pjson = require('../package.json');

export const swagger = (app: Application, appConfig: any) => {
  const swaggerDefinition = {
    info: {
      title: `${pjson['name']}`,
      version: `${pjson['version']}`,
      description: `Swagger - ${pjson['description']}`,
    },
    basePath: appConfig['server']['context'],
  };

  const options = {
    swaggerDefinition,
    apis: ['./api-swagger.yaml'],
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.get('/swagger.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.use(`/${appConfig['swagger']['path']}`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  signale.info('Swagger is enabled in : /api-docs');
};
