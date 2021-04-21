import Navbar from "react-bootstrap/Navbar";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import "../styles/HomePage.css";
import { useHistory } from "react-router-dom";
import SearchPage from "../components/SearchPage";
import Dashboard from "./Dashboards";
import FilesUpload from "./FilesUpload";

const HomePage = (props) => {
  const history = useHistory();
  const logOutUser = () => {
    sessionStorage.removeItem("user_auth_token");
    history.push("/login");
  };
  return (
    <Router>
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
        <div id="pagesContainer" className="d-flex justify-content-center">
          <ul>
            <Link to="/home/search">Search on Data Pulls</Link>
            <Link to="/home/dashboard">Dashboard</Link>
            <Link to="/home/upload">Upload DataSet</Link>
          </ul>
        </div>
        <Switch>
          <Route exact path="/home/search">
            <SearchPage />
          </Route>
          <Route exact path="/home/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/home/upload">
            <FilesUpload />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default HomePage;
