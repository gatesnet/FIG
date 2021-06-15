/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Init', () => {
  it('Check app status', (done) => {
    chai.request(server).get('/').end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});
