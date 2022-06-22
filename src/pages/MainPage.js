import React, {useContext, useEffect, useState} from 'react';
import CityContext from '../store/CityContext';
import ErrorAndLoadingContext from '../store/ErrorAndLoadingContext';
import MainForecast from '../components/MainForecast';
import {SpinnerCircularFixed} from 'spinners-react';
import styles from './MainPage.module.css';

function MainPage() {
  const {error, isLoading} = useContext(ErrorAndLoadingContext);
  console.log(isLoading);

  if (error === 'City is not found!') {
    document.body.background = '#5580c9b2;';
    return (
      <div className={styles.error}>
        <h1>{error}</h1>
      </div>
    );
  } else if (isLoading) {
    return (
      <div className={styles.error}>
        <h1>'Please enter a city!'</h1>
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
