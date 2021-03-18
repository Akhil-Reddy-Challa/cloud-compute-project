import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import SignUpPage from "./components/SignUpPage";
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
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route path="/home" render={() => checkForAuthToken(HomePage)}></Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
