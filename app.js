const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.json('Hello from city bikes!');
});

module.exports = app;
