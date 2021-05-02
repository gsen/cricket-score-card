import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Button,makeStyles } from "@material-ui/core";
import AddEditPlayer from "./AddEditPlayer";
import ListPlayers from "./ListPlayers";
import { getItem } from "../../StorageService";

const useStyles = makeStyles((theme)=>({
    root:{
      display:'flex',
      flexDirection:'column',
      gap:theme.spacing(1)
    },
    addPlayer:{
  alignSelf :'flex-end',
  "& a":{
      textDecoration:'none'
  }
    }
  }))

function Player() {
    const classes = useStyles();
    const user = getItem('user');
  return (
    <div>
      <Switch>
        <Route exact path="/players/new" component={AddEditPlayer}>
          
        </Route>
        <Route path="/players/edit" component={AddEditPlayer} />
        <Route path="/">
        <div className={classes.root}>
          <Button className={classes.addPlayer} disabled={!user?.isAdmin} variant="outlined" color="primary">
            <Link to="/players/new">Add a Player</Link>
          </Button>
          <div>
            <ListPlayers/>
          </div>
            </div>    
        </Route>
      </Switch>
    </div>
  );
}

export default Player;
