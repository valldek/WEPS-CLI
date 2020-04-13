import React from 'react';

import { Card } from '../Card/Card';
import { Chart } from '../Chart/Chart';

import { formatLargeNumber } from '../../helpers';

import styles from './Total.module.css';

export const Total = ({ data }) => {
  if (data.Date) {
    const activeCases = data.TotalConfirmed - data.TotalDeaths - data.TotalRecovered;
    const deathRatio = (data.TotalDeaths * 100) / data.TotalConfirmed;
    const recoveryRatio = (data.TotalRecovered * 100) / data.TotalConfirmed;
    const date = data.Date.split('T')[0].split('-').reverse().join('-');

    const totalData = {
      confirmed: data.TotalConfirmed,
      recovered: data.TotalRecovered,
      deaths: data.TotalDeaths,
    };
    const lastDayData = {
      confirmed: data.NewConfirmed,
      recovered: data.NewRecovered,
      deaths: data.NewDeaths,
    };

    return (
      <section className={styles.total}>
        <header className={styles.totalHeader}>
          <h2 className={styles.totalTitle}>Summary Data:</h2>
        </header>
        <div className={styles.totalRow}>
          <div className={styles.totalColumn}>
            <Card
              cardTitle="infected"
              cardClass="confirmed"
              cardDate={date}
              firstDataLabel="From The Beginning:"
              firstData={formatLargeNumber(data.TotalConfirmed)}
              secondDataLabel="Last Day:"
              secondData={formatLargeNumber(data.NewConfirmed)}
              thirdDataLabel="Active Cases:"
              thirdData={activeCases}
            />
            <Card
              cardTitle="recovered"
              cardClass="recovered"
              cardDate={date}
              firstDataLabel="From The Beginning:"
              firstData={formatLargeNumber(data.TotalRecovered)}
              secondDataLabel="Last Day:"
              secondData={formatLargeNumber(data.NewRecovered)}
              thirdDataLabel="Recovery Ratio:"
              thirdData={recoveryRatio}
            />
            <Card
              cardTitle="deaths"
              cardClass="deaths"
              cardDate={date.split()}
              firstDataLabel="From The Beginning:"
              firstData={formatLargeNumber(data.TotalDeaths)}
              secondDataLabel="Last Day:"
              secondData={formatLargeNumber(data.NewDeaths)}
              thirdDataLabel="Death Ratio:"
              thirdData={deathRatio}
            />
          </div>
          <div className={styles.totalColumn}>
            <Chart chartTitle="From the beginning" chartType="pie" chartData={totalData} />
            <Chart chartTitle={date} chartType="doughnut" chartData={lastDayData} />
          </div>
        </div>
      </section>
    );
  } else {
    return null;
  }
};
