import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRibbon, faVirus, faHeart } from '@fortawesome/free-solid-svg-icons';

import styles from './Card.module.css';

export const Cards = ({
  data: {
    Date,
    NewConfirmed,
    NewDeaths,
    NewRecovered,
    TotalConfirmed,
    TotalDeaths,
    TotalRecovered,
  },
}) => {
  return Date ? (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="infected">
              <FontAwesomeIcon icon={faVirus} />
            </Avatar>
          }
          title="Infected"
          subheader={Date}
        />
        <CardContent>
          <Grid container spacing={3} justify="center">
            <Grid item component={Card}>
              <CardHeader title="From Begining" />
              <Typography variant="body1" color="textSecondary" component="p">
                {TotalConfirmed}
              </Typography>
            </Grid>
            <Grid item component={Card}>
              <CardHeader title="Today" />
              <Typography variant="body1" color="textSecondary" component="p">
                {NewConfirmed}
              </Typography>
            </Grid>
            <Grid item component={Card}>
              <CardHeader title="Active" />
              <Typography variant="body1" color="textSecondary" component="p">
                {TotalConfirmed - TotalDeaths - TotalRecovered}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="recovered">
              <FontAwesomeIcon icon={faHeart} />
            </Avatar>
          }
          title="Recovered"
          subheader={Date}
        />
        <CardContent>
          <Grid container spacing={3} justify="center">
            <Grid item component={Card}>
              <CardHeader title="From Begining" />
              <Typography variant="body1" color="textSecondary" component="p">
                {TotalRecovered}
              </Typography>
            </Grid>
            <Grid item component={Card}>
              <CardHeader title="Today" />
              <Typography variant="body1" color="textSecondary" component="p">
                {NewRecovered}
              </Typography>
            </Grid>
            <Grid item component={Card}>
              <CardHeader title="Recovery Ratio" />
              <Typography variant="body1" color="textSecondary" component="p">
                {`${((TotalRecovered * 100) / TotalConfirmed).toFixed(2)}%`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="deaths">
              <FontAwesomeIcon icon={faRibbon} />
            </Avatar>
          }
          title="Deaths"
          subheader={Date}
        />
        <CardContent>
          <Grid container spacing={3} justify="center">
            <Grid item component={Card}>
              <CardHeader title="From Begining" />
              <Typography variant="body1" color="textSecondary" component="p">
                {TotalDeaths}
              </Typography>
            </Grid>
            <Grid item component={Card}>
              <CardHeader title="Today" />
              <Typography variant="body1" color="textSecondary" component="p">
                {NewDeaths}
              </Typography>
            </Grid>
            <Grid item component={Card}>
              <CardHeader title="Deth Ratio" />
              <Typography variant="body1" color="textSecondary" component="p">
                {`${((TotalDeaths * 100) / TotalConfirmed).toFixed(2)}%`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  ) : null;
};
