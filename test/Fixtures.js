var chai = require('chai')
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

const should = chai.should();
const fakeFixture = require ('./data/fixture.json')

let server = chai.request('http://localhost:3000'); 
// one of the very first changes to the code would be to extract the above value into some configuration file, the reason it's not done is because
// we'd normally be able to share this config with the main application


describe('GET fixtures', () => {
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

describe('POST fixture',() => {
  it('can add a fixture', (done) => {
    server.post('/fixture').send(fakeFixture).end((err, res) => {
      res.should.have.status(200);
      done();                             
    });
  }).timeout(7000);

  it('can retrieve the new fixture', (done) => {
    server.get(`/fixture/${fakeFixture.fixtureId}`).end((err, res) => {
      res.body.should.deep.equal(fakeFixture);
      res.should.have.status(200);
      done();                             
    });
  })  

  after((done) => {
    server.delete(`/fixture/${fakeFixture.fixtureId}`).end((err, res) => {
      done();                             
    });
  })
})

describe('DELETE fixture',() => { 
  it('can delete a fixture', async () => {
    res = await server.post('/fixture').send(fakeFixture);
    res.should.have.status(200);
    res = await server.get(`/fixture/${fakeFixture.fixtureId}`);
    res.should.have.status(200);

    res = await server.delete(`/fixture/${fakeFixture.fixtureId}`);
    res.should.have.status(200);

    res = await server.get(`/fixture/${fakeFixture.fixtureId}`);
    res.should.have.status(404);
    res.text.should.equal("Fixture not found");
  }).timeout(7000);
})

