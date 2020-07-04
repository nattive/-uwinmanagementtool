import React from "react";
import {
  List,
  ListItemText,
  ListItem,
  Typography,
  Divider,
} from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";

export default function SidebarContent() {
  const { path } = useRouteMatch();
  return (
    <>
      {path === "/reports/spar" ? (<SparChart />) : null}
      
      <Divider variant="middle" light className="m-3" />
      <List className="m-2">
        <ListItemText>
          <Typography variant="overline">Quick Navigation</Typography>
        </ListItemText>

        <ListItem
          button
          disabled={path === "/reports"}
          component={Link}
          to="/reports"
        >
          Report Dashboard
        </ListItem>
        <ListItem
          button
          disabled={path === "/reports/spar"}
          component={Link}
          to="/reports/spar"
        >
          Send SPAR report
        </ListItem>
        <ListItem
          button
          disabled={path === "/reports/Sfcr"}
          component={Link}
          to="/reports/Sfcr"
        >
          Send SFCR report
        </ListItem>
        <ListItem
          button
          disabled={path === "/reports/sr"}
          component={Link}
          to="/reports/sr"
        >
          Send Sales report
        </ListItem>
      </List>
    </>
  );
}

function SparChart() {
  const workPercentage = useSelector((state) => state.reports.workPercentage);

  return (
    <div style={{ margin: 30 }}>
      <div style={{ marginTop: 30, display: "flex" }}>
        <div style={{ width: "60%", paddingRight: 30 }}>
          <CircularProgressbar
            value={workPercentage}
            text={`${workPercentage}%`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor:
                workPercentage >= 80
                  ? "#11cb5f"
                  : workPercentage >= 60
                  ? "#cabf29"
                  : "#dc004e",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "transparent",
              width: 20,
            })}
          />
        </div>
      </div>
    </div>
  );
}
