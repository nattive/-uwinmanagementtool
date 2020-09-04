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
  IconButton,
} from "@material-ui/core";
import ReplayIcon from '@material-ui/icons/Replay';
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
  const [unsettledWinnings, setUnsettledWinnings] = useState(0);
  const [totalPayout, setTotalPayout] = useState(0);
  const [balance, setBalance] = useState(0);

  const HandleTotals = () => {
    setExpenseTotal(Number(misc) + Number(totalPayout) + Number(onlineBalance) + Number(fuel) + Number(pos));
    setTotalRunCred(Number(eCreditFunded) + Number(cashFunded) + Number(unsettledWinnings));
    setExpectedCashAtHand(Number(totalRunCred) - Number(expenseTotal));
    setSubTotal2(Number(expenseTotal) + Number(onlineBalance));
    setBalance(Number(actualCashAtHand) - Number(expectedCashAtHand));
  };
  const handleSubmit = () => {
    HandleTotals()
    const data = {
      misc: Number(misc),
      totalPayout: Number(totalPayout),
      fuel: Number(fuel),
      pos: Number(pos),
      eCreditFunded: Number(eCreditFunded),
      cashFunded: Number(cashFunded),
      unsettledWinnings: Number(unsettledWinnings),
      totalRunCred: Number(totalRunCred),
      expenseTotal: Number(expenseTotal),
      onlineBalance: Number(onlineBalance),
      actualCashAtHand: Number(actualCashAtHand),
      expectedCashAtHand: Number(expectedCashAtHand),
      totalRunCred: Number(totalRunCred),
      expenseTotal: Number(expenseTotal),
      expectedCashAtHand: Number(expectedCashAtHand),
      setBalance: Number(setBalance),
    };

    props.storeSalesReport({ data });
  };
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
              <Typography
                variant="subtitle1"
                component="h6"
                color="secondary"
                className="p-3"
              >
                Credit
              </Typography>
              <form className={classes.root} noValidate autoComplete="off">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
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
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="CASH FUNDED"
                      value={cashFunded}
                      onChange={(e) => setCashFunded(e.target.value)}
                      onBlur={() => HandleTotals()}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="UNPAID WINNINGS"
                      value={unsettledWinnings}
                      onBlur={() => HandleTotals()}
                      onChange={(e) => setUnsettledWinnings(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <FormControl className={classes.textField} style={{ float: 'right' }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">
                      Total Credit
                  </InputLabel>
                    <FilledInput
                      aria-label="Summation of credit, cash funded and unpaid winnings"
                      id="filled-adornment-amount"
                      value={totalRunCred}
                      disabled
                      startAdornment={
                        <InputAdornment position="start"> ₦</InputAdornment>
                      }
                    />
                    <small className="text-muted">
                      Summation of all Credit"
            </small>
                  </FormControl>
                </Grid>
              </form>
              <div style={{ margin: '20px 0' }}>
                <Divider variant='middle' />
                <Typography
                  variant="subtitle1"
                  component="h6"
                  color="secondary"
                  className="p-3"
                >
                  Expense
              </Typography>
                <Divider variant='middle' />
              </div>
              <Grid container spacing={3} >
                {/* <form className={classes.root} noValidate autoComplete="off"> */}
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="PAID WINNINGS"
                      type="number"
                      variant="outlined"
                      value={totalPayout}
                      onChange={(e) => setTotalPayout(e.target.value)}
                      onBlur={() => HandleTotals()}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="FUEL"
                      value={fuel}
                      onChange={(e) => setFuel(e.target.value)}
                      onBlur={() => HandleTotals()}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="MISCELLENOUS EXPENSES"
                      value={misc}
                      onBlur={() => HandleTotals()}
                      onChange={(e) => setMisc(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  {/* </form> */}
              </Grid>
              <div style={{margin: '2em'}} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="POS/TRANSFER"
                    value={pos}
                    onBlur={() => HandleTotals()}
                    onChange={(e) => setPos(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="ONLINE BALANCE"
                    value={onlineBalance}
                    onBlur={() => HandleTotals()}
                    onChange={(e) => setOnlineBalance(e.target.value)}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl className={classes.textField} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">
                      Total Expenditure
                  </InputLabel>
                    <FilledInput
                      aria-label="Summation all expense"
                      id="filled-adornment-amount"
                      value={expenseTotal}
                      disabled
                      startAdornment={
                        <InputAdornment position="start"> ₦</InputAdornment>
                      }
                    />
                    <small className="text-muted">
                      Summation of all expense"
            </small>
                  </FormControl>
                </Grid>
              </Grid>
              <div className="clearfix"></div>
              {/* Totals */}
              <div style={{ margin: '20px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography
                    variant="subtitle1"
                    component="h6"
                    color="secondary"
                    className="p-3"
                  >
                    Totals
              </Typography>
                  <Button
                    variant="text"
                    color="secondary"
                    startIcon={<ReplayIcon />}
                    onClick={HandleTotals}
                    style={{ padding: 10, margin: 3 }}
                  >
                    Re-Calculate
                  </Button>
                </div>
                <Divider variant='middle' />
              </div>
              <form className={classes.root} noValidate autoComplete="off">
                <Grid container spacing={3} >
                  <Grid item xs={12} md={4}>
                    <FormControl className={classes.textField} variant="filled">
                      <InputLabel htmlFor="filled-adornment-amount">
                        EXPECTED CASH
                  </InputLabel>
                      <FilledInput
                        aria-label="Summation of credit and unpaid winnings"
                        id="filled-adornment-amount"
                        value={expectedCashAtHand}
                        disabled
                        startAdornment={
                          <InputAdornment position="start"> ₦</InputAdornment>
                        }
                      />
                      <small className="text-muted">
                        The amount expected to be with you
            </small>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      className={classes.textField}
                      id="outlined-basic"
                      label="ACTUAL CASH"
                      value={actualCashAtHand}
                      onBlur={() => HandleTotals()}
                      onChange={(e) => setActualCashAtHand(e.target.value)}
                      variant="outlined"
                      helperText='The actual cash at hand'
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl className={classes.textField} variant="filled">
                      <InputLabel htmlFor="filled-adornment-amount">
                        BALANCE
                  </InputLabel>
                      <FilledInput
                        aria-label="Summation of credit and unpaid winnings"
                        id="filled-adornment-amount"
                        value={balance}
                        disabled
                        startAdornment={
                          <InputAdornment position="start"> ₦</InputAdornment>
                        }
                      />
                      <small className="text-muted">
                        This is expected to be zero, if it's negative, your account is not balance
                      </small>
                    </FormControl>
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
                  {props.isSendingSR ? (<> <CircularProgress size={20} /> <p>Sending Report</p> </>) : " Send Report"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          {/* <FormControl className={classes.textField} variant="filled">
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
          </FormControl> */}

          {/* 
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
          </FormControl> */}

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
