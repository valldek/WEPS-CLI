import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

export const CountrySelect = ({ countries, handleCountryChange }) => {
  return (
    <FormControl>
      <InputLabel htmlFor="country-selector">Select Country</InputLabel>
      <NativeSelect
        inputProps={{
          name: 'country',
          id: 'country-selector"',
        }}
        defaultValue=""
        onChange={(evt) => handleCountryChange(evt.target.value)}
      >
        <option value="global">Global</option>
        {countries.length
          ? countries.map((country, idx) => (
              <option value={country.countrySlug} key={`${idx}_${country.countryCode}`}>
                {country.countryName}
              </option>
            ))
          : null}
      </NativeSelect>
    </FormControl>
  );
};
