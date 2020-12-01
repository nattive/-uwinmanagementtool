import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Button,
  Icon,
} from "@material-ui/core";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import MoneyIcon from "@material-ui/icons/Money";
import { connect, useDispatch } from "react-redux";
import { ChecklistExist, getLatestChecklist } from "../actions/checkoutAction";
import { storeNotification } from "../actions/usersAction";
import Countdown from "react-countdown";
import { Redirect } from "react-router-dom";
import { OPEN_NOW, NEW_NOTIFICATION } from "../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
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
  const refresh = () => props.ChecklistExist();
  const [open, setOpen] = useState();
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  useEffect(() => {
    setOpen(props.open ? props.open.open : false);
    setDay(props.open && props.open.type);
    setTime(props.open && props.open.next);
  }, [props.open]);
  useEffect(() => {
    setOpen(props.open ? props.open.open : false);
    setDay(props.open && props.open.type);
    setTime(props.open && props.open.next);
  }, [props.nextChecklist]);

  const dispatch = useDispatch();
  const onComplete = () => {
    dispatch({
      type: OPEN_NOW,
      payload: {
        open: true,
        type: day,
      },
    });
    dispatch({
      type: NEW_NOTIFICATION,
      payload: {
        title: "You have a due checklist",
        type: day,
      },
    });
    const data = {
      title: "Missed Checklist",
      body: "You have a missed checklist",
      type: "other",
    };
    props.storeNotification(data);
  };
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
      return () => onComplete();
    } else {
      // Render a countdown
      return (
        <Typography variant="h4">
          {hours}:{minutes < 9 ? `0${minutes}` : minutes}:{" "}
          {seconds < 9 ? `0${seconds}` : seconds}
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
              {props.open &&
                `Next Checklist in ${new Date(
                  props.open.next
                ).getHours()}:${new Date(props.open.next).getMinutes()}`}
            </Typography>
            {props.open && (
              <Countdown
                date={new Date(props.open && props.open.next)}
                renderer={renderer}
                onComplete={onComplete}
              />
            )}
          </Grid>
          <Grid item>
            <Avatar component={Button}>
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
            Last checklist: {props.nextChecklist.lastChecked}
          </Typography><br />
          <Typography className={classes.caption} variant="caption">
          {props.open.diffentInTime <= 60 &&
            `You can manually check the ${props.open.type} List. Click`}{" "}
          {props.open.diffentInTime <= 60 && (
            <a href="#" onClick={onComplete} className="btn-link">
              Here
            </a>
          )}</Typography>
          <Button startIcon={<Icon  name='home' /> } onClick={refresh}>Refresh</Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  open: state.checklist.open,
  nextChecklist: state.checklist.nextChecklist,
  
});

const mapDispatchToProps = {
  ChecklistExist,
  getLatestChecklist,
  storeNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimerCard);
