import app from '../../src/app';
import request from 'supertest';

const pjson = require('../../package.json');

describe('APP SERVER', () => {
  it('Should be return status code 200 and welcome message in root', async (done) => {
    const { status, text } = await request(app).get(`/`).send();
    expect(status).toBe(200);
    expect(text).toEqual(`Welcome to server express - v${pjson['version']}`);
    done();
  });
});
