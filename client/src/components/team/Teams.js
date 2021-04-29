import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import AddTeam from "./AddTeam";
import {Button} from "@material-ui/core"
import ListTeams from "./ListTeams";
function Teams() {
  return (
    <div>
     
      <Switch>
        <Route path="/teams/new">
          <AddTeam />
        </Route>
        <Route path="/teams/edit/:teamId/:name" component={AddTeam} />
        <Route path="/">
        <Button variant="outlined" color="primary" >
       <Link to="/teams/new">Add a team</Link>
      </Button>
      <div>
         <ListTeams/>
      </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Teams;
