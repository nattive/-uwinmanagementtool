import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";
import { connect } from 'react-redux'
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt={props.manager.user.name}
        className={classes.avatar}
        component={RouterLink}
        src={props.manager.user.thumbnail_url}
        to="/update/profile"
      />
      <Typography className={classes.name} variant="h6">
        {props.manager.user.name}
      </Typography>
      <Typography variant="body2">{props.manager.user.phoneNumber}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  checkExist: state.checklist.isExist,
  checklist: state.checklist.open,
  manager: state.auth.manager,
});

export default connect(mapStateToProps, null)(Profile);
