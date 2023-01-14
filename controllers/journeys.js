const journeysRouter = require('express').Router();
const Journey = require('../models/journey');

// get journeys from DB, with pagination
journeysRouter.get('/', async (request, response) => {
  const page = request.query.page || 0;
  const rowsPerPage = request.query.rowsPerPage || 15;
  const skipCount = page * rowsPerPage;
  const journeysCount = await Journey.estimatedDocumentCount({});
  const pageCount = journeysCount / rowsPerPage;
  const journeys = await Journey.find().skip(skipCount).limit(rowsPerPage);

  response.json({
    pagination: {
      journeysCount,
      pageCount,
    },
    journeys,
  });
});

// get journey stats for one station from database
journeysRouter.get('/:stationID', async (request, response) => {
  try {
    const stationID = request.params.stationID || 0;
    const numberOfJourneysStartingFromStation = await Journey.find({
      departureStationId: stationID,
    }).count();
    const numberOfJourneysEndingAtStation = await Journey.find({
      returnStationId: stationID,
    }).count();

    response.json({
      stats: {
        numberOfJourneysStartingFromStation,
        numberOfJourneysEndingAtStation,
      },
      stationID,
    });
  } catch (error) {
    console.log('Error:', error.message);
  }
});

journeysRouter.post('/', (request, response) => {
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

module.exports = journeysRouter;
