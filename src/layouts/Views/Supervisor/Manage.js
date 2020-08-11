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
import { getAllRoles, admin_GetUsers } from "../../../actions/adminAction";
import { Card, CardHeader, Grid, Container, FormControlLabel, Checkbox } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Link, useRouteMatch } from "react-router-dom";
const useRowStyles = makeStyles({
    root: {
        "& > *": {
            borderBottom: "unset",
        },
    },
});

const Manage = (props) => {
    useEffect(() => {
        props.admin_GetUsers();
        props.getAllRoles();
    }, []);
    const { path } = useRouteMatch()
    return (
        <Container>
            <Card>
                <CardHeader
                    action={
                        <IconButton component={Link} to={`manager/create`}>
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
                            <TableCell>Position</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Activate/Deactivate</TableCell>
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
                                    {
                                        props.fetchedRoles && props.fetchedRoles.roles.map > 0 ?
                                            props.fetchedRoles.roles.map(role => (
                                                <TableRow>
                                                    <TableCell>{role.name}</TableCell>
                                                    <TableCell>can see all report</TableCell>
                                                    <TableCell> <FormControlLabel
                                                        control={<Checkbox checked onClick={() => alert('role assigned')} />}
                                                        label="Active"
                                                    /></TableCell>
                                                </TableRow>
                                            )) : <p>No data</p>
                                    }
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
    adminIsFetchingUsers: state.admin.adminIsFetchingUsers,
    managers: state.admin.adminFetchedUsers,
    adminFetchedUser: state.admin.adminFetchedUser,
    errorAdminFetchingUser: state.admin.errorAdminFetchingUser,
    FetchingRoles: state.admin.FetchingRoles,
    fetchedRoles: state.admin.fetchedRoles,
    errorFetchingRole: state.admin.errorFetchingRole,
});

const mapDispatchToProps = {
    admin_GetUsers,
    getAllRoles
};

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
