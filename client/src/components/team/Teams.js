import React, { useEffect } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import AddTeam from "./AddTeam";
import { Button } from "@material-ui/core";
import ListTeams from "./ListTeams";
import { getItem } from "../../StorageService";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme)=>({
  root:{
    display:'flex',
    flexDirection:'column',
    gap:theme.spacing(1)
  },
  addTeam:{
alignSelf :'flex-end',
"& a":{
  textDecoration:'none'
}
  }
}))

function Teams() {
  const classes = useStyles();
  const user = getItem('user');
  return (
    <div>
      <Switch>
        <Route exact path="/teams/new">
          <AddTeam />
        </Route>
        <Route path="/teams/edit/:teamId/:name" component={AddTeam} />
        <Route path="/">
          <div className={classes.root}>

          <Button className={classes.addTeam} variant="outlined" color="primary" disabled={!user?.isAdmin}>
            <Link to="/teams/new">Add a team</Link>
          </Button>
          <div>
            <ListTeams />
          </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Teams;
