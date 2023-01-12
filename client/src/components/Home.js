import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const StyledButton = styled(Button)({
    backgroundColor: purple['500'],
    '&:hover': {
      backgroundColor: purple[700],
    },
    padding: '6px 12px',
    textTransform: 'none',
    fontSize: 16,
  });

  return (
    <Container>
      <Box sx={{ padding: 1 }}>
        <Typography variant="h3" align="left">
          City Bikes
        </Typography>
      </Box>
      <Box
        sx={{
          padding: 1,
          display: 'flex',
          justifyContent: 'left',
        }}
      >
        <Typography variant="body1" align="left" gutterBottom>
          <p>
            There are more than 400 city bike stations in Helsinki and Espoo.
          </p>
          <StyledButton
            variant="contained"
            onClick={() => navigate('/stations')}
          >
            Check bike stations
          </StyledButton>
          <p>Journeys page lists city bike journeys from 2021.</p>
          <StyledButton
            variant="contained"
            onClick={() => navigate('/journeys')}
          >
            To journeys
          </StyledButton>
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
