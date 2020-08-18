var chai = require('chai')
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

const should = chai.should();
let server = chai.request('http://localhost:3000');

describe('/GET fixtures', () => {
    it('it should GET all the fixtures', (done) => {
      server.get('/fixtures')
          .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('array');
                 res.body.length.should.eql(3);
            done();
          });
    });
});