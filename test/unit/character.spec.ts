const config = require('config');
import app from '../../src/app';
import request from 'supertest';

const { context } = config['server'];

describe('Endpoint Character', () => {
  it('Should be return 200 and all characters', async () => {
    const result = await request(app).get(`${context}/character`).send();
    expect(result.status).toBe(200);
    expect(result.body).not.toBeNull();
  });

  it('Should dont be return status 200', async () => {
    const result = await request(app).get(`${context}/character?name=asdsa`).send();
    expect(result.status).not.toBe(200);
  });
});
