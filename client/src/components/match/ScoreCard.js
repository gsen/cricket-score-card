import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getScorecard } from "../../service";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.background.paper,
  },
  team1: {
    flex: "1",
    padding: theme.spacing(2),
    border: `1px solid`,
    "& .list":{
        display:'flex',
        justifyContent:'space-between'
    }
  },
  team2: {
    flex: "1",
    padding: theme.spacing(2),
    border: `1px solid`,
    borderLeft:0,
    "& .list":{
        display:'flex',
        justifyContent:'space-between'
    }
  },
  main:{
      display:'flex',
      flexDirection:'column',
      gap:theme.spacing(1),

      "& .edit":{
          alignSelf:'flex-end'
      }
  }
}));

function ScoreCard({ location }) {
  const { team1, team2, id, winner } = location?.state;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [scoreCard, setScoreCard] = useState(null);
  const [team1Runs, setTeam1Runs] = useState(0);
  const [team2Runs, setTeam2Runs] = useState(0);
  const history = useHistory();
  useEffect(() => {
    getScorecard(id).then((scoreCard) => {
      setScoreCard(scoreCard);
    });
  }, []);
  const editScoreCard = (e) => {
    history.push("/matches/scorecard/edit", {...location?.state, scoreCard});
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <div className={classes.main}>
      <Button className="edit"  variant="outlined"  color="primary" onClick={editScoreCard}>Edit</Button>
      <div className={classes.root}>
        <div className={classes.team1}>
          <h1>{team1.teamName} ({scoreCard?.filter(sc=> sc.teamId === team1.teamId)?.reduce((prev,current)=> {
              return prev + current.score},0)})</h1>
          {scoreCard?.filter(sc=> sc.teamId === team1.teamId).map(score=>(
              <div className="list">
              <div>{score.player.firstName} {score.player.lastName}</div>
              <div>{score.score}</div>
              </div>
          ))}
        </div>
        <div className={classes.team2}>
          <h1>{team2.teamName} ({scoreCard?.filter(sc=> sc.teamId === team2.teamId)?.reduce((prev,current)=> prev + current.score,0)})</h1>
          {scoreCard?.filter(sc=> sc.teamId === team2.teamId).map(score=>
          {
           
             return <div className="list">
                <div>{score.player.firstName} {score.player.lastName} </div>
                <div>{score.score}</div>
              </div>
          }
          )}
          
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
