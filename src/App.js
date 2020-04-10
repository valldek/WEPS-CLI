import React from 'react';

import { Card } from './componenets/Card/Card';

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

  render() {
    return (
      <Card data={this.state.selectedData} country={this.state.country} />
    )
  }
}