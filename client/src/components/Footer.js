import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = (props) => {
  const { gitHubUrl, stationsDataInfoAndLicense, journeysDataInfoAndLicense } =
    props;

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        marginTop: 'auto',
        justifyContent: 'center',
      }}
    >
      <Box>
        <Typography variant="body1">
          View source code:
          <IconButton>
            <a href={gitHubUrl}>
              <GitHubIcon></GitHubIcon>
            </a>
          </IconButton>
        </Typography>

        <Typography variant="body1">
          <a href={stationsDataInfoAndLicense}>
            Stations: Helsinki Region Transport's (HSL) data information and
            license
          </a>
        </Typography>

        <Typography variant="body1">
          <a href={journeysDataInfoAndLicense}>
            Journeys: City Bike Finland's data information and license
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
