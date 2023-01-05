require('dotenv').config();
const { parse } = require('csv-parse');
const fs = require('fs');
const Station = require('./models/station');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// csvFiles folder has to contain this csv file:
const stationsFileName = 'bikeStations.csv';

const url = process.env.MONGODB_URI;
mongoose
  .connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message));

const parseStationCsvAndInsertDataToDb = async (csvFile) => {
  console.log('Parsing stations csv file:', csvFile);

  let stationsData = [];

  const parser = parse({
    delimiter: ',',
    from_line: 2,
    columns: [
      'FID',
      'ID',
      'Nimi',
      'Namn',
      'Name',
      'Osoite',
      'Adress',
      'Kaupunki',
      'Stad',
      'Operaattor',
      'Kapasiteet',
      'x',
      'y',
    ],
  });

  fs.createReadStream(__dirname + '/csvFiles/' + csvFile)
    .pipe(parser)
    .on('data', (data) => {
      if (data.FID >= 111 && data.FID <= 457) {
        data.Kaupunki = 'Helsinki';
        data.Stad = 'Helsingfors';
      }
      const station = new Station(data);
      stationsData.push(station);
    })
    .on('error', (error) => {
      throw error.message;
    })
    .on('end', async () => {
      await Station.insertMany(stationsData)
        .then(() => console.log('Added stations to db from file:', csvFile))
        .catch((error) => console.log('Error on adding stations to db', error));
    });
};

const checkIfStationsInDbEmpty = async () => {
  // if collection is empty, findOne({}) returns null
  const one = await Station.findOne({});
  console.log('Did it find one station: ', one);
  return one;
};

const readStationFile = async () => {
  let value = await checkIfStationsInDbEmpty();

  if (value === null) {
    parseStationCsvAndInsertDataToDb(stationsFileName);
  } else {
    console.log('DB allready has station content, not reading file to DB.');
  }
};

readStationFile();
