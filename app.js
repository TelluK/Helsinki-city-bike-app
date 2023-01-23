require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;
mongoose
  .connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message));

// express checks if build directory contains static files
app.use(express.static('build'));

const stationsRouter = require('./controllers/stations');
const journeysRouter = require('./controllers/journeys');
app.use(cors());
app.use(express.json());

app.use('/api/stations', stationsRouter);
app.use('/api/journeys', journeysRouter);

app.get('/', (request, response) => {
  response.json('Hello from city bikes!');
});

module.exports = app;
