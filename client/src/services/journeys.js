import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/journeys';

// get journeys information from server
export const getJourneys = (url) => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

// get journey stats for one station from server
export const getJourneyStatsForStation = (stationID) => {
  const url = `${baseUrl}/${stationID}`;
  const request = axios.get(url);
  return request.then((response) => response.data);
};
