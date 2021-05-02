import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";
import AddEditMatch from "./AddEditMatch";
import ListMatch from "./ListMatch";
import ScoreCard from "./ScoreCard";
import EditScoreCard from "./EditScoreCard";
import { getItem } from "../../StorageService";

const useStyles = makeStyles((theme)=>({
    root:{
        display:'flex',
        flexDirection:'column',
        gap:theme.spacing(1)
    },
    addMatch:{
        alignSelf:'flex-end',
        "& a":{
            textDecoration:'none'
        }
    }
}))

function Match() {
    const user = getItem('user');
    const classes = useStyles();
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
          <div className={classes.root}>

          <Button className={classes.addMatch} disabled={!user?.isAdmin} variant="outlined" color="primary">
            <Link to="/matches/new">Add a Match</Link>
          </Button>
          <div>
           <ListMatch />
          </div>
              </div>  
        </Route>
      </Switch>
    </div>
  );
}

export default Match;
