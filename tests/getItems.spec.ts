
var request = require('supertest');
import * as DatabaseProviderClass from '../server/database';
import { MockDatabaseProvider } from './mocks/MockDatabase';
var sinon = require('sinon');
import * as assert from 'assert';

const MOCK_PRODUCTS = [{
    "id": 1,
    "name": "Krew, pot i piksele. Chwalebne i niepokojące opowieści o tym, jak robi się gry ",
    "url" : "https://www.empik.com/krew-pot-i-piksele-jak-powstaja-gry-wideo-schreier-jason,p1203623595,ksiazka-p",
    "prize" : 38.49
}];

describe('API', function () {
    var server;
    var mockedDatabase;
    
    before(function() {
        mockedDatabase = sinon.stub(DatabaseProviderClass, 'DatabaseProvider').callsFake((args) => {
            return new MockDatabaseProvider({
                products:  MOCK_PRODUCTS
            });
        });
        server = require('../server/server');
    });

    afterEach(function () {
        server.close();
    });

    it('should return correct product`s list', function testSlash(done) {
        request(server)
            .get('/products')
            .expect(200)
            .then(response => {
                assert.deepEqual(response.body, MOCK_PRODUCTS);
                done();
            })   
    });
});