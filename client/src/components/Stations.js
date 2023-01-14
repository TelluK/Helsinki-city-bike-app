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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Stations = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [tableRowCount, setTableRowCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    getStations(pageNumber, rowsPerPage)
      .then((data) => {
        setStations(data.stations);
        setTableRowCount(data.pagination.stationsCount);
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

  return (
    <div>
      <Container>
        <Box sx={{ padding: 1 }}>
          <Typography variant="h4" align="left">
            Stations
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
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stations.map((station) => (
                <TableRow
                  key={station.ID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    <Link to={`${station.ID}`} state={{ station: station }}>
                      {station.Name}
                    </Link>
                  </TableCell>
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
            handleRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPage={rowsPerPage}
          />
        </TableContainer>
      </Container>
    </div>
  );
};

export default Stations;
