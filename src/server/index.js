const express = require('express');
const cors = require('cors');
// Set up app and export it so that we can run it and test it at the same time.
const app = express();

app.use(express.static('dist'));
app.use(cors());

module.exports = app;
