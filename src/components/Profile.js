import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";
import { verifyRedirect } from '../actions/authAction'
import { connect } from 'react-redux'
import { useEffect } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
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
  useEffect(() => {
    !props.manager.user && props.verifyRedirect()
    // callEveryHour()
  }, [])

  //   const callEveryHour = () => {
  //     setInterval(props.checkExist(), (1000 * 60 * 60) * 3);
  // }
  const classes = useStyles();
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      {
        props.manager !== undefined ?
          <>
            <Avatar
              alt={props.manager.name}
              className={classes.avatar}
              component={RouterLink}
              src={props.manager.thumbnail_url}
              to="/update/profile"
            />
            <Typography className={classes.name} variant="h6">
              {props.manager ? props.manager.name : (<Skeleton />)}
            </Typography>
            <Typography variant="body2">{props.manager.phoneNumber || props.manager && props.manager.user && props.manager.user.phoneNumber}</Typography>
          </> : <Typography variant='body2'>Loading profile...</Typography>
      }

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

const mapDispatchToProps = {
  verifyRedirect
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
