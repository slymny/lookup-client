import React, {useContext, useEffect, useState} from 'react';
import CityContext from '../store/CityContext';
import ErrorAndLoadingContext from '../store/ErrorAndLoadingContext';
import MainForecast from '../components/MainForecast';
import {SpinnerCircularFixed} from 'spinners-react';
import styles from './MainPage.module.css';
import axios from 'axios';

function MainPage() {
  const {error, isLoading} = useContext(ErrorAndLoadingContext);
  const {city, forecastCurrent} = useContext(CityContext);

  useEffect(() => {
    (async () => {
      if (city) {
        let photos = await getImage(city);
        if (photos.length > 0) {
          const cityImage = photos[0].src.landscape;
          document.body.background = cityImage;
        } else {
          photos = await getImage(forecastCurrent.sys.country);
          if (photos.length > 0) {
            const cityImage = photos[0].src.landscape;
            document.body.background = cityImage;
          }
        }
      }
    })();
  }, [city]);

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

  if (error) {
    document.body.background = '#5580c9b2;';
    return (
      <div className={styles.error}>
        <h1>"City is not found!"</h1>
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

export default MainPage;
