import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  function authenticateUser(event) {
    event.preventDefault();
  }
  return (
    <div className="Login">
      <Form onSubmit={authenticateUser}>
        <div>
          <h2>Sign Up</h2>
        </div>
        <Form.Group size="lg">
          <Form.Control
            required
            autoFocus
            type="text"
            value={userName}
            placeholder="User Name"
            minLength="5"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg">
          <Form.Control
            required
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg">
          <Form.Row>
            <Col>
              <Form.Control required placeholder="First name" />
            </Col>
            <Col>
              <Form.Control required placeholder="Last name" />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group size="lg">
          <Form.Control
            required
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <button
          type="submit"
          id="loginBtn"
          disabled={false}
          className="btn btn-primary btn-lg btn-block"
        >
          Sign Up!
        </button>
      </Form>
    </div>
  );
};

export default SignUpPage;
