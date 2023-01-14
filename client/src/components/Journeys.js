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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Journeys = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [tableRowCount, setTableRowCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    getJourneys(pageNumber, rowsPerPage)
      .then((data) => {
        setJourneys(data.journeys);
        setTableRowCount(data.pagination.journeysCount);
      })
      .catch((error) => console.log('Error', error));
  }, [pageNumber, rowsPerPage]);

  const handlePageChange = (event, newpage) => {
    setPageNumber(newpage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  const convertMetersToKilometers = (meters) => {
    return meters / 1000;
  };

  const convertSecondsToMinutesAndSeconds = (timeInSeconds) => {
    let fullMinutes = Math.floor(timeInSeconds / 60);
    let remainingSeconds = timeInSeconds - fullMinutes * 60;
    let secondsText = remainingSeconds.toString();
    // return time in string minutes:seconds e.g. 6:06
    return `${fullMinutes}:${secondsText.padStart(2, 0)}`;
  };

  const dateAndTimeOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  // return date and time in format: day.month.year hour.minute.second
  const convertTimeString = (timeString) => {
    const date = new Date(timeString);
    return new Intl.DateTimeFormat('fi-FI', dateAndTimeOptions).format(date);
  };

  return (
    <Container>
      <Box sx={{ padding: 1 }}>
        <Typography variant="h4" align="left">
          Journeys
        </Typography>
      </Box>
      <TableContainer component={Paper} elevation={10}>
        <TablePagination
          page={pageNumber}
          tableRowCount={tableRowCount}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPage={rowsPerPage}
        />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Departure</TableCell>
              <TableCell align="left">Return</TableCell>
              <TableCell align="left">Departure station</TableCell>
              <TableCell align="left">Return station</TableCell>
              <TableCell align="right">Covered distance (km)</TableCell>
              <TableCell align="right">Duration (min)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {journeys.map((journey) => (
              <TableRow
                key={journey.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">
                  {convertTimeString(journey.departureTime)}
                </TableCell>
                <TableCell align="left">
                  {convertTimeString(journey.returnTime)}
                </TableCell>
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
                <TableCell align="right">
                  {convertMetersToKilometers(journey.coveredDistanceM)}
                </TableCell>
                <TableCell align="right">
                  {convertSecondsToMinutesAndSeconds(journey.durationSec)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          page={pageNumber}
          tableRowCount={tableRowCount}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPage={rowsPerPage}
        />
      </TableContainer>
    </Container>
  );
};

export default Journeys;
