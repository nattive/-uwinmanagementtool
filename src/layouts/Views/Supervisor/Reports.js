import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect, useSelector } from "react-redux";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { getUsers } from "../../../actions/usersAction";
import {
  getAllWskpaById, getAllSfcrById,
  getAllSalesById
} from "../../../actions/adminAction";
import SfcrAllTable from "./SfcrAllTable";
import SparTable from "./SparTable";
import Salesall from "./Salesall";
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
    width: "100%",
    marginTop: 20,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "50%",
  },
}));

function Reports(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [manager, setManager] = React.useState(0);
  useEffect(() => {
    props.getUsers();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const TabSelect = (props) => {
    const managers = useSelector(state => state.managers.allManagers)
    const handleSelectChange = (event) => {
      console.log(props)
      setManager(event.target.value)

      switch (props.report) {
        case "wskpa":
          props.getAllWskpaById(event.target.value)
          break;
        case "sfcr":
          props.getAllSfcrById(event.target.value)
          break;
        case "sales":
          // console.log(event.target.value);
          props.getAllSalesById(event.target.value)
          break;

        default:
          break;
      }
    };
    return (
      <>
        <label htmlFor="">Select Manager to view report</label>
        <br />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Manager</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleSelectChange}
            value={manager}
          >
            <MenuItem value={0} disabled>
              ---select a manager ---
            </MenuItem>
            {managers && managers.length ? (
              managers.map((manager) => (
                <MenuItem value={manager.id} key={manager.id}>
                  {manager.name}
                </MenuItem>
              ))
            ) : (
                <MenuItem disabled value={10}>
                  {'No Manager in database'}
                </MenuItem>
              )}
          </Select>
        </FormControl>
        {/* <CircularProgress size={20}/> */}
      </>
    );
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Standard Fuel Consumption Report" {...a11yProps(0)} />
          <Tab
            label="Weekly Staff Key performance Appraisal"
            {...a11yProps(1)}
          />
          <Tab label="Account/Sales Report" {...a11yProps(2)} />
          {/* <Tab label="Checklist Report" {...a11yProps(3)} /> */}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <TabSelect report="sfcr" {...props} />
          <Divider style={{ margin: 20 }} />
          <SfcrAllTable />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TabSelect report="wskpa" {...props} />
          <Divider style={{ margin: 20 }} />
          <SparTable />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <TabSelect report="sales" {...props} />
          <Salesall />
        </TabPanel>
        {/* <TabPanel value={value} index={3} dir={theme.direction}>
          <TabSelect report="checklist" {...props} />
        </TabPanel> */}
      </SwipeableViews>
    </div>
  );
}

const mapStateToProps = (state) => ({
  managers: state.managers.allManagers,
});

const mapDispatchToProps = {
  getUsers, getAllSfcrById,
  getAllSalesById,
  getAllWskpaById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
