require('dotenv').config();
const { parse } = require('csv-parse');
const fs = require('fs');
const { finished } = require('stream/promises');

const Journey = require('./models/journey');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// csvFiles folder has to contain these csv files:
const journeyFileName1 = '2021-05.csv';
const journeyFileName2 = '2021-06.csv';
const journeyFileName3 = '2021-07.csv';

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message));

const parseJourneyCsvAndInsertDataToDb = async (csvFile) => {
  console.log('Parsing journey csv file:', csvFile);

  let validJourneys = [];

  const parser = parse({
    delimiter: ',',
    from_line: 2,
    columns: [
      'departureTime',
      'returnTime',
      'departureStationId',
      'departureStationName',
      'returnStationId',
      'returnStationName',
      'coveredDistanceM',
      'durationSec',
    ],
  });

  const parserStream = fs
    .createReadStream(__dirname + '/csvFiles/' + csvFile)
    .pipe(parser)
    .on('data', (data) => {
      if (data.durationSec >= 10 && data.coveredDistanceM >= 10) {
        const journey = new Journey({
          departureTime: data.departureTime,
          returnTime: data.returnTime,
          departureStationId: data.departureStationId,
          departureStationName: data.departureStationName,
          returnStationId: data.returnStationId,
          returnStationName: data.returnStationName,
          coveredDistanceM: data.coveredDistanceM,
          durationSec: data.durationSec,
        });

        validJourneys.push(journey);
      }
    })
    .on('error', (error) => {
      throw error.message;
    });

  await finished(parserStream);
  return Journey.insertMany(validJourneys);
};

const checkIfJourneysInDbEmpty = async () => {
  // if collection is empty, findOne({}) returns null
  const one = await Journey.findOne({});
  console.log('Did it find one journey: ', one);
  return one;
};

const readJourneyFiles = async () => {
  try {
    let value = await checkIfJourneysInDbEmpty();

    if (value === null) {
      await parseJourneyCsvAndInsertDataToDb(journeyFileName1);
      console.log('Response1');
      await parseJourneyCsvAndInsertDataToDb(journeyFileName2);
      console.log('Response2');
      await parseJourneyCsvAndInsertDataToDb(journeyFileName3);
      console.log('Response3');
    } else {
      console.log('DB allready has journey content, not reading files to DB.');
    }
  } catch (error) {
    console.log('Error:', error);
  }
};

readJourneyFiles();
