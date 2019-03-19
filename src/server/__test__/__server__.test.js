/* eslint-disable no-undef */
const request = require('supertest');
const regeneratorRuntime = require('regenerator-runtime/runtime');
// eslint-disable-next-line no-unused-vars
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('../router');

const initRouter = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded())
  app.use(router());
  return app;
};
/**
 * Testing the root path
 */

describe('Test the root path', () => {
  it('It should response the GET method', async (done) => {
    const app = initRouter();
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    done();
  });
  /**
  * Testing the GET all makes path
  */
  it('It should response the Post method', async (done) => {
    const app = initRouter();
    // const PORT = process.env.PORT || 8000;
    // app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
    const reqObj = {
      test: true,
      make: 'Dodge',
      model: 'Neon',
      year: 2005
    };
    await request(app)
      .post('/make')
      .set('Accept', 'application/json')
      .send({ body: { reqObj } })
      // eslint-disable-next-line consistent-return
      .expect(200)
      .then(() => {
        done();
      });
  });
});
