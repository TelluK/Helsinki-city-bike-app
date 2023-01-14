import axios from 'axios';
const baseUrl = `http://localhost:3001/api/stations`;

// get stations information from server, with pagination
export const getStations = (pageNumber, rowsPerPage) => {
  const url = `${baseUrl}?page=${pageNumber}&rowsPerPage=${rowsPerPage}`;
  const request = axios.get(url);
  return request.then((response) => response.data);
};

export const getSingleStation = (stationID) => {
  const request = axios.get(`http://localhost:3001/api/stations/${stationID}`);
  return request.then((response) => response.data);
};
