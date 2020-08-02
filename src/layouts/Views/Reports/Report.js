import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ReportHomeScreen from "./ReportHomeScreen";
import SFCR from "./SFCR";
import SPAR from "./SPAR";
import SR from "./SR";
import SRTable from "./SR/SRTable";
import  SparTable  from "./SPAR/SparTable";
import SFCRTable from "./SFCR/SFCRTable";

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
      <Route path={`${path}/sales/all`}>
        <SRTable />
      </Route>
      <Route path={`${path}/wskpa/all`}>
        <SparTable />
      </Route>
       <Route path={`${path}/fuel/all`}>
        <SFCRTable />
      </Route>
      
    </Switch>
  );
}
