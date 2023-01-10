import { Routes, Route } from 'react-router-dom';
import Journeys from './components/Journeys';
import Navbar from './components/Navbar';
import Stations from './components/Stations';
import StationDetails from './components/StationDetails';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/journeys" element={<Journeys />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/stations/:id" element={<StationDetails />} />
      </Routes>
    </>
  );
};

export default App;
