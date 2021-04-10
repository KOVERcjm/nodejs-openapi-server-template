const { expect } = require('chai');
const request = require('supertest')('http://localhost:3000');

require('../server/app');

describe('Example API test', () => {
  it('should return 200', done => {
    request.post('/api/v1/example').end((err, res) => {
      expect(res.status).to.equal(200);
      done();
    });
  });
});
