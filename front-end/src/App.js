import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import SignUpPage from "./components/SignUpPage";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import Page4 from "./components/Page4";
import "font-awesome/css/font-awesome.css";

const App = () => {
  const checkForAuthToken = (Component) => {
    const user_auth_token = localStorage.getItem("user_auth_token");
    return user_auth_token ? (
      <Component user_name={user_auth_token} />
    ) : (
      <Redirect to="/login" />
    );
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route
          exact
          path="/home"
          render={() => checkForAuthToken(HomePage)}
        ></Route>
        <Route path="/home/page1">
          <Page1 />
        </Route>
        <Route path="/home/page2">
          <Page2 />
        </Route>
        <Route path="/home/page3">
          <Page3 />
        </Route>
        <Route path="/home/page4">
          <Page4 />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
