import React from 'react';
import styles from './Spinner.module.css';

function Spinner() {
  return (
    <div className={styles.loader_container}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Spinner;
