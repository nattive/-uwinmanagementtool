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
    getAllChecklists,
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

// sales
// 
const Checklist = (props) => {
    useEffect(() => {
        props.getAllChecklists();
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
                            <TableCell component="th" scope="row">
                                Checklist Checked by
              </TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell align="right">Timing</TableCell>
                            <TableCell align="right">Review</TableCell>
                            <TableCell align="right">Last Checked </TableCell>
                            <TableCell align="right">Next checklist</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.gettingAllChecklists ? (
                                <TableRow>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                </TableRow>
                            ) :
                                props.allChecklists && props.allChecklists.length > 0 ? (
                                    props.allChecklists.map((item) => <Row {...props} key={item.id} item={item} />)
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

    // 
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>{item.user.name}</TableCell>
                <TableCell>{`${item.created_at} (${item.lastChecked})`}</TableCell>
                <TableCell align="right">{item.isLate}</TableCell>
                <TableCell align="right">{item.isOkay}</TableCell>
                <TableCell align="right">{item.lastChecked}</TableCell>
                <TableCell align="right">{item.nextChecklist}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Checklist.propTypes = {
    prop: PropTypes,
};

const mapStateToProps = (state) => ({
    gettingAllChecklists: state.admin.gettingAllChecklists,
    allChecklists: state.admin.allChecklists.data,
    errorGettingChecklist: state.admin.errorGettingChecklist,
});

const mapDispatchToProps = {
    getAllChecklists,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checklist);
