/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

let token;
let userId;

describe('TEST User API', () => {
  it('Should register test user Expenses on /user/register POST', (done) => {
    chai.request(server)
      .post('/api/user/register')
      .send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: 'testtest',
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('Should Test User login and get Token ID on /user/login POST', (done) => {
    chai.request(server)
      .post('/api/user/login')
      .send({
        email: 'test@test.com',
        password: 'testtest',
      })
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        done();
      });
  });

  it('Should get test User ID on /user/getuserid/:email GET', (done) => {
    chai.request(server)
      .get('/api/user/getuserid/test@test.com')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        userId = res.body.message[0].user_id;
        res.should.have.status(200);
        done();
      });
  });

  it('Should delete test User by ID on /user/delete/:id DELETE', (done) => {
    chai.request(server)
      .delete(`/api/user/delete/${userId}`)
    // .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
