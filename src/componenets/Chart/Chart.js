import React, { useState } from 'react';

import { Doughnut, Polar } from 'react-chartjs-2';

import styles from './Chart.module.css';

export const Chart = ({ chartTitle, chartType, chartData }) => {

  return chartType === 'doughnut' ?
    (
      <>
        <h3 className={styles.chartTitle}>{chartTitle}</h3>
        <Doughnut
          data={{
            datasets: [
              {
                data: [
                  `${chartData.recovered}`,
                  `${chartData.confirmed - chartData.recovered - chartData.deaths}`,
                  `${chartData.deaths}`,
                ],
              },
            ],
          }}
        />
      </>
    )
    :
    <Polar
    data={{
      datasets: [
        {
          data: [
            `${chartData.confirmed}`,
            `${chartData.recovered}`,
            `${chartData.confirmed - chartData.recovered - chartData.deaths}`,
            `${chartData.deaths}`,
          ],
        },
      ],
    }}
  />
};
