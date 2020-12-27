import { Application, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import signale from './utils/signale';

const pjson = require('../package.json');

export const swagger = (app: Application, config: any) => {
  const swaggerDefinition = {
    info: {
      title: `${pjson['name']}`,
      version: `${pjson['version']}`,
      description: `Swagger - ${pjson['description']}`,
    },
    basePath: config['context'],
  };

  const options = {
    swaggerDefinition,
    apis: ['./api-swagger.yaml', './routes/*.ts'],
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.get('/swagger.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  signale.info('Swagger is enabled in : /api-docs');
};
