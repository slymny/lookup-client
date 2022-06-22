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
  const {changeIsLoading, setError} = useContext(
    ErrorAndLoadingContext,
  );
    const [landing, setLanding] = useState(true)

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
  }, [setError, updateCity, updateForecastCurrent, weather]);

  async function getImage(query) {
    const cityImageRes = await fetch(
      `https://api.pexels.com/v1/search?query=${query}`,
      {
        headers: {
          Authorization:
            '563492ad6f917000010000019035daf060234dd687f66b285c532678',
        },
      },
    );
    const cityImageData = await cityImageRes.json();
    return cityImageData.photos;
  }

  async function handleClick() {
    if (!landing) {
      navigate('/');
      const query = {};
      try {
        const weatherData = await axios(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${process.env.REACT_APP_API_KEY_WEATHER}&units=metric`,
        );

        setWeather(weatherData.data);
        changeIsLoading(false);
        setError('');
        query.city = weatherData.data.name;
        query.desc = weatherData.data.weather[0].description
          .split(' ')
          .join('%20');
      } catch (err) {
        changeIsLoading(false);
        setError('City is not found!');
        console.log(err.message);
      }
      cityInput.current.value = '';

      let photos = await getImage(query.city);
      if (photos.length > 0) {
        const cityImage = photos[0].src.landscape;
        document.body.background = cityImage;
      } else {
        photos = await getImage(query.country);
        if (photos.length > 0) {
          const cityImage = photos[0].src.landscape;
          document.body.background = cityImage;
        }
      }
    }
  }

  function changeHandler(e) {
    setSearchQuery(e.target.value);
    setLanding(false);
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
