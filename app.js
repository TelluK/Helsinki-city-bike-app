require('dotenv').config();
const express = require('express');
const app = express();
const Journey = require('./models/journey');
const Station = require('./models/station');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;
mongoose
  .connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message));

app.use(express.json());

app.get('/', (request, response) => {
  response.json('Hello from city bikes!');
});

app.get('/api/stations', (request, response) => {
  Station.find()
    .limit(3)
    .then((station) => {
      response.json(station);
    });
});

app.get('/api/journeys', (request, response) => {
  Journey.find()
    .limit(3)
    .then((journey) => {
      response.json(journey);
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
