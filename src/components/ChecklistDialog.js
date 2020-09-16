import React, { Component } from "react";

import {
  ListItemIcon,
  FormControlLabel,
  Checkbox,
  DialogActions,
  CircularProgress,
  DialogContentText,
  DialogContent,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import { blue, green } from "@material-ui/core/colors";
import {
  Morning, Afternoon,
  Evening
} from "../Misc/Checklists";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { storeChecklist } from "../actions/checkoutAction";
import { storeNotification } from "../actions/usersAction";

class ChecklistDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: {},
      checked: false,
      hour: "",
      openObj: props.open,
      open: props.open ? props.open.open : false,
      day: props.open ? props.open.type : '',
      checklist: {}
    };
    // this.handleClose = this.handleClose.bind(this)
    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.getHour = this.getHour.bind(this);
    this.getHour();
  }

  componentWillReceiveProps(props) {
    if (props.open) {
      switch (props.open.type) {
        case 'morning':
          this.setState({ checklist: Morning })
          break;
        case 'afternoon':
          this.setState({ checklist: Afternoon })
          break;
        case 'night':
          this.setState({ checklist: Evening })
          break;
        default:
          this.setState({ checklist: {} })
          break;
      }
    }
  }
  handleListItemClick() {
    this.props.storeChecklist();
  }

  // static getDerivedStateFromProps(prop, state) {
  //   if (prop.open !== state.openObj) {
  //     return {
  //       open: prop.open.open
  //     }
  //   }
  //   return null
  // }

  handleChange(event) {
    this.setState({ checked: event.target.checked });
  }
  getHour = () => {
    const date = new Date();
    const hour = date.getHours();
    this.setState({
      hour,
    });
  };
  render() {
    const todo = {};
    const buttonProgress = {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    };
    const wrapper = {
      margin: "10px",
      position: "relative",
    };
    return (
      <>
        <Dialog aria-labelledby="simple-dialog-title" open={this.props.openNow.open || this.props.open.open}>
          <DialogContent>
            <Typography variant="body1" className="p-4 m-3">
              {`Good ${this.props.open.type}, ${this.props.manager.name}`}
            </Typography>
            <List>
              {Object.keys(this.state.checklist).map((item, key) => (
                <ListItem
                  button
                  key={key}
                  disabled={this.state.todos[key]}
                  onClick={() =>
                    this.setState((state) => {
                      return { todos: { [key]: true, ...state.todos } };
                    })
                  }
                >
                  <FormControlLabel
                    style={
                      this.state.todos[key]
                        ? {
                          textDecorationLine: "line-through",
                          textDecorationStyle: "solid",
                        }
                        : null
                    }
                    // value={option}
                    key={key}
                    control={<Checkbox />}
                    label={this.state.checklist[item]}
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>

          <DialogActions>
            <div style={wrapper}>
              <Button
                variant="contained"
                color="primary"
                className={
                  this.props.appIsLoading ? "btn btn-primary" : "btn btn-success"
                }
                disabled={this.props.appIsLoading ||
                  Object.keys(this.state.checklist).length !==
                  Object.keys(this.state.todos).length
                }
                onClick={this.handleListItemClick}
              >
                Continue
            </Button>
              {this.props.appIsLoading && (
                <CircularProgress size={24} style={buttonProgress} />
              )}
            </div>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

ChecklistDialog.propTypes = {
  open: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  open: state.checklist.open,
  err: state.checklist.err,
  openNow: state.checklist.openNow,
  manager: state.auth.manager,
  appIsLoading: state.loadingState.appIsLoading,
});

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps, { storeChecklist, storeNotification })(ChecklistDialog);
