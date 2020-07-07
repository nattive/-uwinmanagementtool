import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import MoneyIcon from "@material-ui/icons/Money";
import { connect } from "react-redux";
import { ChecklistExist, getLatestChecklist } from "../actions/checkoutAction";
import Countdown from "react-countdown";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  differenceIcon: {
    color: theme.palette.error.dark,
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
}));

const TimerCard = (props) => {
  const {
    className,
    summaryTitle,
    summaryTittleAbbr,
    mainText,
    lastUpdated,
    totalUpdated,
    ...rest
  } = props;

  const classes = useStyles();
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Redirect to='/' />;
    } else {
      // Render a countdown
      return (
        <Typography variant="h4">
          {hours}:{minutes}:{seconds}
        </Typography>
      );
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="subtitle2" component="small">
              Nect Checklist in
            </Typography>
            <Countdown
              date={1000000}
              renderer={renderer}
              onComplete={() => props.ChecklistExist()}
            />
            ,
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AccessAlarmIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <Grid item>
          {/* <ArrowDownwardIcon className={classes.differenceIcon} /> */}
          <Typography className={classes.caption} variant="caption">
            Next checklist time: 00:00
          </Typography>
          <br />
          <Typography className={classes.caption} variant="caption">
            Last checklist: {props.lastChecked}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  nextChecklist: state.checklist.nextChecklist,
});

const mapDispatchToProps = {
  ChecklistExist,
  getLatestChecklist,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimerCard);
