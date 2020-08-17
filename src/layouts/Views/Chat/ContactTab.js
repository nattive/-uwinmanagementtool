import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { getUser } from "../../../actions/usersAction";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../../actions/usersAction";
import { initPrivateChat } from "../../../actions/chatAction";
import Badge from '@material-ui/core/Badge';
import { ChatItem } from 'react-chat-elements'

import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { OPEN_CHAT } from "../../../actions/types";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
// }));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

function ContactTab(props) {
  const dispatch = useDispatch()
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    props.getUsers();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleInitChat = (user) => {
    dispatch({ type: OPEN_CHAT, payload: user})
    props.initPrivateChat(user.id);
    // props.getUser(user.id);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Recent Chat" {...a11yProps(0)} />
          <Tab label="All Managers" {...a11yProps(1)} />
          <Tab label="Your Groups" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          value={value}
          index={0}
          dir={theme.direction}
          style={{ height: "450px", overflowY: "scroll" }}
        >
          {props.chats.length && props.chats.map(chat => (
            <ChatItem
              avatar={chat.user.thumbnail_url}
              alt={chat.user.name}
              title={chat.user.name}
              subtitle={chat.text}
              date={chat.created_at}
              unread={0} />
          ))}
          {/* {props.privateChats.length > 0
            ? props.privateChats.map((item) => (
              <React.Fragment key={item.id}>
                <List>
                  <ListItem button onClick={() => handleInitChat(item.id)}>
                    <ListItemAvatar>
                      <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        variant="dot"
                      >
                        <Avatar alt={item.receiver.name} src={item.receiver.profile_image} />
                      </StyledBadge>

                    </ListItemAvatar>

                    <ListItemText>{item.receiver.name}</ListItemText>
                  </ListItem>
                </List>
                <Divider />
              </React.Fragment>
            ))
            : props.isFetching ? (<CircularProgress />) : (<p>No Manager</p>)} */}
        </TabPanel>
         
        <TabPanel value={value} index={1} dir={theme.direction}  style={{ height: "450px", overflowY: "scroll" }}>
          {props.managers.length > 0
            ? props.managers.map((item) => (
              <React.Fragment key={item.id}>
                <List>
                  <ListItem button onClick={() => handleInitChat(item)}>
                    <ListItemAvatar>
                      <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        variant="dot"
                      >
                        <Avatar alt={item.name} src={item.thumbnail_url} />
                      </StyledBadge>
                    </ListItemAvatar>
                    <ListItemText>{item.name}</ListItemText>
                  </ListItem>
                </List>
                <Divider />
              </React.Fragment>
            ))
            : props.isFetching ? (<CircularProgress />) : (<p>No Manager</p>)}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Coming soon
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}


const mapStateToProps = (state) => ({
  managers: state.managers.allManagers,
  isFetching: state.chat.isFetching,
  isFetchingPrivate: state.chat.isFetchingPrivate,
  privateChats: state.chat.privateChats,
  privateChatError: state.chat.privateChatError,
  chats: state.chat.chats
});

const mapDispatchToProps = {
  getUsers,
  getUser,
  initPrivateChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactTab);
