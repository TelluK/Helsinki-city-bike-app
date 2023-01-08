import { useState, useEffect } from 'react';
import { getStations } from '../services/stations';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
      <Container>
        <h2>City Bike stations</h2>
        <TableContainer component={Paper} elevation={10}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nimi</TableCell>
                <TableCell align="left">Namn</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Osoite</TableCell>
                <TableCell align="left">Kaupunki</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stations.map((station) => (
                <TableRow
                  key={station.ID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{station.Nimi}</TableCell>
                  <TableCell align="left">{station.Namn}</TableCell>
                  <TableCell align="left">{station.Name}</TableCell>
                  <TableCell align="left">{station.Osoite}</TableCell>
                  <TableCell align="left">{station.Kaupunki}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
      </Container>
    </div>
  );
};

export default Stations;
