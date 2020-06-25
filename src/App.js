import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Entrance from "./Entrance/Entrance";
// import Provider from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import MainApp from "./Entrance/MainApp";
function App() {
const browserHistory = createBrowserHistory();

  return (
    // <Provider store={store}>
    <Router history={browserHistory}>
      <MainApp />
      {/* </Provider> */}
    </Router>
  );
}

export default App;
