import request from 'supertest';
import app from '../src/app';

const config = require('config');

const serverConfig = config['server'];

describe('Endpoint Health', () => {
  it('Should be return 200 and characters', async () => {
    const result = await request(app).get(`${serverConfig['context']}/character`).send();
    expect(result.status).toBe(200);
    expect(result.body).not.toBeNull();
  });

  it('Should dont be return status 200', async () => {
    const result = await request(app).get(`${serverConfig['context']}/character?name=asdsa`).send();
    expect(result.status).not.toBe(200);
  });
});
