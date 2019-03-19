const axios = require('axios');
const app = require('./index');

// Just the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

app.get('/', (req, res) => {
  res.sendStatus(200);
});
app.post('/make', (req, res) => {
  console.log('post recieved', req.body);
  const { year, make, model } = req.body;
  const route = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelYear/${year}?format=json`;
  axios.get(route).then((data) => {
    console.log(data.data);
    let models;
    if (data.data.Results.length === 0) {
      models = [];
    } else {
      models = data.data.Results.map(modelObject => modelObject.Make_Name.toLowerCase());
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
