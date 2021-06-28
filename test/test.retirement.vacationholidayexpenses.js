/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

let token;

describe('Test Vacation Holiday Expenses API', () => {
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

  it('Should list Vacation Holiday Expenses on /retirement/getvacationholidayexpenses/:airfare/:accommodations/:food/:souvenirs/:rentalCar/:other GET', (done) => {
    chai.request(server)
      .get('/api/retirement/getvacationholidayexpenses/1000/1000/1000/1000/1000/1000')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
