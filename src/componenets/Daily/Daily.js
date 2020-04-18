import React, { useState, useEffect } from 'react';

import { Card } from '../Card/Card';
import { Chart } from '../Chart/Chart';

import { fetchDailyData } from '../../helpers/fetcher';
import { formatLargeNumber, sortByThreeFactors} from '../../helpers';

import styles from '../Total/Total.module.css';

export const Daily = ({ country }) => {
  const [dailySummary, setDailySummary] = useState([]);
  const [daily, setDaily] = useState([]);
  const [worstDay, setWorstDay] = useState({});
  const [averageDay, setAverageDay] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetchDailyData(country);

      let summaryData = [];
      let dailyData = [];

      if (country === 'global') {
        summaryData = response.map((day) => {
          return {
            confirmed: day.totalConfirmed,
            recovered: day.totalRecovered,
            deaths: day.deaths.total,
            active: day.totalConfirmed - day.totalRecovered - day.deaths.total,
            date: day.reportDate.split('-').reverse().join('-'),
          };
        });

        dailyData = response.map((day, idx, arr) => {
          return idx > 0
            ? {
                confirmed: day.totalConfirmed - arr[idx - 1].totalConfirmed,
                deaths: day.deaths.total - arr[idx - 1].deaths.total,
                recovered: day.totalRecovered - arr[idx - 1].totalRecovered,
                active:
                  day.totalConfirmed -
                  day.totalRecovered -
                  day.deaths.total -
                  (arr[idx - 1].totalConfirmed -
                    arr[idx - 1].totalRecovered -
                    arr[idx - 1].deaths.total),
                date: day.reportDate.split('-').reverse().join('-'),
              }
            : {
                confirmed: day.totalConfirmed,
                deaths: day.deaths.total,
                recovered: day.totalRecovered,
                active: day.totalConfirmed - day.totalRecovered - day.deaths.total,
                date: day.reportDate.split('-').reverse().join('-'),
              };
        });
      } else {
        summaryData = response.map((day) => {
          return {
            confirmed: day.Confirmed,
            recovered: day.Recovered,
            deaths: day.Deaths,
            active: day.Active,
            date: day.Date.split('T')[0].split('-').reverse().join('-'),
          };
        });

        dailyData = response.map((day, idx, arr) => {
          return idx > 0
            ? {
                confirmed: day.Confirmed - arr[idx - 1].Confirmed,
                deaths: day.Deaths - arr[idx - 1].Deaths,
                recovered: day.Recovered - arr[idx - 1].Recovered,
                active: day.Active - arr[idx - 1].Active,
                date: day.Date.split('T')[0].split('-').reverse().join('-'),
              }
            : {
                confirmed: day.Confirmed,
                deaths: day.Deaths,
                recovered: day.Recovered,
                active: day.Active,
                date: day.Date.split('T')[0].split('-').reverse().join('-'),
              };
        });
      }

      const worstDayData = sortByThreeFactors([...dailyData], 'deaths', 'confirmed', 'recovered');
      const {
        confirmed: averageConfirmed,
        deaths: averageDeaths,
        recovered: averageRecovered,
      } = summaryData[summaryData.length - 1];

      setDailySummary(summaryData);
      setDaily(dailyData);
      setWorstDay(worstDayData.slice(worstDayData.length - 3).reverse());
      setAverageDay({
        confirmed: (averageConfirmed / summaryData.length),
        deaths: (averageDeaths / summaryData.length),
        recovered: (averageRecovered / summaryData.length),
      });
    })();
  }, [country]);

  return worstDay.length ? (
    <section className={styles.total}>
      <header className={styles.totalHeader}>
        <h2 className={styles.totalTitle}>Daily Data:</h2>
      </header>
      <div className={styles.totalRow}>
        <div className={styles.totalColumn}>
          <Card
            cardTitle="Most Deaths"
            cardClass="deaths"
            cardDate={worstDay[0].date}
            firstDataLabel="Deaths:"
            firstData={formatLargeNumber(worstDay[0].deaths)}
            secondDataLabel="Confirmed:"
            secondData={formatLargeNumber(worstDay[0].confirmed)}
            thirdDataLabel="Recovered:"
            thirdData={formatLargeNumber(worstDay[0].recovered)}
          />
          <Card
            cardTitle="Most Deaths"
            cardClass="deaths"
            cardDate={worstDay[1].date}
            firstDataLabel="Deaths:"
            firstData={formatLargeNumber(worstDay[1].deaths)}
            secondDataLabel="Confirmed:"
            secondData={formatLargeNumber(worstDay[1].confirmed)}
            thirdDataLabel="Recovered:"
            thirdData={formatLargeNumber(worstDay[1].recovered)}
          />
          <Card
            cardTitle="Most Deaths"
            cardClass="deaths"
            cardDate={worstDay[2].date}
            firstDataLabel="Deaths:"
            firstData={formatLargeNumber(worstDay[2].deaths)}
            secondDataLabel="Confirmed:"
            secondData={formatLargeNumber(worstDay[2].confirmed)}
            thirdDataLabel="Recovered:"
            thirdData={formatLargeNumber(worstDay[2].recovered)}
          />
          <Card
            cardTitle="Average"
            cardClass="recovered"
            cardDate={null}
            firstDataLabel="Deaths:"
            firstData={formatLargeNumber((averageDay.deaths))}
            secondDataLabel="Confirmed:"
            secondData={formatLargeNumber((averageDay.confirmed))}
            thirdDataLabel="Recovered:"
            thirdData={formatLargeNumber((averageDay.recovered))}
          />
        </div>
        <div className={styles.totalColumn}>
            <Chart chartTitle="Day Summary" chartType="line" chartData={dailySummary} />
            <Chart chartTitle="Last 30 days" chartType="bar" chartData={daily.slice(daily.length - 30)} />
        </div>
      </div>
    </section>
  ) : null;
};
