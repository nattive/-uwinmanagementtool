import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useEffect } from "react";
import { showAllSalesReport } from "../../../../actions/salesReportAction";
import { Card, CardHeader, Grid, Container } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import SidebarContent from "../SidebarContent";
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export const SRTable = (props) => {
  useEffect(() => {
    props.showAllSalesReport();
  }, []);
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={9}>
          <Card>
            <CardHeader
              title="Sales Report sent by you"
              action={
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              }
            />
          </Card>

          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Sent</TableCell>
                  <TableCell align="right">Expense Total</TableCell>
                  <TableCell align="right">Total Payout</TableCell>
                  <TableCell align="right">Total Running Credit</TableCell>
                  <TableCell align="right">Online Balance @ EOD</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.SalesReports.length > 0 ? (
                  props.SalesReports.map((item) => (
                    <Row key={item.id} item={item} />
                  ))
                ) : (
                  <p>No data</p>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={3}>
          <SidebarContent />
        </Grid>
      </Grid>
    </Container>
  );
};

function Row(props) {
  const { item } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell >
          {item.created_at}
        </TableCell>
        <TableCell align="right">{item.expenseTotal}</TableCell>
        <TableCell align="right">{item.totalPayout}</TableCell>
        <TableCell align="right">{item.totalRunCred}</TableCell>
        <TableCell align="right">{item.onlineBalance}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Actual Cash at hand</TableCell>
                    <TableCell>SubTotal1</TableCell>
                    <TableCell>eCredit Funded</TableCell>
                    <TableCell>cash Funded</TableCell>
                    <TableCell>credit Unpaid Total</TableCell>
                    <TableCell>expected Cash At Hand</TableCell>
                    <TableCell>subTotal 2</TableCell>
                    <TableCell>fuel</TableCell>
                    <TableCell>misc</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{item.actualCashAtHand}</TableCell>
                    <TableCell>{item.sub_total1}</TableCell>
                    <TableCell>{item.eCreditFunded}</TableCell>
                    <TableCell>{item.cashFunded}</TableCell>
                    <TableCell>{item.creditUnpaidTotal}</TableCell>
                    <TableCell>{item.expectedCashAtHand}</TableCell>
                    <TableCell>{item.sub_total2}</TableCell>
                    <TableCell>{item.fuel}</TableCell>
                    <TableCell>{item.misc}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

SRTable.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({
  SalesReports: state.salesReport.SalesReports,
});

const mapDispatchToProps = {
  showAllSalesReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(SRTable);
