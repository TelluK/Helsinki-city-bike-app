import { Routes, Route } from 'react-router-dom';
import Journeys from './components/Journeys';
import Navbar from './components/Navbar';
import Stations from './components/Stations';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/journeys" element={<Journeys />} />
        <Route path="/stations" element={<Stations />} />
      </Routes>
    </>
  );
};

export default App;
