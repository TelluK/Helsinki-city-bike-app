require('dotenv').config();
const express = require('express');
const app = express();
const Journey = require('./models/journey');
const Station = require('./models/station');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;
mongoose
  .connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message));

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.json('Hello from city bikes!');
});

const ITEMS_PER_PAGE = 15;

app.get('/api/stations', async (request, response) => {
  const page = request.query.page || 0;
  const skipCount = page * ITEMS_PER_PAGE;
  const stationsCount = await Station.estimatedDocumentCount({});
  const pageCount = stationsCount / ITEMS_PER_PAGE;
  const stations = await Station.find().skip(skipCount).limit(ITEMS_PER_PAGE);

  response.json({
    pagination: {
      stationsCount,
      pageCount,
    },
    stations,
  });
});

app.get('/api/journeys', async (request, response) => {
  const page = request.query.page || 0;
  const skipCount = page * ITEMS_PER_PAGE;
  const journeysCount = await Journey.estimatedDocumentCount({});
  const pageCount = journeysCount / ITEMS_PER_PAGE;
  const journeys = await Journey.find().skip(skipCount).limit(ITEMS_PER_PAGE);

  response.json({
    pagination: {
      journeysCount,
      pageCount,
    },
    journeys,
  });
});

app.post('/api/journeys', (request, response) => {
  console.log('post new journey');
  const body = request.body;

  const journey = new Journey({
    departureTime: body.departureTime,
    returnTime: body.returnTime,
    departureStationId: body.departureStationId,
    departureStationName: body.departureStationName,
    returnStationId: body.returnStationId,
    returnStationName: body.returnStationName,
    coveredDistanceM: body.coveredDistanceM,
    durationSec: body.durationSec,
  });

  journey
    .save()
    .then((savedJourney) => {
      response.json(savedJourney);
      console.log(`added new journey ${journey} `);
    })
    .catch((error) => console.log('Error:', error.message));
});

app.post('/api/stations', (request, response) => {
  console.log('post new station');
  const body = request.body;

  const station = new Station({
    FID: body.FID,
    ID: body.ID,
    Nimi: body.Nimi,
    Namn: body.Namn,
    Name: body.Name,
    Osoite: body.Osoite,
    Adress: body.Adress,
    Kaupunki: body.Kaupunki,
    Stad: body.Stad,
    Operaattor: body.Operaattor,
    Kapasiteet: body.Kapasiteet,
    x: body.x,
    y: body.y,
  });

  station
    .save()
    .then((savedStation) => {
      response.json(savedStation);
      console.log(`added new station ${station} `);
    })
    .catch((error) => console.log('Error:', error.message));
});

module.exports = app;
