import request from 'supertest';
const config = require('config');
import app from '../src/app';

const serverConfig = config['server'];

describe('Endpoint Health', () => {
  it('Should be return status 200', async () => {
    const result = await request(app)
      .get(`${serverConfig['context']}/health`)
      .send();
    expect(result.status).toBe(200);
  });

  it('Should be return status up', async () => {
    const result = await request(app)
      .get(`${serverConfig['context']}/health`)
      .send();
    expect(result.body.status).toEqual('UP');
  });
});
