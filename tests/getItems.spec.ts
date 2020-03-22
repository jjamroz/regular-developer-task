var request = require('supertest');
import * as DatabaseProviderClass from '../server/database';
import { MockDatabaseProvider } from './mocks/MockDatabase';
var sinon = require('sinon');
import * as assert from 'assert';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name:
      'Krew, pot i piksele. Chwalebne i niepokojące opowieści o tym, jak robi się gry ',
    url:
      'https://www.empik.com/krew-pot-i-piksele-jak-powstaja-gry-wideo-schreier-jason,p1203623595,ksiazka-p',
    prize: 38.49
  }
];

const ID_VALIDATION_ERROR = {
  value: 'aaa',
  msg: 'Id needs to be a number!',
  param: 'id',
  location: 'params'
};

const NOT_FULL_PRODUCT_WITH_FAKE_PROPERTY = {
  prize: 69.4,
  xd: 'xd'
};

describe('API', function() {
  var server;
  var mockedDatabase;

  before(function() {
    mockedDatabase = sinon
      .stub(DatabaseProviderClass, 'DatabaseProvider')
      .callsFake(args => {
        return new MockDatabaseProvider({
          products: MOCK_PRODUCTS
        });
      });
    server = require('../server/server');
  });

  afterEach(function() {
    server.close();
  });

  it('should return correct product`s list', function testSlash(done) {
    request(server)
      .get('/products')
      .expect(200)
      .then(response => {
        assert.deepEqual(response.body, MOCK_PRODUCTS);
        done();
      });
  });

  it('should get one product by id', function testSlash(done) {
    request(server)
      .get('/products/1')
      .expect(200)
      .then(response => {
        assert.deepEqual(response.body, MOCK_PRODUCTS[0]);
        done();
      });
  });

  it('should not get one product by id - id not number', function testSlash(done) {
    request(server)
      .get('/products/aaa')
      .expect(400)
      .then(response => {
        const errors = response.body.errors;
        assert.deepEqual(errors.length, 1);
        assert.deepEqual(errors[0], ID_VALIDATION_ERROR);
        done();
      });
  });

  it('should delete one product by id', function testSlash(done) {
    request(server)
      .delete('/products/1')
      .expect(200)
      .then(response => {
        assert.deepEqual(
          response.body.message,
          'succesfully deleted product with id: 1'
        );
        done();
      });
  });

  it('should not delete one product by id - id not number', function testSlash(done) {
    request(server)
      .delete('/products/aaa')
      .expect(400)
      .then(response => {
        const errors = response.body.errors;
        assert.deepEqual(errors.length, 1);
        assert.deepEqual(errors[0], ID_VALIDATION_ERROR);
        done();
      });
  });

  it('should not add one product - empty object', function testSlash(done) {
    request(server)
      .post('/products/')
      .send({})
      .expect(400)
      .then(response => {
        const errors = response.body.errors;
        console.log(errors);
        assert.deepEqual(errors.length, 3);
        assert.deepEqual(errors[0], {
          msg: 'name is required',
          param: 'name',
          location: 'body'
        });
        assert.deepEqual(errors[1], {
          msg: 'url is required and has to be an URL',
          param: 'url',
          location: 'body'
        });
        assert.deepEqual(errors[2], {
          msg: 'prize is required and has to be decimal',
          param: 'prize',
          location: 'body'
        });
        done();
      });
  });

  it('should not add one product - wrong values', function testSlash(done) {
    request(server)
      .post('/products/')
      .send({ name: '', url: 'definatelyNotUrl', prize: 'expensive' })
      .expect(400)
      .then(response => {
        const errors = response.body.errors;
        console.log(errors);
        assert.deepEqual(errors.length, 3);
        assert.deepEqual(errors[0], {
          value: '',
          msg: 'name is required',
          param: 'name',
          location: 'body'
        });
        assert.deepEqual(errors[1], {
          value: 'definatelyNotUrl',
          msg: 'url is required and has to be an URL',
          param: 'url',
          location: 'body'
        });
        assert.deepEqual(errors[2], {
          value: 'expensive',
          msg: 'prize is required and has to be decimal',
          param: 'prize',
          location: 'body'
        });
        done();
      });
  });

  it('should add one product', function testSlash(done) {
    request(server)
      .post('/products/')
      .send({ name: 'product', url: 'google.com', prize: 500.0 })
      .expect(200)
      .then(response => {
        assert.deepEqual(response.body, MOCK_PRODUCTS[0]);
        done();
      });
  });

  it('should add one product - more properties', function testSlash(done) {
    request(server)
      .post('/products/')
      .send({
        name: 'product',
        url: 'google.com',
        prize: 500.0,
        illegalProperty: 'DO NOT ADD'
      })
      .expect(200)
      .then(response => {
        mockedDatabase.getCall();
        assert.deepEqual(response.body, MOCK_PRODUCTS[0]);
        done();
      });
  });
});
