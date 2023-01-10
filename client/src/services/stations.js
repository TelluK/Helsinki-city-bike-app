import axios from 'axios';

// get stations information from server
export const getStations = (url) => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

export const getSingleStation = (stationID) => {
  const request = axios.get(`http://localhost:3001/api/stations/${stationID}`);
  return request.then((response) => response.data);
};
