import React, {createContext, useState} from 'react';

const CityContext = createContext({
  forecast: {},
  updateForecast: forecast => {},
  city: '',
  updateCity: cityName => {},
  cityImage: '',
  changeCityImage: image => {},
});

export function CityContextProvider(props) {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState(null);
  const [cityImage, setCityImage] = useState('');

  function updateCityHandler(city) {
    setCity(city);
  }

  function updateForecastHandler(forecast) {
    setForecast(forecast);
  }

  function cityImageHandler(image) {
    setCityImage(image);
  }

  const context = {
    forecast,
    updateForecast: updateForecastHandler,
    city,
    updateCity: updateCityHandler,
    cityImage,
    changeCityImage: cityImageHandler,
  };

  return (
    <CityContext.Provider value={context}>
      {props.children}
    </CityContext.Provider>
  );
}

export default CityContext;
