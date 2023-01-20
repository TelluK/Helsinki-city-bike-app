import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getSingleStation } from '../services/stations';
import { getJourneyStatsForStation } from '../services/journeys';

const StationDetails = () => {
  const [station, setStation] = useState({});
  const [stats, setStats] = useState({});
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

    getJourneyStatsForStation(stationID).then((data) => {
      setStats(data.stats);
    });
  }, []);

  const statsText = (value) => {
    const textsBeforeStatResults = [
      `Making calculations... please wait a few seconds`,
    ];
    const textsWithStatResults = [
      `- starting from the station: ${stats.numberOfJourneysStartingFromStation}`,
      `- ending at the station: ${stats.numberOfJourneysEndingAtStation}`,
    ];
    return value ? textsWithStatResults : textsBeforeStatResults;
  };

  return (
    <Container>
      <Box sx={{ padding: 1 }}>
        <Typography variant="h4" align="left">
          {station.Name}
        </Typography>
      </Box>
      <List dense={false}>
        <ListItem>
          <ListItemText primary={`Station name: ${station.Name}`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Address: ${station.Osoite} ${station.Kaupunki}`}
          />
        </ListItem>
      </List>
      <Box sx={{ padding: 1 }}>
        <Typography variant="h5" align="left">
          Number of journeys:
        </Typography>
        <List dense={false}>
          {statsText(stats.numberOfJourneysStartingFromStation).map((value) => {
            return (
              <ListItem>
                <ListItemText primary={value} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Container>
  );
};

export default StationDetails;
