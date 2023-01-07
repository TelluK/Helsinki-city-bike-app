import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/journeys"> Journeys </Link>
      <Link to="/stations"> Stations </Link>
    </nav>
  );
};

export default Navbar;
