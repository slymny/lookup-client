import React, {useContext, useEffect} from 'react';
import CityContext from '../store/CityContext';
import MainForecast from '../components/MainForecast';
import useFetch from '../hooks/useFetch';

function MainPage() {
  const {city, forecastCurrent, updateForecastCurrent, updateCity} =
    useContext(CityContext);

  return (
    <div>
      <MainForecast />
    </div>
  );
}

export default MainPage;
