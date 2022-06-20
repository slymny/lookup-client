import axios from 'axios';
import React, {useRef, useContext, useEffect, useState} from 'react';
import CityContext from '../store/CityContext';
import styles from './Navbar.module.css';

function Navbar() {
  const cityInput = useRef('');
  const {city, updateCity, updateForecastCurrent, forecastCurrent} =
    useContext(CityContext);
  const [weather, setWeather] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
  }, [weather]);

  async function handleClick() {
    const weather = await axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${process.env.REACT_APP_API_KEY_WEATHER}&units=metric`,
    );
    setWeather(weather.data);
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
        placeholder="Search for a location"
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
