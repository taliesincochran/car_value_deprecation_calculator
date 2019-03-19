/* eslint-disable no-undef */
const request = require('supertest');
const moxios = require('moxios');
const axios = require('axios')
const app = require('../index.js');
/**
 * Testing the root path
 */
describe('Test the root path', () => {
  it('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    done();
  });
});

/**
 * Testing the GET all makes path
 */

/**
 * Testing the path to GET all models for a make by year
 */
describe('post /makes', () => {
  it('responds with json', async (done) => {
    const response = await request(app).post('/make', { make: 'Dodge', model: 'Neon', year: 2019 });
    expect(response).toMatchObject({ message: 'model found' });
    done();
  });
});
/**
 * Testing the 404 path

 */
describe('Test should return 404 on bad path', () => {
  it('It should return a 404 on any other path', async () => {
    const response = await request(app).get('/getMeADrink');
    expect(response.statusCode).toBe(404);
  });
});
