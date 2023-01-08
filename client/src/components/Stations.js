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
import TablePagination from './TablePagination';

const Stations = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [tableRowCount, setTableRowCount] = useState(0);
  const [stations, setStations] = useState([]);
  const url = `http://localhost:3001/api/stations?page=${pageNumber}`;

  useEffect(() => {
    getStations(url)
      .then((data) => {
        setStations(data.stations);
        setTableRowCount(data.pagination.stationsCount);
      })
      .catch((error) => console.log('Error', error));
  }, [pageNumber]);

  const handlePageChange = (event, newpage) => {
    setPageNumber(newpage);
  };

  return (
    <div>
      <Container>
        <h2>City Bike stations</h2>
        <TableContainer component={Paper} elevation={10}>
          <TablePagination
            page={pageNumber}
            tableRowCount={tableRowCount}
            handlePageChange={handlePageChange}
          />
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
          <TablePagination
            page={pageNumber}
            tableRowCount={tableRowCount}
            handlePageChange={handlePageChange}
          />
        </TableContainer>
      </Container>
    </div>
  );
};

export default Stations;
