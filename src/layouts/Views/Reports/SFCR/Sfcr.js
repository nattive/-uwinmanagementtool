import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { Link } from "react-router-dom";
import SidebarContent from "../SidebarContent";
import { connect } from "react-redux";
import { storeSFCR } from "../../../../actions/SfcrReportAction";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import swal from "@sweetalert/with-react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(4),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  topDivider: {
    marginBottom: theme.spacing(4),
  },
  headerTitle: {
    marginTop: theme.spacing(8),
    fontVariant: "uppercase",
  },
  fromContainer: {
    marginTop: theme.spacing(8),
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Sfcr(props) {
  const classes = useStyles();
  const [date_finished, setDate_finished] = useState("");
  const [date_supplied, setDate_supplied] = useState("");
  const [usage_duration, setUsage_duration] = useState("");
  const [volume, setVolume] = useState("");
  const [pricePerLitre, setPricePerLitre] = useState("");
  const [petrol_station, setPetrol_station] = useState("");
  const [hasReceive, setHasReceive] = useState("Bought");

  const handSubmit = () => {
    const data = {
      date_finished,
      date_supplied,
      usage_duration,
      volume,
      pricePerLitre,
      petrol_station,
      hasReceive,
    };

    props.storeSFCR({ data });
  };

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    props.errorResponse && swal("Error occurred", props.errorResponse, "error");
    props.successResponse &&
      swal("Successful", props.successResponse, "success");

    console.log("count changed", props.errorResponse);
  }, [props.successResponse, props.errorResponse]);

  // useEffect(() => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //     return;
  //   }
  //   props.errorResponse &&
  //     swal("Error occurred", props.errorResponse, "error");

  //   console.log("count changed", props.errorResponse);
  // }, [props.errorResponse]);

  return (
    <Container className={classes.root}>
      <Grid item sm={12} md={9}>
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              component="h6"
              color="primary"
              className="p-3"
            >
              FUEL DISBURSEMENT / CONSUMPTION MONITORING REPORT
            </Typography>
            <Divider className={classes.topDivider} />
            <form className={classes.root} noValidate autoComplete="off">
              <Grid container>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="date"
                    label="DATE SUPPLIED"
                    type="date"
                    defaultValue="2017-05-24"
                    onChange={(e) => setDate_supplied(e.target.valueAsDate)}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="date"
                    label="DATE FINISHED"
                    type="date"
                    onChange={(e) => setDate_finished(e.target.valueAsDate)}
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="date"
                    label="USAGE DURATION"
                    onChange={(e) => setUsage_duration(e.target.value)}
                    type="number"
                    helperText="The Fuel Estimated duration (in Hours)"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </form>
            <form
              className={classes.fromContainer}
              noValidate
              autoComplete="off"
            >
              <Grid container>
                <Grid item xs={6} md={3}>
                  <TextField
                    onChange={(e) => setVolume(e.target.value)}
                    id="outlined-basic"
                    label="VOLUME"
                    type="number"
                    helperText="Whats the volume of the Fuel"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    id="outlined-basic"
                    onChange={(e) => setPricePerLitre(e.target.value)}
                    type="number"
                    helperText="Fuel price per litre"
                    label="COST/LIT"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    id="outlined-basic"
                    label="PETROL STATION"
                    onChange={(e) => setPetrol_station(e.target.value)}
                    helperText=""
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink id="demo-simple-select-outlined-label">
                      Purchase Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-placeholder-label"
                      value={hasReceive}
                      onChange={(e) => setHasReceive(e.target.value)}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      <MenuItem disabled>
                        <em> --choose from option-- </em>
                      </MenuItem>
                      <MenuItem value={"Bought"}> Bought </MenuItem>
                      <MenuItem value={"awaiting_approval"}>
                        Awaiting approval
                      </MenuItem>
                      <MenuItem value={"on_Loan"}> Bought on Loan </MenuItem>
                    </Select>
                    <FormHelperText>
                      Indicate if the fuel has been bought already, waiting
                      supervisor 's approval or bought on loan
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
            <div className="float-right">
              <Button
                variant="contained"
                onClick={() => handSubmit()}
                color="primary"
                className="m-4"
                disabled={props.isLoading}
              >
                {props.isLoading ? (
                  <CircularProgress color="primary" size={20} />
                ) : (
                  " Send Report"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={12} md={3}>
        <SidebarContent />
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.reports.sfcrLoading,
  successResponse: state.reports.sfcrSuccess,
  errorResponse: state.reports.sfcrError,
});

const mapDispatchToProps = {
  storeSFCR,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sfcr);
