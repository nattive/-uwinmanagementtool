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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import SidebarContent from "../SidebarContent";
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
function Spar() {
  const classes = useStyles();
  const [full_name, setfullName] = useState("");
  const [work_attendance, setWorkAttendance] = useState("");
  const [punctuality, setPunctuality] = useState("");
  const [accountability, setAccountability] = useState("");
  const [cr_rs, setCrRs] = useState("");
  const [revenue_per_day, setRevenuePerDay] = useState("");
  const [appearance, setAppearance] = useState("");
  const [
    general_equipment_maintenance,
    setGeneralEquipmentMaintenance,
  ] = useState("");
  const textField = [
    {
      name: "full_name",
      placeholder: "Full Name",
      onChange: (e) => setfullName(e.target.full_name),
    },
    {
      name: "work_attendance",
      placeholder: "Work Attendance",
      onChange: (e) => setWorkAttendance(e.target.work_attendance),
    },
    {
      name: "punctuality",
      placeholder: "Punctually",
      onChange: (e) => setPunctuality(e.target.punctuality),
    },
    {
      name: "accountability",
      placeholder: "Accountability",
      onChange: (e) => setAccountability(e.target.accountability),
    },
    {
      name: "cr_rs",
      placeholder: "Customer Relation Skill",
      onChange: (e) => setCrRs(e.target.cr_rs),
      helpText: "Customer Relation/Retention Skill",
    },
    {
      name: "revenue_per_day",
      placeholder: "Revenue Per/day",
      onChange: (e) => setRevenuePerDay(e.target.revenue_per_day),
    },
    {
      name: "appearance",
      placeholder: "Appearance",
      onChange: (e) => setAppearance(e.target.appearance),
    },
    {
      name: "general_equipment_maintenance",
      helpText: "General Equipment Maintenance",
      placeholder: "Maintenance",
      onChange: (e) =>
        setGeneralEquipmentMaintenance(e.target.general_equipment_maintenance),
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
                      id="standard-multiline-flexible"
                      multiline
                      rowsMax={4}
                      label={field.placeholder}
                      helperText={field.helpText}
                      className={classes.textField}
                    />
                  </Grid>
                ))}
              </Grid>
            </form>
            <div className="float-right">
              <Button variant="contained" color="primary" className="m-4">
                Send Report
              </Button>
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

export default Spar;
