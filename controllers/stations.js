const stationsRouter = require('express').Router();
const Station = require('../models/station');

const ITEMS_PER_PAGE = 15;

stationsRouter.get('/', async (request, response) => {
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

// get single station information from DB
stationsRouter.get('/:id', async (request, response) => {
  const stationID = request.params.id;
  const station = await Station.findOne({ ID: stationID }).exec();

  response.json(station);
});

stationsRouter.post('/', (request, response) => {
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

module.exports = stationsRouter;
