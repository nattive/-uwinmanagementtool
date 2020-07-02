import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ReportHomeScreen from "./ReportHomeScreen";
import SFCR from  './SFCR'

export default function Report() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`}>
        <ReportHomeScreen />
      </Route>
      <Route path={`${path}/Sfcr`}>
        <SFCR />
      </Route>
    </Switch>
  );
}
