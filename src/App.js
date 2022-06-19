import React, {useContext} from 'react';
import Layout from './layout/Layout';
import {Routes, Route} from 'react-router-dom';
import CityContext from './store/CityContext';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';

function App() {
  const {city} = useContext(CityContext);

  return (
    <Layout>
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path={city} element={<DetailPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
