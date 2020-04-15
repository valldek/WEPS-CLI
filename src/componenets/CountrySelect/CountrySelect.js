import React from 'react';

import styles from './CountrySelect.module.css';

export const CountrySelect = ({ countries, handleCountryChange, selectedCountry }) => {
  return (
    <div className={styles.countrySelect}>
      <label className={styles.label} htmlFor="country_selector">Select a Country:</label>
      <select className={styles.select} name="country" id="country_selector" value={selectedCountry} onChange={(evt) => handleCountryChange(evt.target.value)}>
        <option className={styles.option} value="global">Global</option>
        {countries.length
          ? countries.map((country, idx) => (
              <option className={styles.option} value={country.countrySlug} key={`${country.countryCode}`}>
                {country.countryName}
              </option>
            ))
          : null}
      </select>
    </div>
  );
};
