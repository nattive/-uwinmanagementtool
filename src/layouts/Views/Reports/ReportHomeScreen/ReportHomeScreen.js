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
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
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
    display: "flex",
    justifyContent: "flex-end",
  },
}));

function ReportHomeScreen(params) {
  const classes = useStyles();
  let { path } = useRouteMatch();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <>
      <Container>
        <Grid justify="flex-end" className={classes.ButtonGroup}>
          <ButtonGroup>
            <Tooltip title="Weekly accounting and sales report" arrow>
              <Button
                component={Link}
                to={`${path}/sr`}
                n
                color="primary"
                variant="contained"
                className="m-2"
              >
                SSR
              </Button>
            </Tooltip>
            <Tooltip title="Staff performance, appraisal and review" arrow>
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
            </Tooltip>
            <Tooltip title="Standard fuel consumption report" arrow>
              <Button
                component={Link}
                to={`${path}/sfcr`}
                className="m-2"
                color="primary"
                variant="contained"
              >
                SFCR
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Grid>
        <Grid item xs={6} md={4}>
          <ReportCard
            reportTitle="Staff Appraisal"
            lastSentHumanDate={params.wskpaReport.created_at}
            totalUpdated={params.wskpaReports.length}
            lastSentDate={params.wskpaReport.updated_at}
          />
        </Grid>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  checkExist: state.checklist.isExist,
  checklist: state.checklist.open,
  manager: state.auth.manager,
  wskpaReport: state.reports.wskpaReport,
  wskpaReports: state.reports.wskpaReports,
  loadingState: state.reports.loadingState,
});


export default connect(mapStateToProps, null) (ReportHomeScreen);
