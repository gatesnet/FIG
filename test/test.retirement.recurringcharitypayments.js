/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

let token;

describe('Test Recurring Charity Payments API', () => {
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

  it('Should list Recurring Charity Payments on /getrecurringcharitypayments/:yearsUntilCharityPaymentsStart/:lengthOfCharityPayments/:frequencyOfPayments/:valueOfSinglePayment/:currentBalance/:expectedReturn/:inflationAssumption GET', (done) => {
    chai.request(server)
      .get('/api/retirement/getrecurringcharitypayments/6/4/Monthly/1500/3000/.05/.02')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
