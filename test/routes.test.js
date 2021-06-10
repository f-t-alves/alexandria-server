let server = require('../server')
let chai = require('chai');
let chaiHttp = require("chai-http");
const { after } = require('mocha');

//Assertion
chai.should();
chai.use(chaiHttp);

describe('Integration Test', () => {
    it('Tests all the things', (doneAll) => {
        before(() => { console.log('Starting all tests') })
        beforeEach(() => { console.log('Starting a test') });
        afterEach(() => { console.log('Finishing a test') });
        after(() => { console.log('Finishing all tests') });

        describe('Connect to DB', () => {
            it('Just gets the connection part out of the metrics of the other tests', (done) => {
                chai
                    .request(server)
                    .get('/api/movie')
                    .end((err, response) => {
                        done();
                    })
        }).timeout(5000);
    })

    describe('GET test 1', () => {
        it('Test GET route /api/movie', (done) => {
            chai
                .request(server)
                .get('/api/movie')
                .end((err, response) => {
                    const first = response.body[0];
                    response.should.have.status(200);
                    first.should.be.a('object');
                    first.should.have.property('poster');
                    first.should.have.property('title');
                    done();
                })
        }).timeout(5000);
    })

    describe('GET test 2', () => {
        it('Test GET route /api/movie?genre=Comedy', (done) => {
            chai
                .request(server)
                .get('/api/movie?genre=Comedy')
                .end((err, response) => {
                    response.should.have.status(200);
                    const first = response.body[0];
                    first.should.be.a('object');
                    first.should.have.property('poster');
                    first.should.have.property('title');
                    done();
                })
        }).timeout(5000);
    })

    doneAll();
});
});