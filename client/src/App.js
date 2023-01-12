import { Routes, Route } from 'react-router-dom';
import Journeys from './components/Journeys';
import Navbar from './components/Navbar';
import Stations from './components/Stations';
import StationDetails from './components/StationDetails';
import Home from './components/Home';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journeys" element={<Journeys />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/stations/:id" element={<StationDetails />} />
      </Routes>
    </>
  );
};

export default App;
