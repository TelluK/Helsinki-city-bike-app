import axios from 'axios';
import { useState, useEffect } from 'react';

const getStations = (baseUrl) => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const App = () => {
  const [stations, setStations] = useState([]);
  const baseUrl = 'http://localhost:3001/api/stations';

  useEffect(() => {
    getStations(baseUrl)
      .then((stations) => setStations(stations))
      .catch((error) => console.log('Error', error));
  }, []);

  return (
    <div>
      <h2>List stations</h2>
      <div>
        {stations.map((s) => (
          <p>
            {s.FID} {s.ID} {s.Nimi} {s.Namn} {s.Name} {s.Osoite} {s.Kaupunki}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
