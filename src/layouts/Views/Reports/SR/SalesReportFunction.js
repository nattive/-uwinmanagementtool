import React, { useRef } from "react";
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
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import SidebarContent from "../SidebarContent";
import { storeSalesReport } from "../../../../actions/salesReportAction";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import { useEffect } from "react";

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
function SalesReportFunction(props) {
  const classes = useStyles();
  const [totalRunCred, setTotalRunCred] = useState(0);
  const [eCreditFunded, setECreditFunded] = useState(0);
  const [cashFunded, setCashFunded] = useState(0);
  const [creditUnpaidTotal, setCreditUnpaidTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [onlineBalance, setOnlineBalance] = useState(0);
  const [ecreditBalance, setEcreditBalance] = useState(0);
  const [expectedCashAtHand, setExpectedCashAtHand] = useState(0);
  const [actualCashAtHand, setActualCashAtHand] = useState(0);
  const [sub_total1, setSubTotal1] = useState(0);
  const [sub_total2, setSubTotal2] = useState(0);
  const [fuel, setFuel] = useState(0);
  const [misc, setMisc] = useState(0);
  const [pos, setPos] = useState(0); //add

  const HandleTotals = () => {
    setExpenseTotal(Number(misc) + Number(totalPayout) + Number(fuel) + Number(pos));
    setTotalRunCred(Number(eCreditFunded) + Number(cashFunded) + Number(unsettledWinnings));
    setSubTotal1(Number(unsettledWinnings) + Number(totalRunCred)); // yank
    setExpectedCashAtHand(Number(expenseTotal) - Number(totalRunCred));
    setSubTotal2(Number(expenseTotal) + Number(onlineBalance));
  };
  const handleSubmit = () => {
    const data = {
      unsettledWinnings,
      totalPayout,
      actualCashAtHand,
      sub_total1,
      totalRunCred,
      eCreditFunded,
      cashFunded, //
      creditUnpaidTotal,
      expenseTotal,
      onlineBalance,
      expectedCashAtHand,
      sub_total2,
      fuel,
      misc,
    };

    props.storeSalesReport({ data });
  };
  const [unsettledWinnings, setUnsettledWinnings] = useState(0);
  const [totalPayout, setTotalPayout] = useState(0);
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    swal("Successful", props.successMessageSR, "success");
  }, [props.successMessageSR]);

  return (
    <Container>
      <Grid container>
        <Grid item sm={12} xs={12} md={9}>
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
              <Divider className={classes.topDivider} />
              <form className={classes.root} noValidate autoComplete="off">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="E-CREDIT FUNDED"
                      type="number"
                      variant="outlined"
                      value={eCreditFunded}
                      onChange={(e) => setECreditFunded(e.target.value)}
                      onBlur={() => HandleTotals()}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="CASH FUNDED"
                      value={cashFunded}
                      onChange={(e) => setCashFunded(e.target.value)}
                      onBlur={() => HandleTotals()}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </form>
              <Grid container>
                <Grid item sm={12} md={6}>
                  <Typography
                    variant="overline"
                    className={classes.headerTitle}
                  >
                    WINNINGS
                  </Typography>
                  <Divider className={classes.topDivider} />

                  <form className="m-4" noValidate autoComplete="off">
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={6}>
                        <TextField
                          id="standard-basic"
                          value={unsettledWinnings}
                          onBlur={() => HandleTotals()}
                          onChange={(e) => setUnsettledWinnings(e.target.value)}
                          label="Unsettled Winnings"
                        />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <TextField
                          id="standard-basic"
                          onBlur={() => HandleTotals()}
                          value={totalPayout}
                          onChange={(e) => setTotalPayout(e.target.value)}
                          label="Total Payout"
                        />
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
                <Grid item sm={12} md={6}>
                  <Typography
                    variant="overline"
                    className={classes.headerTitle}
                  >
                    EXPENSES
                  </Typography>
                  <Divider className={classes.topDivider} />
                  <form className="m-4" noValidate autoComplete="off">
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="standard-basic"
                          value={fuel}
                          onBlur={() => HandleTotals()}
                          onChange={(e) => setFuel(e.target.value)}
                          label="Fuel"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="standard-basic"
                          onBlur={() => HandleTotals()}
                          value={misc}
                          onChange={(e) => setMisc(e.target.value)}
                          label="Miscellaneous/POS"
                        />
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>

              <form
                className={classes.fromContainer}
                noValidate
                autoComplete="off"
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="ONLINE BALANCE @ E.O.D"
                      variant="outlined"
                      fullWidth
                      value={onlineBalance}
                      onChange={(e) => setOnlineBalance(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      value={actualCashAtHand}
                      onChange={(e) => setActualCashAtHand(e.target.value)}
                      label="ACTUAL CASH @ HAND"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="EXPECTED CASH @ HAND"
                      variant="outlined"
                      fullWidth
                      disabled
                      value={expectedCashAtHand}
                    />
                  </Grid>
                </Grid>
              </form>
              <div className="float-right">
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  className="m-4"
                  disabled={props.isSendingSR}
                >
                  {props.isSendingSR ? <CircularProgress size={24} /> : " Send Report"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <FormControl className={classes.textField} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">SubTotal</InputLabel>
            <FilledInput
              aria-label="Summation of credit and unpaid winnings"
              id="filled-adornment-amount"
              value={sub_total1}
              disabled
              startAdornment={
                <InputAdornment position="start"> ₦</InputAdornment>
              }
            />
            <small className="text-muted">
              Summation of credit and unsettled winnings"
            </small>
          </FormControl>
          <FormControl className={classes.textField} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">
              SubTotal 2
            </InputLabel>
            <FilledInput
              aria-label="Summation of credit and unpaid winnings"
              id="filled-adornment-amount"
              value={sub_total2}
              disabled
              startAdornment={
                <InputAdornment position="start"> ₦</InputAdornment>
              }
            />
            <small className="text-muted">
              Summation of expense and online balance"
            </small>
          </FormControl>

          <FormControl className={classes.textField} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">
              RUNNING CREDIT
            </InputLabel>
            <FilledInput
              aria-label="Summation of credit and cash funded"
              id="filled-adornment-amount"
              value={totalRunCred}
              style={{ width: "100%" }}
              disabled
              // onChange={handleChange('amount')}
              startAdornment={
                <InputAdornment position="start"> ₦</InputAdornment>
              }
            />
            <small className="text-muted">
              Summation of credit and cash funded
            </small>
          </FormControl>
          <FormControl className={classes.textField} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">
              Expense 3Total
            </InputLabel>
            <FilledInput
              aria-label="Summation of total payout, POS/MISC and fuel"
              id="filled-adornment-amount"
              value={expenseTotal}
              disabled
              // onChange={handleChange('amount')}
              startAdornment={
                <InputAdornment position="start"> ₦</InputAdornment>
              }
            />
            <small className="text-muted">
              Summation of total payout, POS/MISC
            </small>
          </FormControl>

          <SidebarContent />
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isSendingSR: state.salesReport.isSendingSR,
  successMessageSR: state.salesReport.successMessageSR,
});

const mapDispatchToProps = {
  storeSalesReport,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesReportFunction);
