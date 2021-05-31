let server = require('../server')
let chai = require('chai');
let chaiHttp = require("chai-http");

//Assertion
chai.should();
chai.use(chaiHttp);

describe('Get random comedy movie', () => {
    beforeEach(() => {console.log('Starting a test')});
    afterEach(() => {console.log('Finishing a test')});

    describe('Test GET route /api/movie', () => {
        chai.request(server)
            .get('/api/movie')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('poster');
                response.body.should.have.property('title');
            })
    });
})