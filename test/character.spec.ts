import request from 'supertest';
import app from '../src/app';

const config = require('config');

const serverConfig = config['server'];

describe('Endpoint Health', () => {
  it('Should be return status 200', async () => {
    const result = await request(app).get(`${serverConfig['context']}/character`).send();
    expect(result.status).toBe(200);
    expect(result.body).not.toBeNull();
  });
});
