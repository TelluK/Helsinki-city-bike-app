import { useState, useEffect } from 'react';
import { getJourneys } from '../services/journeys';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from './TablePagination';
import { Link } from 'react-router-dom';

const Journeys = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [tableRowCount, setTableRowCount] = useState(0);
  const [journeys, setJourneys] = useState([]);
  const url = `http://localhost:3001/api/journeys?page=${pageNumber}`;

  useEffect(() => {
    getJourneys(url)
      .then((data) => {
        setJourneys(data.journeys);
        setTableRowCount(data.pagination.journeysCount);
      })
      .catch((error) => console.log('Error', error));
  }, [pageNumber]);

  const handlePageChange = (event, newpage) => {
    setPageNumber(newpage);
  };

  return (
    <Container>
      <h2>City Bike journeys</h2>
      <TableContainer component={Paper} elevation={10}>
        <TablePagination
          page={pageNumber}
          tableRowCount={tableRowCount}
          handlePageChange={handlePageChange}
        />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Departure time</TableCell>
              <TableCell align="left">Return time</TableCell>
              <TableCell align="left">Departure station</TableCell>
              <TableCell align="left">Return station</TableCell>
              <TableCell align="left">Covered distance (m)</TableCell>
              <TableCell align="left">Duration (s)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {journeys.map((journey) => (
              <TableRow
                key={journey.ID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{journey.departureTime}</TableCell>
                <TableCell align="left">{journey.returnTime}</TableCell>
                <TableCell align="left">
                  <Link to={`../stations/${journey.departureStationId}`}>
                    {journey.departureStationName}
                  </Link>
                </TableCell>
                <TableCell align="left">
                  <Link to={`../stations/${journey.returnStationId}`}>
                    {journey.returnStationName}
                  </Link>
                </TableCell>
                <TableCell align="left">{journey.coveredDistanceM}</TableCell>
                <TableCell align="left">{journey.durationSec}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          page={pageNumber}
          tableRowCount={tableRowCount}
          handlePageChange={handlePageChange}
        />
      </TableContainer>
    </Container>
  );
};

export default Journeys;
