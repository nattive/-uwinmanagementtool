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
import {
  getAllWskpa,
  getAllSfcr,
  getAllSales,
  approveReport
} from "../../../actions/adminAction";
import { Card, CardHeader, Grid, Container, MenuItem, Select, FormControl, InputLabel } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import Skeleton from "@material-ui/lab/Skeleton";

const useRowStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
}));

// 
// sales
// 
const SfcrAllTable = (props) => {
  useEffect(() => {
    props.getAllWskpa();
    props.getAllSfcr();
    props.getAllSales();
  }, []);
  return (
    <Container>
      <Card>
        <CardHeader
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
              <TableCell component="th" scope="row">  Sent by  </TableCell>
              <TableCell>Time</TableCell>
              <TableCell align="right">Report Date</TableCell>
              <TableCell align="right">Date Supplied</TableCell>
              <TableCell align="right">Date Finished</TableCell>
              <TableCell align="right">Usage Duration</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.isGettingAllSfcr ? (
                <TableRow>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                </TableRow>
              ) :
                props.allSfcr.length > 0 ? (
                  props.allSfcr.map((item) => <Row {...props} key={item.id} item={item} />)
                ) : (
                    <p>No data</p>
                  )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

function Row(props) {
  const { item, approveReport } = props;
  const [open, setOpen] = React.useState(false);
  const [approveSelect, setApproveSelect] = React.useState(item.isApprovedBy ? 1 : 0);
  const classes = useRowStyles();
  const handleChange = (event) => {
    setApproveSelect(event.target.value)
    const data = {
      report: 'sfcr',
      report_id: item.id,
    }
    approveReport(data)
  }
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
        <TableCell>{item.user.name}</TableCell>
        <TableCell>{item.created_at}</TableCell>
        <TableCell align="right">{item.report_date}</TableCell>
        <TableCell align="right">{item.date_supplied}</TableCell>
        <TableCell align="right">{item.date_finished}</TableCell>
        <TableCell align="right">{item.usage_duration}</TableCell>
        <TableCell>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Approve Report
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChange}
              value={approveSelect}
            >
              <MenuItem disabled value={0}>
                {item.isApprovedBy ? "Approved" : "Unapproved"}
              </MenuItem>
              <MenuItem value={1}>{"Approve"}</MenuItem>

              <MenuItem value={0}>{"Disapprove"}</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
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

SfcrAllTable.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({
  isGettingAllSfcr: state.admin.isGettingAllSfcr,
  errGettingAllSfcr: state.admin.errGettingAllSfcr,
  allSfcr: state.admin.allSfcr,
});

const mapDispatchToProps = {
  getAllWskpa,
  getAllSfcr,
  getAllSales,
  approveReport
};

export default connect(mapStateToProps, mapDispatchToProps)(SfcrAllTable);
