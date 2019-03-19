const axios = require('axios');
const { Router } = require('express');

module.exports = (router = new Router()) => {
  router.get('/', (req, res) => {
    res.sendStatus(200);
  });
  /**
   * Check to see if the make/model exists, if not, catch the error and return a fail statement.
   */
  router.post('/make', (req, res) => {
    console.log('post recieved', req.body);
    const { year, make, model } = req.body;
    const route = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelYear/${year}?format=json`;
    if (req.body.test) {
      res.sendStatus(200);
    }
    axios.get(route).then((data) => {
      console.log(data.data);
      let models;
      if (data.data.Results.length > 0) {
        models = data.data.Results.map(modelObject => modelObject.Make_Name.toLowerCase());
      } else {
        models = [];
      }
      return models;
    }).then((models) => {
      if (models.indexOf(model.toLowerCase() !== -1)) {
        console.log('model found');
        res.send({ message: 'model found' });
      } else {
        console.log({ message: 'model not found' });
        res.send(404);
      }
    }).catch((err) => {
      console.log('error', err);
      res.send(err);
    });
  });
  router.get('*', (req, res) => {
    res.send(404);
  });
  return router;
};
