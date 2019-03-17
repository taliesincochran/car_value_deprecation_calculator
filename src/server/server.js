const axios = require('axios');
const path = require('path');
const app = require('./');
// Just the server

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
const baseApiPath = 'https://vpic.nhtsa.dot.gov/api/vehicles/';
const filterResults = async (results, name) => {
  const newArray = await results.Results.map(result => result[name]);
  return newArray;
}
app.get('/api/makes', async (req, res) => {
  console.log('api/makes');
  await axios.get(`${baseApiPath}GetMakesForVehicleType/car?format=json`)
    .then(async (data) => {
      console.log(filterResults(data.data, 'MakeName'));
      const results = await filterResults(data.data, 'MakeName');
      res.send(results);
    })
    .catch((error) => {
      console.log(error);
      res.send(new Error(error));
    });
});
//       const newArray = [];
//       response.Response.forEach((make) => {
//         if (newArray.indexOf(make) === -1) {
//           newArray.push(make.MakeName);
//         }
//       });
//       return newArray;
//     })
//     .then((arr) => {
//       res.send(JSON.stringify(arr));
//     });
// });
app.get('/', (req, res) => {
  console.log('get/');
  res.send({ data: 'stop' });
});
