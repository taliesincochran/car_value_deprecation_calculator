const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router');
// Set up app and export it so that we can run it and test it at the same time.
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(router());

// Just the server
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

module.exports = app;
