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
    const weather = await axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${process.env.REACT_APP_API_KEY_WEATHER}&units=metric`,
    );
    setWeather(weather.data);
    cityInput.current.value = '';

    const query = {
      city: weather.data.name,
      country: weather.data.country,
    };

    let photos = await getImage(query.city);
    console.log(query);
    if (photos.length > 0) {
      const cityImage = photos[0].src.landscape;
      document.body.background = cityImage;
    } else {
      photos = await getImage(query.country);
      const cityImage = photos[0].src.landscape;
      document.body.background = cityImage;
    }
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
