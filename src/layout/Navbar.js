import axios from 'axios';
import React, {useRef, useContext, useEffect, useState} from 'react';
import CityContext from '../store/CityContext';
import ErrorAndLoadingContext from '../store/ErrorAndLoadingContext';
import styles from './Navbar.module.css';
import {useNavigate} from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const cityInput = useRef('');
  const {updateCity, updateForecastCurrent} = useContext(CityContext);
  const {changeIsLoading, setError} = useContext(ErrorAndLoadingContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (weather) {
      updateForecastCurrent(weather);
      updateCity(weather.name.split(' ').join('%20'));
    }
  }, [updateCity, updateForecastCurrent, weather]);

  async function handleClick() {
    navigate('/weather');
    changeIsLoading(true);
    setError('');

    try {
      const weatherRes = await axios(
        `https://lookup-weather-app.herokuapp.com/weather/${searchQuery}`,
      );
      changeIsLoading(false);
      if (!weatherRes.data.error) {
        setWeather(weatherRes.data.data);
        const bgImage = weatherRes.data.image;
        if (bgImage) document.body.background = bgImage;
      } else {
        setError(weatherRes.data.error.message);
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
      changeIsLoading(false);
    }
    cityInput.current.value = '';
  }

  function changeHandler(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <nav className={styles.navbar}>
      <input
        className={styles['nav-input']}
        ref={cityInput}
        type="text"
        name="search"
        placeholder="Please enter a city name"
        onChange={changeHandler}
      />
      <button
        className={styles.search}
        type="button"
        name="button"
        value="getWeather"
        onClick={handleClick}
      >
        Get Forecast
      </button>
    </nav>
  );
}

export default Navbar;
