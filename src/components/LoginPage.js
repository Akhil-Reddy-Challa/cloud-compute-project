import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "../styles/Login.css";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  function authenticateUser(event) {
    event.preventDefault();
    console.log("Authing");
    document.getElementById("loginBtn").textContent = "Logging In...";
    document.getElementById("loginBtn").disabled = true;
    setTimeout(() => {
      localStorage.setItem("user_auth_token", userName);
      history.push("/home");
    }, 1000);
  }
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
