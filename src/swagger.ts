import { Request, Response, Application } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import signale from './utils/signale';
import pjson from '../package.json';

const swagger = (app: Application, config: any) => {
  const swaggerDefinition = {
    info: {
      title: `${pjson.name}`,
      version: `${pjson.version}`,
      description: `Swagger - ${pjson.description}`,
    },

    basePath: config.context,
  };

  const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
  };
  const swaggerSpec = swaggerJSDoc(options);
  app.get('/swagger.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  signale.info('Swagger is enabled in : /api-docs');
};

module.exports = swagger;
