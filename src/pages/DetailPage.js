import React, {useContext, useEffect} from 'react';
import DetailForecast from '../components/DetailForecast';
import CityContext from '../store/CityContext';
import axios from 'axios';
import ErrorAndLoadingContext from '../store/ErrorAndLoadingContext';
import ErrorHandling from '../components/ErrorHandling';
import LoadingHandling from '../components/LoadingHandling';

function DetailPage() {
  const {city, updateForecastDaily} = useContext(CityContext);
  const {isLoading, error, setError, changeIsLoading} = useContext(
    ErrorAndLoadingContext,
  );

  useEffect(() => {
    if (city) {
      (async () => {
        try {
          const weatherData = await axios(
            `https://lookup-weather-app.herokuapp.com/weather/forecast/${city}`,
          );
          changeIsLoading(false);
          if (weatherData.data.error) {
            setError(weatherData.data.error.message);
          } else {
            updateForecastDaily(weatherData.data);
          }
        } catch (err) {
          changeIsLoading(false);
          setError(err.message);
        }
      })();
    }
  }, []);

  if (error.includes('404')) return <ErrorHandling msg="City is not found!" />;
  else if (error) return <ErrorHandling msg="Oops! Something went wrong..." />;

  return <div>{isLoading ? <LoadingHandling /> : <DetailForecast />}</div>;
}

export default DetailPage;
