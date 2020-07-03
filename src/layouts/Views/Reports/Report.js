import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ReportHomeScreen from "./ReportHomeScreen";
import SFCR from "./SFCR";
import SPAR from "./SPAR";
import SR from "./SR";

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
      <Route path={`${path}/spar`}>
        <SPAR />
      </Route>
       <Route path={`${path}/sr`}>
        <SR />
      </Route>
      
    </Switch>
    
  );
}
