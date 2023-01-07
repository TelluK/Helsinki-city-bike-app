import axios from 'axios';

// get stations information from server
export const getStations = (url) => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};
