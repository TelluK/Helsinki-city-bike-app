const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
  departureTime: {
    type: String,
    required: true,
  },
  returnTime: {
    type: String,
    required: true,
  },
  departureStationId: {
    type: Number,
    required: true,
  },
  departureStationName: {
    type: String,
    required: true,
  },
  returnStationId: {
    type: Number,
    required: true,
  },
  returnStationName: {
    type: String,
    required: true,
  },
  coveredDistanceM: {
    type: Number,
    min: [10, 'Distance too short, min length is 10 meters.'],
    required: true,
  },
  durationSec: {
    type: Number,
    min: [10, 'Duration too short, min length is 10 sec.'],
    required: true,
  },
});

journeySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Journey', journeySchema);
