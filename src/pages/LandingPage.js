import React, {useContext, useEffect, useState} from 'react';
import styles from './LandingPage.module.css';
import CityContext from '../store/CityContext';
import MainForecast from '../components/MainForecast';
import {SpinnerCircularFixed} from 'spinners-react';
import axios from 'axios';

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
        const weatherRes = await axios(`https://lookup-weather-app.herokuapp.com/${location}`);
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

  if (error) {
    return (
      <div className={styles.warning}>
        <h1>'Please enter a city name!'</h1>
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
          <MainForecast />
        </div>
      )}
    </>
  );
}

export default LandingPage;
