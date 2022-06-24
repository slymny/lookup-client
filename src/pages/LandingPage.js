import React, {useContext} from 'react';
import styles from './LandingPage.module.css';
import CityContext from '../store/CityContext';
import MainPage from './MainPage';

function LandingPage() {
  const {isClicked} = useContext(CityContext);

  return (
    <div>
      {!isClicked ? (
        <div className={styles.warning}>
          <h1>'Please enter a city name!'</h1>
        </div>
      ) : (
        <MainPage />
      )}
    </div>
  );
}

export default LandingPage;
