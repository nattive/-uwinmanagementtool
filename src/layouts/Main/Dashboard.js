import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { secondaryListItems, MainListItems } from "../../components/listItems";
import { Switch, Route, BrowserRouter, useHistory, Link, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import ChecklistComponent from "../../components/ChecklistComponent";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Home from "../Views/Home/Home";
import Chat from "../Views/Chat";
import logo_white from "../../Assets/img/logo_white.png";
import { fetchChats, postMessage } from "../../actions/chatAction";
import { ChecklistExist } from "../../actions/checkoutAction";
import Report from "../Views/Reports/Report";
import Profile from "../../components/Profile";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Grow, Dialog, DialogTitle, DialogContentText, DialogActions, Button, DialogContent } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Fab from "@material-ui/core/Fab";
import Supervisor from "../Views/Supervisor"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import UpdateProfile from '../Views/UpdateProfile'
import Alert from "@material-ui/lab/Alert";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  flexgrow: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    // marginTop: theme.spacing(4),
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fabButton: {
    display: "flex",
    margin: 10,
    zIndex: 100,
    position: "fixed",
    bottom: 0,
    right: 0,
    top: "80%",
    left: "80%",
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.checkExist);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };
  const { path } = useRouteMatch()
  useEffect(() => {
    props.fetchChats();
    props.ChecklistExist();
    props.redirectTo && history.push(props.redirectTo)
  }, []);
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <Backdrop className={classes.backdrop} open={props.appIsLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      

          <Dialog
          open={!props.isLogin && !props.authIsLoading && !props.appIsLoading}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{props.isLogin === 'wait' ? "Authenticating" : "You are Logged out!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              {props.authIsLoading ? (
                  <Alert severity="info">Checking Your login status</Alert>
                ) : <> <Alert severity="error">You are not logged in, Please proceed to the Log in page to continue using this App</Alert>

                  </>}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button component={'a'} href='/login' color="primary" autoFocus>
              {props.authIsLoading  ? (<CircularProgress size={22} />) : "Log In"}
              </Button>
            </DialogActions>
          </Dialog>
            <div>
          {/* <Dialog
            open={props.err}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Error occurred!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Alert severity="error">{props.err || 'An error occurred'}</Alert>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>props.ChecklistExist()} color="primary" autoFocus>
                refresh
                    </Button>
            </DialogActions>
          </Dialog> */}
        </div>
        <div>
        </div>


        <CssBaseline />
        <AppBar
          position="absolute"
          elevation={0}
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <img src={logo_white} alt="uwinit logo" style={{ width: 100 }} />
            <div className={classes.flexgrow} />
            <IconButton color="inherit" style={{ float: "right" }}>
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {open && <Profile className="m-2" />}
          <Divider />
          <List>
            <MainListItems />
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <ChecklistComponent />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/reports">
              <Report />
            </Route>
            <Route path="/chat">
              <Chat />
            </Route>
            <Route path="/update/profile">
              <UpdateProfile />
            </Route>
            <Route path="/supervisor">
              <Supervisor />
            </Route>
          </Switch>
          {/* <div className={classes.fabButton}>
            <Fab color="primary" onClick={handleGoBack} aria-label="back">
              <ArrowBackIosIcon />
            </Fab>
            <Fab color="primary" onClick={handleGoBack} aria-label="forward">
              <ArrowForwardIosIcon />
            </Fab>
          </div> */}
        </main>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => ({
  checkExist: state.checklist.isExist,
  checklist: state.checklist.open,
  err: state.checklist.err,
  manager: state.auth.manager,
  redirectTo: state.auth.redirectTo,
  isLogin: state.auth.isLogin,
  appIsLoading: state.loadingState.appIsLoading,
  wskpaReports: state.reports.wskpaReports,
});

export default connect(mapStateToProps, { fetchChats, ChecklistExist })(Dashboard);
