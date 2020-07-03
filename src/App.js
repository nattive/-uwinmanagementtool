import React from "react";
import "./App.css";
import Entrance from "./Entrance/Entrance";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import MainApp from "./Entrance/MainApp";
import store from "./Misc/store";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
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
        <Router history={browserHistory}>
          <MainApp />
        </Router>{" "}
      </ThemeProvider>
    </Provider>
  );
}

export default App;
