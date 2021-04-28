import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
           <SignIn/>
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
           <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
