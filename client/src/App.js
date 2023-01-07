import { Routes, Route } from 'react-router-dom';
import Journeys from './components/Journeys';
import Stations from './components/Stations';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/journeys" element={<Journeys />} />
        <Route path="/stations" element={<Stations />} />
      </Routes>
    </>
  );
};

export default App;
