/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Test Submit Questionnaire API', () => {
  it('Should Test User login and get Token ID on /user/login POST', (done) => {
    chai.request(server)
      .post('/api/user/login')
      .send({
        email: 'gatesnet@gmail.com',
        password: 'Amman@123',
      })
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        done();
      });
  });

  it('Should submit questionnaire on /api/retirement/submitquestionnaire POST', (done) => {
    chai.request(server)
      .post('/api/retirement/submitquestionnaire')
      .send({
        answerid: '1',
        questionid: '1',
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});
