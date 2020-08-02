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
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useEffect } from "react";
import { getUsers } from "../../../actions/usersAction";
import { Card, CardHeader, Grid, Container, FormControlLabel, Checkbox } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Link } from "react-router-dom";
const useRowStyles = makeStyles({
    root: {
        "& > *": {
            borderBottom: "unset",
        },
    },
});

const Manage = (props) => {
    useEffect(() => {
        props.getUsers();
    }, []);
    return (
        <Container>
            <Card>
                <CardHeader
                    action={
                        <IconButton component={'a'} href='/createManager'>
                            <AddBoxIcon />
                        </IconButton>
                    }
                />
            </Card>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Full Name</TableCell>
                            <TableCell align="right">Position</TableCell>
                            <TableCell align="right">Location</TableCell>
                            <TableCell align="right">Activate/Deactivate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.managers.length > 0 ? (
                            props.managers.map((item) => (
                                <Row key={item.id} item={item} />
                            ))
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
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="left">{item.duty}</TableCell>
                <TableCell align="left">{'lagos'}</TableCell>
                <TableCell align="left">{item.isActive ? "true" : "false"}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Assign a Role
                             </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Role</TableCell>
                                        <TableCell>Permissions</TableCell>
                                        <TableCell>Activate</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Supervisor</TableCell>
                                        <TableCell>can see all report</TableCell>
                                        <TableCell> <FormControlLabel
                                            control={<Checkbox checked name="Supervisor" />}
                                            label="Active"
                                        /></TableCell>
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

Manage.propTypes = {
    prop: PropTypes,
};

const mapStateToProps = (state) => ({
    managers: state.managers.allManagers,

});

const mapDispatchToProps = {
    getUsers,

};

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
