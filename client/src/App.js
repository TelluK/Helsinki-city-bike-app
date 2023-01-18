import { Routes, Route } from 'react-router-dom';
import Journeys from './components/Journeys';
import Navbar from './components/Navbar';
import Stations from './components/Stations';
import StationDetails from './components/StationDetails';
import Home from './components/Home';
import Footer from './components/Footer';

const App = () => {
  const gitHubUrl = 'https://github.com/TelluK/Helsinki-city-bike-app';
  const stationsDataInfoAndLicense =
    'https://www.avoindata.fi/data/en_GB/dataset/hsl-n-kaupunkipyoraasemat';
  const journeysDataInfoAndLicense =
    'https://www.avoindata.fi/data/en_GB/dataset/helsingin-ja-espoon-kaupunkipyorilla-ajatut-matkat';
  return (
    <div
      style={{
        textAlign: 'center',
        minHeight: '98vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journeys" element={<Journeys />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/stations/:id" element={<StationDetails />} />
      </Routes>
      <Footer
        stationsDataInfoAndLicense={stationsDataInfoAndLicense}
        journeysDataInfoAndLicense={journeysDataInfoAndLicense}
        gitHubUrl={gitHubUrl}
      />
    </div>
  );
};

export default App;
