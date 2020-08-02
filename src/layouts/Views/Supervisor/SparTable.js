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
import { getAllWskpa, getAllWskpaById } from "../../../actions/adminAction";
import { Card, CardHeader, Grid, Container } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import Skeleton from "@material-ui/lab/Skeleton";
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const SparTable = (props) => {
  useEffect(() => {
    props.getAllWskpa();
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
              <TableCell>Report by</TableCell>
              <TableCell>Time</TableCell>
              <TableCell align="right">Staff's Full Name</TableCell>
              <TableCell align="right">Staff's Revenue Per Day</TableCell>
              <TableCell align="right">Staff's overall Percentage </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.isGettingAllWska ? (
                  <TableRow>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                  </TableRow>
              ) :
              props.wskpaReports.length > 0 ? (
              props.wskpaReports.map((item) => (
                <Row key={item.id} item={item} />
              ))
            ) :  <p>No data</p>}
          </TableBody>
        </Table>
      </TableContainer>
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
          {item.user.name}
        </TableCell>
        <TableCell align="right">{item.full_name}</TableCell>
        <TableCell align="right">{item.created_at}</TableCell>
        <TableCell align="right">{item.revenue_per_day}</TableCell>
        <TableCell align="right">{item.workPercentage}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>punctuality</TableCell>
                    <TableCell>accountability</TableCell>
                    <TableCell>Customer Relations and retentive Skill</TableCell>
                    <TableCell>Appearance</TableCell>
                    <TableCell>General Equipment Maintenance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{item.punctuality}</TableCell>
                    <TableCell>{item.accountability}</TableCell>
                    <TableCell>{item.cr_rs}</TableCell>
                    <TableCell>{item.appearance}</TableCell>
                    <TableCell>{item.general_equipment_maintenance}</TableCell>
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

SparTable.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({
  wskpaReports: state.admin.allWska,
  isGettingAllWska: state.admin.isGettingAllWska,
});

const mapDispatchToProps = {
  getAllWskpa, getAllWskpaById
};

export default connect(mapStateToProps, mapDispatchToProps)(SparTable);
