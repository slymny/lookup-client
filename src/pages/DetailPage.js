import React, {useContext, useEffect} from 'react';
import DetailForecast from '../components/DetailForecast';
import CityContext from '../store/CityContext';
import axios from 'axios';
import {SpinnerCircularFixed} from 'spinners-react';
import styles from './DetailPage.module.css';
import ErrorAndLoadingContext from '../store/ErrorAndLoadingContext';

function DetailPage() {
  const {city, updateForecastDaily} = useContext(CityContext);
  const {isLoading, error, setError, changeIsLoading} = useContext(
    ErrorAndLoadingContext,
  );

  useEffect(() => {
    if (city) {
      axios(`https://lookup-weather-app.herokuapp.com/weather/forecast/${city}`)
        .then(res => {
          changeIsLoading(false);
          if (!res.data.error) {
            updateForecastDaily(res.data);
          } else {
            setError(res.data.error.message);
          }
        })
        .catch(err => {
          changeIsLoading(false);
          setError(err.message);
        });
    }
  }, []);

  if (error.includes('404')) {
    document.body.background = '#5580c9b2;';
    return (
      <div className={styles.error}>
        <h1>"City is not found!"</h1>
      </div>
    );
  } else if (error && !error.includes('404')) {
    return (
      <div className={styles.error}>
        <h1>"Oops! Something went wrong..."</h1>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className={styles.spinner}>
          <SpinnerCircularFixed
            size="20%"
            color="#5CA4FF"
            secondaryColor="#CDE9FF"
          />
        </div>
      ) : (
        <div>
          <DetailForecast />
        </div>
      )}
    </>
  );
}

export default DetailPage;
