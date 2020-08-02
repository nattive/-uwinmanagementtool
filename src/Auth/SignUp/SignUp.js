import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { register, generatePassword } from "../../actions/authAction";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const [HeadOfManager, setHeadOfManager] = useState();
  const [name, setName] = useState();
  const [showPassword, setshowPassword] = useState(true);
  const genPassword = props.genPassword;
  const [password, setPassword] = useState(genPassword);
  const [business_unit, setBusiness_unit] = useState();
  const [isHOM, setIsHOM] = useState(false);
  const [duty, setDuty] = useState();
  const [email, setEmail] = useState();
  const [head_of_manager_id, setHead_of_manager_id] = useState();

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleRegister = () => {
    const data = {
      HeadOfManager,
      name,
      password,
      business_unit,
      isHOM,
      duty,
      email,
      head_of_manager_id,
    };
    props.register(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {/* <Alert severity='error'>{}</Alert> */}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Full Name"
                autoFocus
                error={props.registerErrors && props.registerErrors.password}
                // helperText={
                //   props.registerErrors && props.registerErrors.password
                // }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => setBusiness_unit(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Business Unit"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                autoComplete="email"
                error={props.registerErrors && props.registerErrors.email}
                helperText={props.registerErrors && props.registerErrors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </Grid>
          </Grid>
          <Grid container justify="flex-start">
            <Grid item>
              <Checkbox
                checked={isHOM}
                onChange={(event) => {
                  setIsHOM(event.target.checked);
                }}
                inputProps={{ "aria-label": "Check if this manager is an HOD" }}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleRegister()}
            className={classes.submit}
          >
            {props.authIsLoading === true ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              "Create Manager Account"
            )}
          </Button>
          <Grid container justify="flex-end">
            <Grid item></Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  manager: state.auth.manager,
  authIsLoading: state.auth.authIsLoading,
  loginError: state.auth.loginError,
  genPassword: state.auth.genPassword,
  registerStatus: state.auth.registerStatus,
  registerErrors: state.auth.registerError && state.auth.registerError.errors,
  registerError: state.auth.registerError,
});

const mapDispatchToProps = {
  register,
  generatePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
