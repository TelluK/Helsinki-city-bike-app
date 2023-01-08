const journeysRouter = require('express').Router();
const Journey = require('../models/journey');

const ITEMS_PER_PAGE = 15;

journeysRouter.get('/', async (request, response) => {
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
