/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

let token; '';

describe('Test Future Purchase Calculator API', () => {
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

  it('Should list  Future Purchase Calculator on /getfuturepurchasecalculator/:startDateOfInvestmentHorizon/:endDateOfInvestmentHorizon/:depositRate/:frequencyOfDepositRate/:purchaseCost/:currentBalance/:expectedNominalReturnDuringInvestmentHorizon/:inflationAssumptionDuringInvestmentHorizon GET', (done) => {
    chai.request(server)
      .get('/api/retirement/getfuturepurchasecalculator/2021%2F11%2F16/2021%2F05%2F08/.2/1000/100000/30000/.05/.02')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
