import Navbar from "react-bootstrap/Navbar";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import "../styles/HomePage.css";
import { useHistory } from "react-router-dom";
import Page1 from "../components/Page1";
import Page2 from "../components/Page2";
import Page3 from "../components/Page3";
import Page4 from "../components/Page4";

const HomePage = (props) => {
  const history = useHistory();
  const logOutUser = () => {
    localStorage.removeItem("user_auth_token");
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
            <Link to="/home/page1">Search on Data Pulls</Link>
            <Link to="/home/page2">
              Find how does customer engagement change over time.
            </Link>
            <Link to="/home/page3">
              Find which demographic factors affect customer engagement.
            </Link>
            <Link to="/home/page4">Upload DataSet</Link>
          </ul>
        </div>
        <Switch>
          <Route exact path="/home/page1">
            <Page1 />
          </Route>
          <Route exact path="/home/page2">
            <Page2 />
          </Route>
          <Route exact path="/home/page3">
            <Page3 />
          </Route>
          <Route exact path="/home/page4" userName={props.user_name}>
            <Page4 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default HomePage;
