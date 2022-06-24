import React, {useContext} from 'react';
import CityContext from '../store/CityContext';
import styles from './MainForecast.module.css';
import {NavLink} from 'react-router-dom';
import ErrorAndLoadingContext from '../store/ErrorAndLoadingContext';

function MainForecast() {
  const {forecastCurrent} = useContext(CityContext);
  const {changeIsLoading, setError} = useContext(ErrorAndLoadingContext)


  function clickHandler() {
    changeIsLoading(true);
    setError('');
  }

  if (forecastCurrent) {
    return (
      <div className={styles['main-forecast']}>
        <div className={styles.title}>
          <NavLink to={`/${forecastCurrent.name}`} className={styles.navlink} onClick={clickHandler}>
            <h1>{forecastCurrent.name}</h1>
          </NavLink>
          <img
            src={`http://openweathermap.org/img/wn/${forecastCurrent.weather[0].icon}@2x.png`}
            alt=""
          />
        </div>
        <div className={styles.infos}>
          <h5>Real {parseInt(forecastCurrent.main.temp)} °C</h5>
          <h5> Feels {parseInt(forecastCurrent.main.feels_like)} °C</h5>
          <h5>{forecastCurrent.weather[0].description}</h5>
        </div>
      </div>
    );
  }
}

export default MainForecast;
