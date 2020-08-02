import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ButtonGroup, Divider } from "@material-ui/core";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    minWidth: 250,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginTop: 5,
    fontSize: "12px",
  },
});

function ReportCard(props) {
  const classes = useStyles();
  let {path} = useRouteMatch()
  const bull = <span className={classes.bullet}>•</span>;
  const {
    reportTitle,
    lastSentHumanDate,
    lastSentDate,
    navigationLink,
    date_supplied,
  } = props;
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {reportTitle}
        </Typography>
        <Divider />
        <Typography className={classes.pos} color="textSecondary">
          Last Sent:
        </Typography>
        <Typography variant="h5" component="h3">
          {lastSentHumanDate}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          last Updated: {lastSentDate}
        </Typography>
       {date_supplied && <Typography className={classes.pos} color="textSecondary">
          date supplied: {date_supplied}
        </Typography>}
      </CardContent>
      <CardActions>
        <ButtonGroup>
          <Button component={Link} to={`${props.navigationLink}`} size="small">
            View all Sent Reports
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}

ReportCard.propTypes = {
  className: PropTypes.string,
  reportTitle: PropTypes.string,
  lastSentHumanDate: PropTypes.string,
  lastSentDate: PropTypes.string,
  lastUpdated: PropTypes.string,
  totalUpdated: PropTypes.string,
  navigationLink: PropTypes.string,
  date_supplied: PropTypes.string,
};

export default ReportCard;