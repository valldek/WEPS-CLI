import React from 'react';

import { Header } from './componenets/Header/Header';
import { Total } from './componenets/Total/Total';
import { Footer } from './componenets/Footer/Footer';

import { fetchSummary, fetchSummaryFromFile } from './helpers/fetcher';

import styles from './App.module.css';

export class App extends React.Component {
  state = {
    data: {},
    countries: [],
    selectedData: {},
    selectedCountry: 'global',
  };

  async componentDidMount() {
    const fetchedData = await fetchSummaryFromFile();

    console.log(fetchedData);

    const countries = fetchedData.Countries.map((country) => {
      return {
        countryCode: country.CountryCode,
        countryName: country.Country,
        countrySlug: country.Slug,
      };
    });

    const global = fetchedData.Global;
    global.Date = fetchedData.Date;

    this.setState({
      countries,
      data: fetchedData,
      selectedData: global,
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
      };
    }

    this.setState({
      selectedCountry: country,
      selectedData,
    });
  };

  render() {
    return(
      <>
        <Header />
        <Total data={this.state.selectedData} />
        <Footer
          countries={this.state.countries}
          selectedCountry={this.state.selectedCountry}
          handleCountryChange={this.handleCountryChange}
        />
      </>
    )
  }
}
