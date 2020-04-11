import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRibbon, faVirus, faHeartbeat } from '@fortawesome/free-solid-svg-icons';

import { formatLargeNumber } from '../../helpers/index';

import styles from './Card.module.css';

export const Card = ({ cardTitle, cardClass, cardDate, firstData, firstDataLabel, secondData, secondDataLabel, thirdData, thirdDataLabel }) => {
  const border = `${cardClass}Border`;
  const background = `${cardClass}Background`;
  const text = `${cardClass}Text`;

  return(
    <div className={`${styles.card} ${styles[border]}`}>
      <div className={`${styles.cardBar} ${styles[background]} `}>
        <header className={styles.cardHeader}>
          <div className={`${styles.cardIconContainer} ${styles[text]}`}>
            { cardTitle === 'infected'
                ? <FontAwesomeIcon icon={faVirus} />
                : cardTitle === 'recovered'
                  ? <FontAwesomeIcon icon={faHeartbeat} />
                  : <FontAwesomeIcon icon={faRibbon} />

            }
          </div>
          <h3 className={styles.cardTitle}>{cardTitle}</h3>
        </header>
        <span className={styles.cardDate}>{cardDate}</span>
      </div>
      <div className={styles.cardContent}>
        <div className={`${styles.cardRow} ${styles[border]}`}>
          <span className={styles.cardData}>{firstDataLabel}</span>
          <span className={styles.cardData}>{formatLargeNumber(firstData)}</span>
        </div>
        <div className={`${styles.cardRow} ${styles[border]}`}>
          <span className={styles.cardData}>{secondDataLabel}</span>
          <span className={styles.cardData}>{formatLargeNumber(secondData)}</span>
        </div>
        <div className={`${styles.cardRow} ${styles[border]}`}>
          <span className={styles.cardData}>{thirdDataLabel}</span>
          <span className={styles.cardData}>{formatLargeNumber(thirdData)}</span>
        </div>
      </div>
    </div>
  )
};
