import React from "react";
import "./App.css";
import Entrance from "./Entrance/Entrance";
import { Provider, useDispatch } from "react-redux";
import { Router, Switch, Route, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import MainApp from "./Entrance/MainApp";
import store from "./Misc/store";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Echo from "laravel-echo";
import socketio from "socket.io-client";
import { useEffect } from "react";
import { INIT_CHAT } from "./actions/types";
const token = localStorage.getItem("uwin_manager_token");

// const echo = new Echo({
//   host: "http://127.0.0.1:5050",
//   broadcaster: "socket.io",
//   client: socketio,
//   auth: {
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   },
// });

// echo
//   .channel("laravel_database_private-chat")
//   .listen("MessageSent", (ev) => console.log(ev));

// // window.Pusher = require("pusher-js");
//     const token = localStorage.getItem("uwin_manager_token");

// window.Echo = new Echo({
//   broadcaster: "pusher",
//   key: "c6aa30722ce3cc1b266b",
//   wsHost: window.location.hostname,
//   authEndpoint: "http://uwinmanagerapi.test/broadcasting/auth",
//   wsPort: 6001,
//   wssPort: 6001,
//   scheme: "http",
//   cluster: "eu",
//   disableStats: true,
//   auth: {
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   },
// });

function App() {
  const browserHistory = createBrowserHistory();

  const theme = createMuiTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#dc004e",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MainApp />
      </ThemeProvider>{" "}
    </Provider>
  );
}

export default App;
