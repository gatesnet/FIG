/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

let token;

describe('Test Home Expenses API', () => {
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

  it('Should list Home Expenses on /retirement/gethomeexpenses/:mortgageRent/:rentalInsurance/:electricity/:gasOil/:waterSewarTrash/:internetPhone/:vacationCabelSatellite/:realEstateTaxes/:furnishingAppliances/:lawnGarden/:maintenanceImprovments/:other GET', (done) => {
    chai.request(server)
      .get('/api/retirement/gethomeexpenses/1000/0/0/0/0/1000/0/0/0/500/200/0')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
