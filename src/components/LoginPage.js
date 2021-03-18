import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  function authenticateUser(event) {
    event.preventDefault();
    console.log("Authing");
    document.getElementById("loginBtn").textContent = "Logging In...";
    document.getElementById("loginBtn").disabled = true;
  }
  return (
    <div className="Login">
      <Form onSubmit={authenticateUser}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            required
            autoFocus
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
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
        <Button variant="success" block size="lg">
          Create New Account
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
