import React, {useContext} from 'react';
import ErrorAndLoadingContext from '../store/ErrorAndLoadingContext';
import MainForecast from '../components/MainForecast';
import {SpinnerCircularFixed} from 'spinners-react';
import styles from './MainPage.module.css';

function MainPage() {
  const {error, isLoading} = useContext(ErrorAndLoadingContext);

  if (error.includes('404')) {
    document.body.background = '#5580c9b2;';
    return (
      <div className={styles.error}>
        <h1>"City is not found!"</h1>
      </div>
    );
  } else if (error && !error.includes('404')) {
    return (
      <div className={styles.error}>
        <h1>"Oops! Something went wrong..."</h1>
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
