import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ButtonGroup } from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { getUser } from "../../../actions/usersAction";
import { connect, useDispatch } from 'react-redux';
import { blue } from '@material-ui/core/colors'; 
import { OPEN_CHAT } from "../../../actions/types";

import {
    fetchChats,
    initPrivateChat,
    fetchChatsById,
} from "../../../actions/chatAction";
function ChatSideAreaMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const handleInitChat = (user) => {
        dispatch({ type: OPEN_CHAT, payload: user })
        props.initPrivateChat(user.id);
        setAnchorEl2(null);
        // props.getUser(user.id);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const dispatch = useDispatch()

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const useStyles = makeStyles({
        avatar: {
            backgroundColor: blue[100],
            color: blue[600],
        },
    });
    const classes = useStyles();

    return (
        <div>
            <ButtonGroup style={{ margin: 5, padding: 5 }}>
                {/* <Button aria-controls="simple-menu" aria-haspopup="true"  onClick={handleClick}> <MoreVertIcon /></Button> */}
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick2}><MessageIcon /></Button>
                
               
            </ButtonGroup>
            {/* <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>See Manager's info</MenuItem>
                <MenuItem onClick={handleClose}>Mute Notification</MenuItem>
                <MenuItem onClick={handleClose}>Refresh</MenuItem>
            </Menu> */}

            <Dialog onClose={handleClose2} aria-labelledby="simple-dialog-title" open={Boolean(anchorEl2)}>
                <DialogTitle id="simple-dialog-title">Chat with Other Managers</DialogTitle>
                <List>
                    {props.managers && props.managers.length > 0 ?  props.managers.map((manager) => (
                        <ListItem button onClick={() => handleInitChat(manager)}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    <PersonIcon src={manager.thumbnail_url} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={manager.name} />
                        </ListItem>
                    )): 'no manager fetched'}

                    {/* <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Add account" />
                    </ListItem> */}
                </List>
            </Dialog>

        </div>
    );
}

const mapStateToProps = (state) => ({
    echo: state.chat.echo,
    isFetching: state.chat.isFetching,
    chat: state.chat.chat,
    receiver: state.chat.receiver,
    chats: state.chat.chats,
    receiver: state.chat.receiver,
    activeChat: state.chat.activeChat,
    chatError: state.chat.chatError,
    newMessage: state.chat.newMessage,
    myMessage: state.chat.myMessage,
    manager: state.auth.manager,
    managers: state.managers.allManagers,
});

const mapDispatchToProps = {
    fetchChats,
    initPrivateChat,
    getUser,
    fetchChatsById,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatSideAreaMenu);