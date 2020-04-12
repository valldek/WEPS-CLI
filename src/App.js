import React from 'react';

import { Header } from './componenets/Header/Header';
import { Card } from './componenets/Card/Card';
import { CountrySelect } from './componenets/CountrySelect/CountrySelect';

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
      country,
      selectedData,
    });
  };

  render() {
    const activeCases = this.state.selectedData.TotalConfirmed - this.state.selectedData.TotalDeaths - this.state.selectedData.TotalRecovered;
    const deathRatio = this.state.selectedData.TotalDeaths * 100 / this.state.selectedData.TotalConfirmed;
    const recoveryRatio = this.state.selectedData.TotalRecovered * 100 / this.state.selectedData.TotalConfirmed;
    const date = this.state.selectedData.Date;

    return this.state.selectedData.Date ? (
      <>
        <Header />
        <CountrySelect
          countries={this.state.countries}
          handleCountryChange={this.handleCountryChange}
        />
        <Card
          cardTitle="infected"
          cardClass="confirmed"
          cardDate={date}
          firstDataLabel="From The Beginning:"
          firstData={this.state.selectedData.TotalConfirmed}
          secondDataLabel="Last Day:"
          secondData={this.state.selectedData.NewConfirmed}
          thirdDataLabel="Active Cases:"
          thirdData={activeCases}
        />
        <Card
          cardTitle="recovered"
          cardClass="recovered"
          cardDate={date}
          firstDataLabel="From The Beginning:"
          firstData={this.state.selectedData.TotalRecovered}
          secondDataLabel="Last Day:"
          secondData={this.state.selectedData.NewRecovered}
          thirdDataLabel="Recovery Ratio:"
          thirdData={recoveryRatio}
        />
        <Card
          cardTitle="deaths"
          cardClass="deaths"
          cardDate={date}
          firstDataLabel="From The Beginning:"
          firstData={this.state.selectedData.TotalDeaths}
          secondDataLabel="Last Day:"
          secondData={this.state.selectedData.NewDeaths}
          thirdDataLabel="Death Ratio:"
          thirdData={deathRatio}
        />
      </>
    )
    : null
  }
}
