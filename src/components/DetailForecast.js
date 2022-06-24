import React, {useContext, useState} from 'react';
import CityContext from '../store/CityContext';
import styles from './DetailForecast.module.css';

function DetailForecast() {
  const {city, forecastDaily} = useContext(CityContext);
  const [hoursSection, setHoursSection] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');

  if (forecastDaily) {
    const {list} = forecastDaily;
    const allDates = list.map(date => date.dt_txt.split(' ')[0]);
    const dates = [...new Set(allDates)];

    function showHourlyForecast(e) {
      setSelectedDay(e.target.innerText);
      const forecastOfTheDay = list.filter(
        date => date.dt_txt.split(' ')[0] === e.target.innerText,
      );

      setHoursSection(
        forecastOfTheDay.map(forecast => (
          <div key={forecast.dt_txt} className={styles.hourly}>
            <h3>{forecast.dt_txt.split(' ')[1].substr(0, 5)}</h3>
            <img
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              alt=""
            />
            <h4>{parseInt(forecast.main.temp)} °C</h4>
          </div>
        )),
      );
    }

    return (
      <div className={styles.details}>
        <h3>{city} / {forecastDaily.city.country}</h3>
        <div className={styles['day-buttons']}>
          {dates.map(date => (
            <button key={date} onClick={showHourlyForecast}>{date}</button>
          ))}
        </div>
        <h3>{selectedDay ? selectedDay : 'Please select a day to show'}</h3>
        <div className={styles['hours-section']}>{hoursSection}</div>
      </div>
    );
  }
}

export default DetailForecast;
