import React, { useState } from 'react';

import { Doughnut, Polar, Bar, Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

import styles from './Chart.module.css';

export const Chart = ({ chartTitle, chartType, chartData }) => {
  const [expanded, setExpanded] = useState(false);

  const renderChartByType = (type) => {
    const chartColors = [
      'hsl(348, 100%, 70%)',
      'hsl(164, 47%, 52%)',
      'hsl(42, 100%, 67%)',
      'hsl(0, 0%, 20%)',
    ];
    const chartBackgroundColors = [
      'hsla(348, 100%, 70%, 0.5)',
      'hsla(164, 47%, 52%, 0.5)',
      'hsla(42, 100%, 67%, 0.5)',
      'hsla(0, 0%, 20%, 0.5)',
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
      case 'line':
        return (
          <Line
            data={{
              labels: chartData.map((day) => day.date),
              datasets: [
                {
                  data: chartData.map((day) => day.confirmed),
                  label: chartLabels[0],
                  borderColor: chartColors[0],
                  backgroundColor: chartBackgroundColors[0],
                  pointBackgroundColor: chartColors[0],
                  pointBorderWidth: 1,
                  fill: true,
                  order: 4,
                },
                {
                  data: chartData.map((day) => day.recovered),
                  label: chartLabels[1],
                  borderColor: chartColors[1],
                  backgroundColor: chartBackgroundColors[1],
                  pointBackgroundColor: chartColors[1],
                  pointBorderWidth: 1,
                  fill: true,
                  order: 3,
                },
                {
                  data: chartData.map((day) => day.active),
                  label: chartLabels[2],
                  borderColor: chartColors[2],
                  backgroundColor: chartBackgroundColors[2],
                  pointBackgroundColor: chartColors[2],
                  pointBorderWidth: 1,
                  fill: true,
                  order: 2,
                },
                {
                  data: chartData.map((day) => day.deaths),
                  label: chartLabels[3],
                  borderColor: chartColors[3],
                  backgroundColor: chartBackgroundColors[3],
                  pointBackgroundColor: chartColors[3],
                  pointBorderWidth: 1,
                  fill: true,
                  order: 1,
                },
              ],
            }}
            options={{
              scales: {
                xAxes: [
                  {
                    ticks: {
                      callback: function (value, index, values) {
                        return value
                          .split('-')
                          .filter((val, idx) => idx !== 2)
                          .join('-');
                      },
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      callback: function (value, index, values) {
                        return value > 1000000
                          ? `${value / 1000000}M`
                          : value > 1000
                          ? `${value / 1000}k`
                          : value;
                      },
                    },
                    position: 'right',
                  },
                ],
              },
            }}
          />
        );
      case 'bar':
        return (
          <Bar
            data={{
              labels: chartData.map((day) => day.date),
              datasets: [
                {
                  data: chartData.map((day) => day.confirmed),
                  label: chartLabels[0],
                  backgroundColor: chartColors[0],
                  fill: true,
                },
                {
                  data: chartData.map((day) => day.recovered),
                  label: chartLabels[1],
                  backgroundColor: chartColors[1],
                  fill: true,
                },
                {
                  data: chartData.map((day) => day.deaths),
                  label: chartLabels[3],
                  backgroundColor: chartColors[3],
                  fill: true,
                },
              ],
            }}
            options={{
              scales: {
                xAxes: [
                  {
                    ticks: {
                      callback: function (value, index, values) {
                        return value
                          .split('-')
                          .filter((val, idx) => idx !== 2)
                          .join('-');
                      },
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      callback: function (value, index, values) {
                        return value > 1000000
                          ? `${value / 1000000}M`
                          : value > 1000
                          ? `${value / 1000}k`
                          : value;
                      },
                    },
                    position: 'right',
                  },
                ],
              },
            }}
          />
        );
      default:
        return null;
    }
  };

  const toggleFullScreenChart = () => {
    setExpanded(!expanded);
  }

  return (
    <div className={ expanded ? `${styles.chart} ${styles.chartExpanded}` : styles.chart}>
      <h3 className={styles.chartTitle}>{chartTitle}</h3>
      <div className={styles.chartExpandIcon} onClick={toggleFullScreenChart}>
        {expanded ?
          <FontAwesomeIcon icon={faCompress} /> :
          <FontAwesomeIcon icon={faExpand} />
        }
      </div>
      {renderChartByType(chartType)}
    </div>
  );
};
