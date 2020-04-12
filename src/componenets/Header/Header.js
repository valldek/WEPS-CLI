import React from 'react';

import styles from './Header.module.css';
import { ReactComponent as Logo } from './Logo.svg';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <span className={styles.logoTypography}>covid-19</span>
        <Logo title="Covid-19 virus icon" className={styles.logo} />
        <span className={styles.logoTypography}>tracker</span>
      </div>
    </header>
  )
}