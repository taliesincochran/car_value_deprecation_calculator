/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../index.js');
/**
 * Testing the root path
 * @returns {void}
 */
describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    done();
  });
});

/**
 * Testing the GET all makes path
 * @returns {void}
 */
describe('Test the "makes" path', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(app).get('/api/makes');
    expect(response.statusCode).toBe(200);
    expect(response).toMatchObject({Make_Name: 'Toyota'});
  });
});

/**
 * Testing the path to GET all models for a make by year
 * @returns {void}
 */
describe('get /models/mazda/2018', () => {
  it('responds with json', async () => {
    const response = await request(app).get('/api/make/mazda/year/2018');
    expect(response.statusCode).toBe(200);
    expect(response).toMatchObject({ Make_Name: 'MX-5'})
  });
});
/**
 * Testing the 404 path
 * @returns {void}
 */
describe('Test should return 404 on bad path', () => {
  test('It should return a 404 on any other path', async () => {
    const response = await request(app).get('/getMeADrink');
    expect(response.statusCode).toBe(404);
  });
});
