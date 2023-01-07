import { useState, useEffect } from 'react';
import { getJourneys } from '../services/journeys';

const Journeys = () => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [journeys, setJourneys] = useState([]);
  const url = `http://localhost:3001/api/journeys?page=${page}`;

  useEffect(() => {
    getJourneys(url)
      .then((data) => {
        setJourneys(data.journeys);
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
      <h2>City Bike journeys</h2>
      <table>
        <tbody>
          <tr>
            <th>Departure time</th>
            <th>Return time</th>
            <th>Departure station</th>
            <th>Return station</th>
            <th>Covered distance (m)</th>
            <th>Duration (s)</th>
          </tr>
          {journeys.map((journey) => (
            <tr key={journey.ID}>
              <td>{journey.departureTime}</td>
              <td>{journey.returnTime}</td>
              <td>{journey.departureStationName}</td>
              <td>{journey.returnStationName}</td>
              <td>{journey.coveredDistanceM}</td>
              <td>{journey.durationSec}</td>
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

export default Journeys;
