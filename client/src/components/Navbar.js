import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
  const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  const StyledBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  return (
    <AppBar position={'static'}>
      <StyledToolbar>
        <StyledBox>
          <MenuItem component={Link} to="/">
            City Bikes
          </MenuItem>
          <MenuItem component={Link} to="/journeys">
            Journeys
          </MenuItem>
          <MenuItem component={Link} to="/stations">
            Stations
          </MenuItem>
        </StyledBox>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
