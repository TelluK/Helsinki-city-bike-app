import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { getSingleStation } from '../services/stations';

const StationDetails = () => {
  const [station, setStation] = useState({});
  const params = useParams();
  // get stationID from current URL, using useParams hook
  const stationID = params.id;
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      // if location state does not have single station information, fetch data from DB
      getSingleStation(stationID).then((data) => {
        setStation(data);
      });
    } else if (location.state.station) {
      setStation(location.state.station);
    }
  }, []);

  return (
    <Container>
      <h2>{`City Bike station: ${station.Nimi}`}</h2>
      <List dense={false}>
        <ListItem>
          <ListItemText primary={`Nimi: ${station.Nimi}`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Osoite: ${station.Osoite} ${station.Kaupunki}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Namn: ${station.Namn}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Adress: ${station.Adress} ${station.Stad}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Name: ${station.Name}`} />
        </ListItem>
      </List>
    </Container>
  );
};

export default StationDetails;
