import React, { useEffect } from "react";
import Echo from "laravel-echo";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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
import { connect, useDispatch } from "react-redux";
import ChecklistComponent from "../../components/ChecklistComponent";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Home from "../Views/Home/Home";
import Chat from "../Views/Chat";
import logo_white from "../../Assets/img/logo_white.png";
import { fetchChats, postMessage } from "../../actions/chatAction";
import { ChecklistExist } from "../../actions/checkoutAction";
import { toggleOnline } from "../../actions/chatAction";
import Report from "../Views/Reports/Report";
import Profile from "../../components/Profile";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Grow, Dialog, DialogTitle, DialogContentText, DialogActions, Button, DialogContent, Menu, MenuItem, MenuList } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Supervisor from "../Views/Supervisor"
import MailIcon from '@material-ui/icons/Mail';
import UpdateProfile from '../Views/UpdateProfile'
import Alert from "@material-ui/lab/Alert";
import { baseUrlNoApi } from "../../Misc/baseUrl";
import Notification from "../../components/Notification";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { dispatch } from "rxjs/internal/observable/pairs";
import { OPEN_NOTIFICATION, OPEN_TOP_NOTIFICATION } from "../../actions/types";
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
  barNotification: {
    width: '100%',
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
  const menuId = 'primary-search-account-menu';
  const [open, setOpen] = React.useState(props.checkExist);
  const [messageOpen, setMessageOpen] = React.useState(null);
  const [barNotification, setbarNotification] = React.useState([]);
  const isMenuOpen = Boolean(messageOpen);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleMenuClose = () => {
    setMessageOpen(null);
    setbarNotification([])
    // handleMobileMenuClose();
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };
  const { path } = useRouteMatch()
  const dispatch = useDispatch()
  const handleMessageMenuOpen = (event) => {
    setMessageOpen(event.currentTarget);
  };
  const renderMenu = (
    <Menu
      anchorEl={messageOpen}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuList>
        {
          barNotification.length > 0 ? barNotification.map(notity => (
            <List className={classes.barNotification}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ChatBubbleOutlineIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={notity.title} secondary={notity.body}/>
              </ListItem>
            </List>
          )) : null
        }

      </MenuList>
    </Menu>
  );
  useEffect(() => {

    const token = localStorage.getItem('uwin_manager_token')
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: '43c8f03f6308989dfc9b',
      cluster: 'eu',
      encrypted: false,
      authEndpoint: `${baseUrlNoApi}broadcasting/auth`,
      auth: {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    });
    let data = { isOnline: true, user_id: props.manager.user ? props.manager.user.id : undefined }
    let offline = { isOnline: false, user_id: props.manager.user ? props.manager.user.id : undefined }
    props.manager.user &&
      window.Echo
        .join('notification.' + props.manager.user.id)
        .joining(user => {
          props.toggleOnline(data)
        })
        .leaving(user => {
          props.toggleOnline(offline)
          console.log(user)
        })
        .listen('.notification', (event) => {
          barNotification.push({ title: 'New message from ' + event.sender.name, body: event.message.text })
          dispatch({ type: OPEN_NOTIFICATION, payload: event })
        })

  }, [props.manager.user]);


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
        <Notification />

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
              {props.authIsLoading ? (<CircularProgress size={22} />) : "Log In"}
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
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleMessageMenuOpen}
              color="inherit"
              style={{ float: "right" }}
            >
              <Badge badgeContent={barNotification.length} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            {renderMenu}
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
  notification: state.chat.notification,
});

export default connect(mapStateToProps, { fetchChats, ChecklistExist, toggleOnline })(Dashboard);
