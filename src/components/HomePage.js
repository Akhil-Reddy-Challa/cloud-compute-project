import Navbar from "react-bootstrap/Navbar";
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/HomePage.css";
import { useHistory } from "react-router-dom";

const HomePage = (props) => {
  const history = useHistory();
  const logOutUser = () => {
    localStorage.removeItem("user_auth_token");
    history.push("/login");
  };
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Welcome {props.user_name}</Navbar.Brand>
        <button
          id="logOutButton"
          type="button"
          className="btn btn-light"
          onClick={logOutUser}
        >
          Log Out!
        </button>
      </Navbar>
      <ListGroup>
        <ListGroup.Item action variant="secondary">
          Search on Data Pulls
        </ListGroup.Item>
        <ListGroup.Item action variant="secondary">
          Find how does customer engagement change over time.
        </ListGroup.Item>
        <ListGroup.Item action variant="secondary">
          Find which demographic factors affect customer engagement.
        </ListGroup.Item>
        <ListGroup.Item action variant="secondary">
          Upload DataSet
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default HomePage;
