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
import { getAllSFCR } from "../../../../actions/SfcrReportAction";
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

const SFCRTable = (props) => {
  useEffect(() => {
    props.getAllSFCR();
  }, []);
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={9}>
          <Card>
            <CardHeader
              title="Standard Fuel Consumption Report sent by you"
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
                  <TableCell align="right">Date Supplied</TableCell>
                  <TableCell align="right">Date Finished</TableCell>
                  <TableCell align="right">Usage Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.sfcrReports.length > 0 ? (
                  props.sfcrReports.map((item) => (
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
        <TableCell>{item.created_at}</TableCell>
        <TableCell align="right">{item.date_finished}</TableCell>
        <TableCell align="right">{item.date_supplied}</TableCell>
        <TableCell align="right">{item.usage_duration}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Volume</TableCell>
                    <TableCell>Petrol Station</TableCell>
                    <TableCell>ApprovedBy</TableCell>
                    <TableCell>Price Per Litre</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{item.volume}</TableCell>
                    <TableCell>{item.petrol_station}</TableCell>
                    <TableCell>{item.isApprovedBy}</TableCell>
                    <TableCell>{item.pricePerLitre}</TableCell>
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

SFCRTable.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({
  sfcrReports: state.reports.sfcrReports,
});

const mapDispatchToProps = {
  getAllSFCR,
};

export default connect(mapStateToProps, mapDispatchToProps)(SFCRTable);
