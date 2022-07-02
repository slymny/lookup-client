import React, {useContext, useEffect, useState} from 'react';
import CityContext from '../store/CityContext';
import MainForecast from '../components/MainForecast';
import axios from 'axios';
import ErrorHandling from '../components/ErrorHandling';
import LoadingHandling from '../components/LoadingHandling';

function LandingPage() {
  const {updateForecastCurrent, updateCity} = useContext(CityContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const locationRes = await axios('http://ip-api.com/json/');
        const location = locationRes.data.city;
        updateCity(location);
        const weatherRes = await axios(
          `https://lookup-weather-app.herokuapp.com/${location}`,
        );
        setIsLoading(false);
        if (!weatherRes.data.error) {
          updateForecastCurrent(weatherRes.data.data);
          const bgImage = weatherRes.data.image;
          if (bgImage) document.body.background = bgImage;
        } else {
          setError(weatherRes.data.error.message);
        }
      } catch (err) {
        setError(err.message);
        console.log(err);
        setIsLoading(false);
      }
    })();
  }, []);

  if (error) return <ErrorHandling msg="Please enter a city name!" />;

  return (
    <div>
      {isLoading ? <LoadingHandling /> 
      : <MainForecast />}
    </div>
  );
}

export default LandingPage;
