import React from 'react';

import { CountrySelect } from '../CountrySelect/CountrySelect';

import styles from './Footer.module.css';

export const Footer = ({countries, selectedCountry, handleCountryChange}) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <CountrySelect countries={countries} selectedCountry={selectedCountry} handleCountryChange={handleCountryChange}  />
        <div className={styles.footerNotes}>
          <span className={styles.footerText}>Data from:</span>
          <ul className={styles.footerList}>
            <li>
              <a href="https://api.covid19api.com">covid19api</a>
            </li>
            <li>
              <a href="https://covid19.mathdro.id/">mathdroid</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerNotes}>
          <span className={styles.footerText}>Build with:</span>
          <ul className={styles.footerList}>
            <li>
              <a href="https://reactjs.org/">React</a>
            </li>
            <li>
              <a href="https://www.chartjs.org/">Chart.js</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}