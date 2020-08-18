var chai = require('chai')
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

const should = chai.should();
let server = chai.request('http://localhost:3000'); 
// one of the very first changes to the code would be to extract the above value into some configuration file

describe('/GET fixtures', () => {
    it('it should GET all the fixtures', (done) => {
      server.get('/fixtures').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.eql(3);
        done();
      });
    });

    it('fixture one should have an id', (done) => {
      server.get('/fixtures').end((err, res) => {
        res.body[0].fixtureId.should.exist; // i do not know the proper boundries for a valid fixture id so
        done();                             // i'm only checking it's not null or underfined   
      });
    });

    it('fixture two should have an id', (done) => {
      server.get('/fixtures').end((err, res) => {
        res.body[1].fixtureId.should.exist; // i do not know the proper boundries for a valid fixture id so
        done();                             // i'm only checking it's not null or underfined   
      });
    });
    
    it('fixture three should have an id', (done) => {
      server.get('/fixtures').end((err, res) => {
        res.body[2].fixtureId.should.exist; // i do not know the proper boundries for a valid fixture id so
        done();                             // i'm only checking it's not null or underfined   
      });
    });
});