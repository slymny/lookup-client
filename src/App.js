import React, {useContext, useEffect} from 'react';
import Layout from './layout/Layout';
import {Routes, Route, useNavigate} from 'react-router-dom';
import CityContext from './store/CityContext';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import LandingPage from './pages/LandingPage';

function App() {
  const {city} = useContext(CityContext);
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/weather" element={<MainPage />} />
        <Route path={`/${city}`} element={<DetailPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
