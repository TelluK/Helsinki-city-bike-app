import axios from 'axios';

// get journeys information from server
export const getJourneys = (url) => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};
