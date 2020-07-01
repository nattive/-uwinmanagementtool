import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import MoneyIcon from "@material-ui/icons/Money";

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
    backgroundColor: "orange",
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
  },
  differenceIcon: {
    color: "#373727",
  },
  differenceValue: {
    color: "#373727",
    marginRight: 15,
  },
}));

const SummaryCard = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              BUDGET
            </Typography>
            <Typography variant="h3">$24,000</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            12%
          </Typography>
          <Typography className={classes.caption} variant="caption">
            Since last month
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

SummaryCard.propTypes = {
  className: PropTypes.string,
};

export default SummaryCard;
