import React from "react";
import "./App.css";
import Entrance from "./Entrance/Entrance";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import MainApp from "./Entrance/MainApp";
import store from "./Misc/store";
function App() {
  const browserHistory = createBrowserHistory();

  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <MainApp />
      </Router>
    </Provider>
  );
}

export default App;
