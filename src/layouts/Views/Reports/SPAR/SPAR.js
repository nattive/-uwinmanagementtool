import React from "react";
import {
  Container,
  Grid,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import SidebarContent from "../SidebarContent";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  getAppraisalPercent,
  storeWSKPA,
} from "../../../../actions/reportAction";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(4),
  },
  textField: {
    margin: theme.spacing(2),
  },
  topDivider: {
    marginBottom: theme.spacing(4),
  },
  headerTitle: {
    marginTop: theme.spacing(8),
    fontVariant: "uppercase",
  },
  fromContainer: {
    marginTop: theme.spacing(8),
    display: "flex",
  },
}));
function Spar(props) {
  const classes = useStyles();
  const [full_name, setfullName] = useState("");
  const [work_attendance, setWorkAttendance] = useState(0);
  const [punctuality, setPunctuality] = useState(0);
  const [accountability, setAccountability] = useState(0);
  const [cr_rs, setCrRs] = useState(0);
  const [revenue_per_day, setRevenuePerDay] = useState(0);
  const [appearance, setAppearance] = useState(0);
  const [
    general_equipment_maintenance,
    setGeneralEquipmentMaintenance,
  ] = useState(0);

  const handleSend = () => {
    const data = {
      full_name,
      work_attendance,
      punctuality,
      accountability,
      cr_rs,
      revenue_per_day,
      general_equipment_maintenance,
      appearance,
      workPercentage: props.workPercentage,
    };
    props.storeWSKPA({data });
  };
  // getAppraisalPercent;
  const textField = [
    {
      name: "full_name",
      placeholder: "Full Name",
      value: full_name,
      type: "text",
      helpText: "rate 1-10 (10 being the highest)",
      onChange: (e) => setfullName(e.target.value),
    },
    {
      name: "work_attendance",
      placeholder: "Work Attendance",
      value: work_attendance,
      type: "number",
      helpText: "rate 1-10 (10 being the highest)",
      onChange: (e) =>
        setWorkAttendance(
          Number(e.target.value) > 10 ? 10 : Number(e.target.value)
        ),
    },
    {
      name: "punctuality",
      placeholder: "Punctually",
      value: punctuality,
      type: "number",
      helpText: "rate 1-10 (10 being the highest)",
      onChange: (e) =>
        setPunctuality(
          Number(e.target.value) > 10 ? 10 : Number(e.target.value)
        ),
    },
    {
      name: "accountability",
      placeholder: "Accountability",
      value: accountability,
      type: "number",
      helpText: "rate 1-10 (10 being the highest)",
      onChange: (e) =>
        setAccountability(
          Number(e.target.value) > 10 ? 10 : Number(e.target.value)
        ),
    },
    {
      name: "cr_rs",
      placeholder: "Customer Relation Skill",
      value: cr_rs,
      type: "number",
      onChange: (e) =>
        setCrRs(Number(e.target.value) > 10 ? 10 : Number(e.target.value)),
      helpText:
        "Customer Relation/Retention Skill | rate 1-10 (10 being the highest)",
    },
    {
      name: "revenue_per_day",
      placeholder: "Revenue Per/day",
      value: revenue_per_day,
      type: "number",
      helpText: "rate 1-10 (10 being the highest)",
      onChange: (e) =>
        setRevenuePerDay(
          Number(e.target.value) > 10 ? 10 : Number(e.target.value)
        ),
    },
    {
      name: "appearance",
      placeholder: "Appearance",
      value: appearance,
      type: "number",
      helpText: "rate 1-10 (10 being the highest)",
      onChange: (e) =>
        setAppearance(
          Number(e.target.value) > 10 ? 10 : Number(e.target.value)
        ),
    },
    {
      name: "general_equipment_maintenance",
      type: "number",
      value: general_equipment_maintenance,
      helpText:
        "General Equipment Maintenance | Rate 1-10 (10 being the highest)",
      placeholder: "Maintenance",
      onChange: (e) =>
        setGeneralEquipmentMaintenance(
          Number(e.target.value) > 10 ? 10 : Number(e.target.value)
        ),
    },
  ];

  return (
    <Container className={classes.root}>
      <Grid item sm={12} md={9}>
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              component="h6"
              color="primary"
              className="p-3"
            >
              STAFFS KEY PERFORMANCE APPRAISALS
            </Typography>
            <Typography className={classes.topDivider} />
            <form className={classes.root} noValidate autoComplete="off">
              <Grid container>
                {textField.map((field, key) => (
                  <Grid xs={12} sm={6} md={4} key={key}>
                    <TextField
                      id={
                        field.type === "text"
                          ? "standard-multiline-flexible"
                          : "standard-number"
                      }
                      label={field.placeholder}
                      type={field.type}
                      onChange={field.onChange}
                      value={field.value}
                      helperText={field.helpText}
                      InputProps={{ inputProps: { min: 0, max: 10 } }}
                      onBlur={() =>
                        props.getAppraisalPercent(
                          work_attendance,
                          punctuality,
                          accountability,
                          cr_rs,
                          revenue_per_day,
                          appearance,
                          general_equipment_maintenance
                        )
                      }
                      className={classes.textField}
                    />
                  </Grid>
                ))}
              </Grid>
            </form>
            <div className="float-right">
              {props.loadingState ? (
                <CircularProgress />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className="m-4"
                  onClick={() => handleSend()}
                >
                  Send Report
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={12} md={3}>
        <SidebarContent />
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  loadingState: state.reports.loadingState,
  success: state.reports.success,
  workPercentage: state.reports.workPercentage,
});

export default connect(mapStateToProps, { getAppraisalPercent, storeWSKPA })(
  Spar
);
