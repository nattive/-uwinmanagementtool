import React, { useEffect } from "react";
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
import { connect } from "react-redux";
import { getWSKPA, getLatestReport } from "../../../../actions/reportAction";
import Skeleton from "@material-ui/lab/Skeleton";

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
  useEffect(() => {
    params.getWSKPA();
    params.getLatestReport();
  }, []);
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
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            {params.latestReport.account && params.latestReport.account.id ? (
              <React.Fragment key={params.latestReport.account.id}>
                <ReportCard
                  reportTitle="Sales Account"
                  lastSentHumanDate={params.latestReport.account.created_at}
                  totalUpdated={params.latestReport.account.id}
                  lastSentDate={JSON.stringify(
                    new Date(params.latestReport.account.updated_at)
                  )}
                  navigationLink={`${path}/sales/all`}
                />
              </React.Fragment>
            ) : params.isGettingLatestReport ? (
              <Skeleton height={250} variant="rect" />
            ) : (
              <p>No report Sent</p>
            )}
          </Grid>
          <Grid item xs={6} md={3}>
            {params.latestReport.fuel && params.latestReport.fuel.id ? (
              <React.Fragment key={params.latestReport.fuel.id}>
                <ReportCard
                  reportTitle="Fuel Disbursement Report"
                  lastSentHumanDate={params.latestReport.fuel.created_at}
                  date_supplied={params.latestReport.fuel.date_supplied}
                  totalUpdated={params.latestReport.fuel.id}
                  lastSentDate={JSON.stringify(
                    new Date(params.latestReport.fuel.updated_at)
                  )}
                  navigationLink={`${path}/fuel/all`}
                />
              </React.Fragment>
            ) : params.isGettingLatestReport ? (
              <Skeleton height={250} variant="rect" />
            ) : (
              <p>No report Sent</p>
            )}
          </Grid>
          <Grid item xs={6} md={3}>
            {params.latestReport.wskpa && params.latestReport.wskpa.id ? (
              <React.Fragment key={params.latestReport.wskpa.id}>
                <ReportCard
                  reportTitle="Staff performance appraisal"
                  lastSentHumanDate={params.latestReport.wskpa.created_at}
                  totalUpdated={params.latestReport.wskpa.id}
                  lastSentDate={JSON.stringify(
                    new Date(params.latestReport.wskpa.updated_at)
                  )}
                  navigationLink={`${path}/wskpa/all`}
                />
              </React.Fragment>
            ) : params.isGettingLatestReport ? (
              <Skeleton height={250} variant="rect" />
            ) : (
              <p>No report Sent</p>
            )}
          </Grid>
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
  latestReport: state.reports.latestReport,
  isGettingLatestReport: state.reports.isGettingLatestReport,
});

export default connect(mapStateToProps, { getWSKPA, getLatestReport })(
  ReportHomeScreen
);
