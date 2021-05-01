import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Button } from "@material-ui/core";
import AddEditPlayer from "./AddEditPlayer";
function Player() {
  return (
    <div>
      <Switch>
        <Route exact path="/players/new">
          <AddEditPlayer />
        </Route>
        <Route path="/players/edit/:matchId" component={AddEditPlayer} />
        <Route path="/">
          <Button variant="outlined" color="primary">
            <Link to="/players/new">Add a Player</Link>
          </Button>
          <div>
            list of players
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Player;
