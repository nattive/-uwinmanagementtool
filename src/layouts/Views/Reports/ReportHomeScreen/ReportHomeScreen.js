import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid, ButtonGroup, Container } from "@material-ui/core";
import ReportCard from "../../../../components/ReportCard";
import { Link, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  ButtonGroup: {
    padding: theme.spacing(3),
    display:'flex',
    justifyContent: "flex-end",
  },
}));

function ReportHomeScreen(params) {
  const classes = useStyles();
  let {path} = useRouteMatch()
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <>
      <Container>
        <Grid justify="flex-end" className={classes.ButtonGroup}>
          <ButtonGroup>
            <Button
              component={Link}
              to={`${path}/spar`}
              n
              color="primary"
              variant="contained"
              className="m-2"
            >
              SPAR
            </Button>
            <Button color="primary" variant="contained" className="m-2">
              SSR
            </Button>
            <Button color="primary" variant="contained" className="m-2">
              SWKPA
            </Button>
            <Button
              component={Link}
              to={`${path}/sfcr`}
              className="m-2"
              color="primary"
              variant="contained"
            >
              SFCR
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={6} md={4}>
          <ReportCard />
        </Grid>
      </Container>
    </>
  );
}

export default ReportHomeScreen;
