import React, {createContext, useState} from 'react';

const CityContext = createContext({
  forecastCurrent: null,
  updateForecastCurrent: forecast => {},
  forecastDaily: null,
  updateForecastDaily: forecast => {},
  city: '',
  updateCity: cityName => {},
});

export function CityContextProvider(props) {
  const [city, setCity] = useState('');
  const [forecastCurrent, setForecastCurrent] = useState(null);
  const [forecastDaily, setForecastDaily] = useState(null);

  function updateCityHandler(city) {
    setCity(city);
  }

  function updateForecastCurrentHandler(forecast) {
    setForecastCurrent(forecast);
  }

  function updateForecastDailyHandler(forecast) {
    setForecastDaily(forecast);
  }

  const context = {
    forecastCurrent,
    updateForecastCurrent: updateForecastCurrentHandler,
    forecastDaily: forecastDaily,
    updateForecastDaily: updateForecastDailyHandler,
    city,
    updateCity: updateCityHandler,
  };

  return (
    <CityContext.Provider value={context}>
      {props.children}
    </CityContext.Provider>
  );
}

export default CityContext;
