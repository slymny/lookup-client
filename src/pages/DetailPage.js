import React, {useContext, useEffect} from 'react'
import DetailForecast from '../components/DetailForecast'
import CityContext from '../store/CityContext';
import useFetch from '../hooks/useFetch';
import axios from 'axios';

function DetailPage() {
    const {city, forecastDaily, updateForecastDaily} = useContext(CityContext);
    
    useEffect(() => {
      axios(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY_WEATHER}&units=metric`)
      .then(res => updateForecastDaily(res.data))
      
      console.log(city)
    }, []);
  
    return (
      <div>
        <DetailForecast />
      </div>
    );
}

export default DetailPage

