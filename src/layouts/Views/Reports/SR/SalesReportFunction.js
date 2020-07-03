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
  InputAdornment,
  InputLabel,
  FormControl,
  FilledInput,
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
    padding: 10,
  },
  fromContainer: {
    marginTop: theme.spacing(8),
    display: "flex",
  },
}));
function SalesReportFunction() {
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
              ACCOUNT REPORT
            </Typography>
            <Typography variant="overline" className={classes.headerTitle}>
              WINNINGS
            </Typography>
            <Divider className={classes.topDivider} />
            <form className={classes.root} noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={6} md={3}>
                  <TextField
                    id="outlined-basic"
                    label="TOTAL RUNNING CREDIT"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    id="outlined-basic"
                    label="E-CREDIT FUNDED"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    id="outlined-basic"
                    label="CASH FUNDED"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <FormControl className={classes.textField} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">
                      Amount
                    </InputLabel>
                    <FilledInput
                      aria-label="Summation of credit and unpaid winnings"
                      id="filled-adornment-amount"
                      value={0}
                      disabled
                      // onChange={handleChange('amount')}
                      startAdornment={
                        <InputAdornment position="start"> ₦</InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </form>
            <Typography variant="overline" className={classes.headerTitle}>
              EXPENSES
            </Typography>
            <Divider className={classes.topDivider} />
            <form className="m-4" noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid container xs={6} md={4}>
                  <TextField id="standard-basic" label="Unsettled Winnings" />
                </Grid>
                <Grid container xs={6} md={4}>
                  <TextField id="standard-basic" label="Total Payout Winning" />
                </Grid>
                <Grid container xs={6} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="PAID OUT PLUS EXPENSES"
                    variant="outlined"
                    helperText='Summary of unsettled and payout winnings'
                  />
                </Grid>
              </Grid>
            </form>
            <form
              className={classes.fromContainer}
              noValidate
              autoComplete="off"
            >
              <Grid container spacing={3}>
                <Grid item xs={6} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="ONLINE BALANCE @ E.O.D"
                    variant="outlined"
                    fullWidth
                    // style={{ margin: 10 }}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="E-CREDIT FUNDED"
                    variant="outlined"
                    fullWidth
                    // style={{ marging: 10 }}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="EXPECTED CASH @ HAND"
                    variant="outlined"
                    fullWidth
                    // style={{ marging: 10 }}
                  />
                </Grid>
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
export default SalesReportFunction;
