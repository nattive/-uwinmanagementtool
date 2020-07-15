import React from "react";
import { Switch, useRouteMatch, Route } from "react-router-dom";
import ChatHome from "./ChatHome";

export default function ChatRoute() {
  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={`${path}`}>
          <ChatHome />
        </Route>
        <Route path={`${path}/chat`}>
          <p>chat 2</p>
        </Route>
      </Switch>
    </div>
  );
}
