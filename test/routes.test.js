let server = require('../server')
let chai = require('chai');
let chaiHttp = require("chai-http");

require('readyness/wait/mocha');

//Assertion
chai.should();
chai.use(chaiHttp);

var connectionChecked = require('readyness').waitFor('../routes/routes.js');

describe('Get random comedy movie', () => {
    describe('Test GET route /api/movie', (done) => {
        chai.request(server)
            .get('/api/movie')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('poster');
                response.body.should.have.property('title');
                done();
            })
    })
})