import axios from 'axios';
import React, {useRef, useContext, useEffect, useState} from 'react';
import CityContext from '../store/CityContext';
import ErrorAndLoadingContext from '../store/ErrorAndLoadingContext';
import styles from './Navbar.module.css';
import {useNavigate} from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function Navbar() {
  const navigate = useNavigate();
  const cityInput = useRef('');
  const {updateCity, updateForecastCurrent} = useContext(CityContext);
  const {changeIsLoading, setError} = useContext(ErrorAndLoadingContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [weather, setWeather] = useState(null);

  //   async function getIp() {
  //     const ipData = await axios('http://ipwho.is/');
  //     updateCity(ipData.data.city);
  //     console.log(city);
  //     setIsCity(true)
  //   }

  useEffect(() => {
    if (weather) {
      updateForecastCurrent(weather);
      updateCity(weather.name);
    }
  }, [updateCity, updateForecastCurrent, weather]);

  async function handleClick() {
    navigate('/weather');
    changeIsLoading(true);
    setError('');

    try {
      const weatherRes = await axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${process.env.REACT_APP_API_KEY_WEATHER}&units=metric`,
      );
      setWeather(weatherRes.data);
      changeIsLoading(false);
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
