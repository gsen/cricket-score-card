import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Button } from "@material-ui/core";
import AddEditMatch from "./AddEditMatch";
import ListMatch from "./ListMatch";
import ScoreCard from "./ScoreCard";
import EditScoreCard from "./EditScoreCard";
function Match() {
  return (
    <div>
      <Switch>
          
         <Route path ="/matches/scorecard/edit" component={EditScoreCard} />
         <Route path ="/matches/scorecard" component={ScoreCard} />
        <Route exact path="/matches/new">
            <AddEditMatch />
        </Route>
        <Route path="/matches/edit/:matchId" component={AddEditMatch} />
        <Route path="/">
          <Button variant="outlined" color="primary">
            <Link to="/matches/new">Add a Match</Link>
          </Button>
          <div>
           <ListMatch />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Match;
