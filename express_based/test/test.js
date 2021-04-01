const { expect } = require('chai');
const request = require('supertest');
const dotenv = require('dotenv');

dotenv.config();

const app = require('../server/app');

let server;

describe('Example test', () => {
  beforeEach(() => {
    server = app.listen(3000);
  });
  afterEach(done => {
    server.close(done);
  });
  it('example API', () =>
    request(server)
      .post('/api/v1/example')
      .then(res => {
        expect(res.status).to.equal(200);
      }));
});
