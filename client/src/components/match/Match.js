import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Button } from "@material-ui/core";
import AddEditMatch from "./AddEditMatch";
function Match() {
  return (
    <div>
      <Switch>
        <Route exact path="/matches/new">
            <AddEditMatch />
        </Route>
        <Route path="/matches/edit/:matchId" component={AddEditMatch} />
        <Route path="/">
          <Button variant="outlined" color="primary">
            <Link to="/matches/new">Add a Match</Link>
          </Button>
          <div>
           List of Matches
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Match;
