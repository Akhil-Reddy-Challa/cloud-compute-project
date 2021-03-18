import Navbar from "react-bootstrap/Navbar";
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
    </div>
  );
};

export default HomePage;
