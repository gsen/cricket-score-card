import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
           about
          </Route>
          <Route path="/users">
           users
          </Route>
          <Route path="/login">
           <SignIn/>
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
