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
import AddBoxIcon from "@material-ui/icons/AddBox";
import swal from "@sweetalert/with-react";
import Alert from '@material-ui/lab/Alert'; 
import RefreshIcon from '@material-ui/icons/Refresh';
import { useEffect } from "react";
import {
    getAllRoles,
    admin_GetUsers,
    assignRole, managerUser, deleteUser
} from "../../../actions/adminAction";
import {
    Card,
    CardHeader,
    Grid,
    Container,
    FormControlLabel,
    Checkbox,
    CircularProgress,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Link, useRouteMatch } from "react-router-dom";
import { useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
const useRowStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            borderBottom: "unset",
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const Manage = (props) => {
    useEffect(() => {
        props.admin_GetUsers();
        props.getAllRoles();
    }, []);
    useEffect(() => {
        props.roleIsAssigned &&
            swal("Successful", 'Role assigned successfully', "success");
    }, [props.roleIsAssigned]);

    const { path } = useRouteMatch();
    // roleIsAssigned
    return (
        <Container>
            <Card>
                <CardHeader
                    action={
                        <>
                            <IconButton component={Link} color="primary"  to={`/supervisor/signup`} title="Add new manager" >
                            <AddBoxIcon />
                        </IconButton>
                            <IconButton color="primary" onClick={props.admin_GetUsers} title="Reload all users" >
                                <RefreshIcon />
                            </IconButton>
                        </>
                    }
                />
            </Card>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Full Name</TableCell>
                            <TableCell>Assigned Position</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Activate/Deactivate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.errorAdminFetchingUser ? (
                                <>
                                    <TableRow>
                                        <TableCell colSpan="4">
                                            <Alert severity="error">{JSON.stringify(props.errorAdminFetchingUser)}</Alert>
                                        </TableCell>
                                    </TableRow>
                                </>) : props.adminIsFetchingUsers ? 
                                (
                                        <>
                                            <TableRow>
                                                <TableCell colSpan="4">
                                                   <Skeleton />
                                                </TableCell>
                                            </TableRow>
                                        </>
                                )
                                :
                                props.managers.length > 0 ? (
                                    props.managers.map((item) => (
                                        <Row key={item.id} item={item} {...props} />
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
    const handleAssignRole = (position, user_id) => {
        const data = {
            position,
            user_id,
        };
        console.log(data)
        props.assignRole(data);
    };
    // console.log(props.fetchedRoles);
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
                <TableCell align="left">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">{item.position}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={item.position}
                            onChange={(e) => handleAssignRole(e.target.value, item.id)}
                        >
                            <MenuItem disabled >{"Choose manager's Position"}</MenuItem>
                            <MenuItem value={'director'}>Director</MenuItem>
                            <MenuItem value={'supervisor'}>Supervisor</MenuItem>
                        </Select>
                    </FormControl>
                
                </TableCell>
                <TableCell align="left">{item.email}</TableCell>
                <TableCell align="left">
                    <Button onClick={() => props.deleteUser(item.id)} >Delete</Button>
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
    isDeleting: state.admin.isDeleting,
    FetchingRoles: state.admin.FetchingRoles,
    fetchedRoles: state.admin.fetchedRoles,
    errorFetchingRole: state.admin.errorFetchingRole,
    errAssigningRole: state.admin.errAssigningRole,
    isAssigningRole: state.admin.isAssigningRole,
    roleIsAssigned: state.admin.roleIsAssigned,

});

const mapDispatchToProps = {
    admin_GetUsers,
    getAllRoles,
    assignRole, managerUser, deleteUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
