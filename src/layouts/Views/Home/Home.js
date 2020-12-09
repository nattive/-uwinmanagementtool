import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import SummaryCard from "../../../components/SummaryCard";
import { connect } from "react-redux";
import TimerCard from "../../../components/TimerCard";
import Notification from "../../../components/Notification";
import Snackbar from "@material-ui/core/Snackbar";


function Home(props) {
   const [state, setState] = React.useState({
     open: false,
     vertical: "top",
     horizontal: "center",
   });
     const { vertical, horizontal, open } = state;

  return (
    <>
      <Grid container spacing={4} className="m-3">
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <SummaryCard
            summaryTitle="Staff performance report"
            summaryTittleAbbr="SPAR"
            totalUpdated={props.wskpaReports.length}
            lastUpdated={props.wskpaReport.created_at}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TimerCard />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <SummaryCard
            summaryTitle="Last Fuel Disbursement Report"
            summaryTittleAbbr="SFCR"
            totalUpdated={props.wskpaReports.length}
            lastUpdated={props.wskpaReport.created_at}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          {/* <TotalProfit /> */}
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <Notification />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          {/* <UsersByDevice /> */}
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          {/* <LatestProducts /> */}
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}></Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={props.checklistError}
        // onClose={}
        message={props.checklistError}
        key={vertical + horizontal}
      />
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
  checklistError: state.checklist.checklistError,
  latestReport: state.reports.latestReport,
});

export default connect(mapStateToProps, null)(Home);
