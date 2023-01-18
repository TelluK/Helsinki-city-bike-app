import axios from 'axios';
const baseUrl = `http://localhost:3001/api/stations`;

// get stations information from server, with pagination and search
export const getStations = (pageNumber, rowsPerPage, searchForName) => {
  const url = `${baseUrl}?page=${pageNumber}&rowsPerPage=${rowsPerPage}&searchForName=${searchForName}`;
  const request = axios.get(url);
  return request.then((response) => response.data);
};

export const getSingleStation = (stationID) => {
  const request = axios.get(`http://localhost:3001/api/stations/${stationID}`);
  return request.then((response) => response.data);
};

// search stations by name: get stations information from server
export const searchStationsByName = (stationNameString) => {
  const url = `${baseUrl}/search/${stationNameString}`;
  const request = axios.get(url);
  return request.then((response) => response.data);
};
