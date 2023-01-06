import axios from 'axios';
import { useState, useEffect } from 'react';

const getStations = (baseUrl) => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const Stations = () => {
  const [stations, setStations] = useState([]);
  const baseUrl = 'http://localhost:3001/api/stations';

  useEffect(() => {
    getStations(baseUrl)
      .then((stations) => setStations(stations))
      .catch((error) => console.log('Error', error));
  }, []);

  return (
    <div>
      <h2>City Bike stations</h2>
      <table>
        <tbody>
          <tr>
            <th>Nimi</th>
            <th>Namn</th>
            <th>Name</th>
            <th>Osoite</th>
            <th>Kaupunki</th>
          </tr>
          {stations.map((s) => (
            <tr key={s.ID}>
              <td>{s.Nimi}</td>
              <td>{s.Namn}</td>
              <td>{s.Name}</td>
              <td>{s.Osoite}</td>
              <td>{s.Kaupunki}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stations;
