import React, { useState } from 'react';

import { Doughnut, Polar } from 'react-chartjs-2';

import styles from './Chart.module.css';

export const Chart = ({ chartTitle, chartType, chartData }) => {
  const renderChartByType = (type) => {
    const chartColors = [
      'hsl(348, 100%, 70%)',
      'hsl(164, 47%, 52%)',
      'hsl(42, 100%, 67%)',
      'hsl(0, 0%, 20%)',
    ];
    const chartLabels = ['Confirmed', 'Recovered', 'Active', 'Deaths'];

    switch (type) {
      case 'doughnut':
        return (
          <Doughnut
            data={{
              datasets: [
                {
                  data: [
                    `${chartData.recovered}`,
                    `${chartData.confirmed - chartData.recovered - chartData.deaths}`,
                    `${chartData.deaths}`,
                  ],
                  backgroundColor: chartColors.slice(1),
                },
              ],
              labels: chartLabels.slice(1),
            }}
          />
        );
      case 'polar':
        return (
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
                  backgroundColor: chartColors,
                },
              ],
              labels: chartLabels,
            }}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className={styles.chart}>
      <h3 className={styles.chartTitle}>{chartTitle}</h3>
      {renderChartByType(chartType)}
    </div>
  );
};
