import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "../styles/Login.css";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const { Backend_API } = require("../utils/Backend_API");

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const authenticateUser = async (event) => {
    event.preventDefault();
    document.getElementById("loginBtn").textContent = "Logging In...";
    document.getElementById("loginBtn").disabled = true;

    const responseFromServer = await fetch(Backend_API + "authenticateUser/", {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify({ userName, password }),
    });
    let { status } = responseFromServer;
    if (status === 200) {
      const userData = await responseFromServer.json(responseFromServer);
      validateUserCreds(userData);
    } else {
      alert("An Error Occured!");
      document.getElementById("loginBtn").textContent = "Log In";
      document.getElementById("loginBtn").disabled = false;
    }
    function validateUserCreds(userData) {
      if (userData.user_password === password) {
        localStorage.setItem("user_auth_token", userName);
        history.push("/home");
      } else {
        alert("UserName does not exist or Password is incorrect");
        document.getElementById("loginBtn").textContent = "Log In";
        document.getElementById("loginBtn").disabled = false;
      }
    }
  };
  return (
    <div className="Login">
      <Form onSubmit={authenticateUser}>
        <div>
          <h2>Log In</h2>
        </div>
        <Form.Group size="lg" controlId="username">
          <Form.Control
            required
            autoFocus
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Control
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <button
          type="submit"
          id="loginBtn"
          disabled={false}
          className="btn btn-primary btn-lg btn-block"
        >
          Log In
        </button>
        <div id="lineSeparator"></div>
        <p className="text-center">Not a member yet?</p>
        <Link to="/signup" className="btn btn-success btn-lg btn-block">
          Create New Account
        </Link>
      </Form>
    </div>
  );
};

export default LoginPage;
