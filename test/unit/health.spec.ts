const config = require('config');
import app from '../../src/app';
import request from 'supertest';

const { context } = config['server'];

describe('HEALTH', () => {
  it('Should be return status message UP and status code 200 in healthcheck', async (done) => {
    const { status, body } = await request(app)
      .get(`${context}/health`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send();
    expect(status).toBe(200);
    expect(body.status).toEqual('UP');
    done();
  });
});
