import React from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { Link } from "react-router-dom";
import SidebarContent from "../SidebarContent";
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
}));
export default function Sfcr() {
  const classes = useStyles();
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
              FUEL DISBURSEMENT/CONSUMPTION MONITORING REPORT
            </Typography>
            <Divider className={classes.topDivider} />
            <form className={classes.root} noValidate autoComplete="off">
              <Grid container>
                <Grid xs={12} sm={6} md={4}>
                  <TextField
                    id="date"
                    label="DATE SUPPLIED"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                  <TextField
                    id="date"
                    label="DATE FINISHED"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                  <TextField
                    id="date"
                    label="USAGE DURATION"
                    type="date"
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
                    id="outlined-basic"
                    label="VOLUME"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    id="outlined-basic"
                    label="COST/LIT"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    id="outlined-basic"
                    label="PETROL STATION"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    id="outlined-basic"
                    label="RECV SIGN"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </form>
            <div className="float-right">
              <Button variant="contained" color="primary" className="m-4">
                Send Report
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
