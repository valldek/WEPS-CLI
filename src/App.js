import React from 'react';

import { Card } from './componenets/Card/Card';
import { CountrySelect } from './componenets/CountrySelect/CountrySelect'

import { fetchSummary } from './helpers/fetcher';

import styles from './App.module.css';

export class App extends React.Component {
  state = {
    data: {},
    countries: [],
    selectedData: {},
    selectedCountry: 'global'
  }

  async componentDidMount() {
    const fetchedData = await fetchSummary();

    const countries = fetchedData.Countries.map((country) => {
      return {
        countryCode: country.CountryCode,
        countryName: country.Country,
        countrySlug: country.Slug,
      }
    })

    const global = fetchedData.Global;
    global.Date = fetchedData.Date;

    this.setState({
      countries,
      data: fetchedData,
      selectedData: global
    });
  }

  handleCountryChange = async (country) => {
    let selectedData = {};

    if (country === 'global') {
      selectedData = this.state.data.Global;
      selectedData.Date = this.state.data.Date;
    } else {
      const {
        Date,
        NewConfirmed,
        NewDeaths,
        NewRecovered,
        TotalConfirmed,
        TotalDeaths,
        TotalRecovered,
      } = this.state.data.Countries.filter((c) => c.Slug === country)[0];

      selectedData = {
        Date,
        NewConfirmed,
        NewDeaths,
        NewRecovered,
        TotalConfirmed,
        TotalDeaths,
        TotalRecovered,
      }
    }

    this.setState({
      country,
      selectedData,
    });
  };

  render() {
    return (
      <>
        <CountrySelect
          countries={this.state.countries}
          handleCountryChange={this.handleCountryChange}
        />
        <Card data={this.state.selectedData} country={this.state.country} />
      </>
    )
  }
}