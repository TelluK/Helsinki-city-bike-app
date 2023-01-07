import { useState, useEffect } from 'react';
import { getStations } from '../services/stations';

const Stations = () => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [stations, setStations] = useState([]);
  const url = `http://localhost:3001/api/stations?page=${page}`;

  useEffect(() => {
    getStations(url)
      .then((data) => {
        setStations(data.stations);
        setPageCount(Math.ceil(data.pagination.pageCount));
      })
      .catch((error) => console.log('Error', error));
  }, [page]);

  const handlePrevious = () => {
    setPage((page) => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  const handleNext = () => {
    setPage((page) => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

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
      <div>
        <br />
        On page: {page}
        <br />
        Total page count: {pageCount}
        <br />
      </div>
      <div>
        <button disabled={page === 1} onClick={handlePrevious}>
          Previous page
        </button>
        <button disabled={page === pageCount} onClick={handleNext}>
          Next page
        </button>
      </div>
    </div>
  );
};

export default Stations;
