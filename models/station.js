const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  FID: {
    type: Number,
    required: true,
  },
  ID: {
    type: Number,
    required: true,
  },
  Nimi: {
    type: String,
    required: true,
  },
  Namn: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Osoite: {
    type: String,
    required: true,
  },
  Adress: {
    type: String,
    required: true,
  },
  Kaupunki: {
    type: String,
  },
  Stad: {
    type: String,
  },
  Operaattor: {
    type: String,
  },
  Kapasiteet: {
    type: Number,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
});

stationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Station', stationSchema);
