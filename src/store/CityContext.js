import React, {createContext, useState} from 'react';

const CityContext = createContext({
  forecastCurrent: null,
  updateForecastCurrent: forecast => {},
  forecastDaily: null,
  updateForecastDaily: forecast => {},
  city: '',
  updateCity: cityName => {},
  isClicked: '',
  changeIsClicked: str => {},
});

export function CityContextProvider(props) {
  const [city, setCity] = useState('');
  const [forecastCurrent, setForecastCurrent] = useState(null);
  const [forecastDaily, setForecastDaily] = useState(null);
  const [isClicked, setIsClicked] = useState('');

  function updateCityHandler(city) {
    setCity(city);
  }

  function updateForecastCurrentHandler(forecast) {
    setForecastCurrent(forecast);
  }

  function updateForecastDailyHandler(forecast) {
    setForecastDaily(forecast);
  }

  function isClickedHandler(str) {
    setIsClicked(str);
  }

  const context = {
    forecastCurrent,
    updateForecastCurrent: updateForecastCurrentHandler,
    forecastDaily: forecastDaily,
    updateForecastDaily: updateForecastDailyHandler,
    city,
    updateCity: updateCityHandler,
    isClicked,
    changeIsClicked: isClickedHandler,
  };

  return (
    <CityContext.Provider value={context}>
      {props.children}
    </CityContext.Provider>
  );
}

export default CityContext;
