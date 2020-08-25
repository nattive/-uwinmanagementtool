import React, { useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ButtonGroup, Divider, TextField, DialogActions, Checkbox, Typography, ListItemIcon, CircularProgress } from '@material-ui/core';
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
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import swal from "@sweetalert/with-react";
import {
    fetchChats,
    initPrivateChat,
    fetchChatsById
} from "../../../actions/chatAction";
import { createGroup } from "../../../actions/groupChat";
function ChatSideAreaMenu(props) {
    const [showGroup, setShowGroup] = React.useState(false);
    const [groupManager, setGrouproupManager] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [groupName, setGroupName] = React.useState(null);
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

    const handleAddManager = (id) => {
        groupManager.includes(id) ? setGrouproupManager(groupManager.filter(i => i !== id)) : setGrouproupManager([...groupManager, id])
    }

    const handleCreate = () => {
        const data = {
            name: groupName,
            users: groupManager
        }
        props.createGroup(data)
    }
    const handleShowGroup = () => {
        setShowGroup((prev) => !prev);
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
    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        swal("Successful", props.groupSuccess, "success");
    }, [props.groupSuccess]);
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
                {/* <DialogTitle id="simple-dialog-title">Chat with Other Managers</DialogTitle> */}

                {!showGroup ?
                    <List>
                        <ListItem>
                            <ListItemText primary='Chat with Other Managers' />
                        </ListItem>
                        <ListItem button onClick={handleShowGroup}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    <GroupAddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Create Group Chat" />
                        </ListItem>
                        <Divider style={{ margin: 15 }} />
                        {props.managers && props.managers.length > 0 ? props.managers.map((manager) => (
                            <ListItem button onClick={() => handleInitChat(manager)}>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>
                                        <PersonIcon src={manager.thumbnail_url} />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={manager.name} />
                            </ListItem>
                        )) : 'no manager fetched'}
                    </List>
                    : <>
                        <TextField
                            label="Group name"
                            id="outlined-size-small"
                            variant="outlined"
                            size="small"
                            value={groupName}
                            onChange={e => setGroupName(e.target.value)}
                            style={{ margin: 10, borderRadius: 0 }}
                        />
                        <List>
                            <ListItem button onClick={handleShowGroup}>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Chat with Other Managers" />
                            </ListItem>
                            <Divider style={{ margin: 15 }} />
                            <ListItem >
                                <ListItemText primary="Select Manager to Add to group" />
                            </ListItem>
                            {props.managers && props.managers.length > 0 ? props.managers.map((manager) => (
                                <>
                                    <ListItem key={manager.id} role='list' dense button onClick={() => handleAddManager(manager.id)}>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={groupManager.includes(manager.id)}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': manager.id }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={manager.id} primary={manager.name} />

                                    </ListItem>
                                </>
                            )) : 'no manager fetched'}
                            <Button variant='contained' style={{ width: '100%' }} color='primary' disabled={props.isCreatingGroup} onClick={handleCreate}>{props.isCreatingGroup ? <CircularProgress size={22} /> : ' Create Group'}</Button>
                        </List>
                    </>
                }
            </Dialog>

        </div>
    );
}

const mapStateToProps = (state) => ({
    echo: state.chat.echo,
    isFetching: state.chat.isFetching,
    isCreatingGroup: state.chat.isCreatingGroup,
    errCreatingGroup: state.chat.errCreatingGroup,
    group: state.chat.group,
    chat: state.chat.chat,
    receiver: state.chat.receiver,
    chats: state.chat.chats,
    receiver: state.chat.receiver,
    activeChat: state.chat.activeChat,
    chatError: state.chat.chatError,
    newMessage: state.chat.newMessage,
    myMessage: state.chat.myMessage,
    groupSuccess: state.chat.groupSuccess,
    manager: state.auth.manager,
    managers: state.managers.allManagers,
});

const mapDispatchToProps = {
    fetchChats,
    createGroup,
    initPrivateChat,
    getUser,
    fetchChatsById,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatSideAreaMenu);