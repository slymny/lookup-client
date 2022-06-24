import React, {useContext, useEffect, useState} from 'react';
import DetailForecast from '../components/DetailForecast';
import CityContext from '../store/CityContext';
import axios from 'axios';
import {SpinnerCircularFixed} from 'spinners-react';
import styles from './DetailPage.module.css';
import ErrorAndLoadingContext from '../store/ErrorAndLoadingContext';

function DetailPage() {
  const {city, updateForecastDaily} = useContext(CityContext);
  const {isLoading, error, setError, changeIsLoading} = useContext(ErrorAndLoadingContext);
  

  useEffect(() => {
    if (city) {
      axios(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY_WEATHER}&units=metric`,
      )
        .then(res => {
          updateForecastDaily(res.data);
          changeIsLoading(false);
        })
        .catch(err => {
          changeIsLoading(false);
          setError(err.message);
        });
    }
  }, []);

  if (error) {
    return (
      <div className={styles.error}>
        <h1>{error}</h1>
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
