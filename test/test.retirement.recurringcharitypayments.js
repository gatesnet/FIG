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
        email: 'api@figinvestment.com',
        password: 'FIG@^*135_0987',
      })
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        done();
      });
  });

  it('Should list Recurring Charity Payments on /getrecurringcharitypayments/:yearsUntilCharityPaymentsStart/:lengthOfCharityPayments/:frequencyOfPayments/:valueOfSinglePayment/:currentBalance//:inflationAssumption/:freuencyOfContributionToPortfolio GET', (done) => {
    chai.request(server)
      .get('/api/retirement/getrecurringcharitypayments/3/5/monthly/1000/3000/5/annual')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
