import React from 'react';
import {SpinnerCircularFixed} from 'spinners-react';
import styles from './LoadingHandling.module.css';

function LoadingHandling() {
  return (
    <div className={styles.spinner}>
      <SpinnerCircularFixed
        size="20%"
        color="#5CA4FF"
        secondaryColor="#CDE9FF"
      />
    </div>
  );
}

export default LoadingHandling;
