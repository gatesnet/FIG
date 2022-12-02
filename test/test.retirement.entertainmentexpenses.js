/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

let token;

describe('Test Entertainment Expenses API', () => {
  it('Should Test User login and get Token ID on /user/login POST', (done) => {
    chai.request(server)
      .post('/api/user/login')
      .send({
        email: 'api@figinvestment.com',
        password: 'FIG@^*135_0987',
      })
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        done();
      });
  });

  it('Should list Entertainment Expenses on /retirement/getentertainmentexpenses/:children/:concertsPlays/:sports/:outdoorRecreation/ GET', (done) => {
    chai.request(server)
      .get('/api/retirement/getentertainmentexpenses/1000/1000/1000/1000')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
