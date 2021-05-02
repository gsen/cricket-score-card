import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { getPlayers, saveScoreCard } from "../../service";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection:'column',
    gap:theme.spacing(1),
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  save:{
    flex:'1'
  },
  teams:{
      display:'flex',
      width:'100%',
      flex:'1',
      gap:theme.spacing(4)
  },
  team1: { flex: "1" ,
  display:'flex',
  flexDirection:'column'
},
  team2: { flex: "1",
  display:'flex',
  flexDirection:'column'
     },
}));

export default function EditScoreCard({ location }) {
  const { team1, team2, id, scoreCard = [] } = location?.state;
  const classes = useStyles();
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  useEffect(() => {
    getPlayers(team1.teamId).then((players) => {
      setTeam1Players(players);
    });
    getPlayers(team2.teamId).then((players) => {
      setTeam2Players(players);
    });
  }, []);

  const getPlayerScore = (playerId) => {
    const existingScoreCard = scoreCard?.find((s) => s.player.id === playerId);
    return existingScoreCard ? existingScoreCard.score : "";
  };
  const savePlayerScores = (e) => {
    e.preventDefault();
    const players = [...team1Players, ...team2Players];
    let newScoreCard = [];
    for (let player of players) {
      const scoreCardId = scoreCard?.find((s) => s.player.id === player.id)?.id;
      const { value } = document.getElementById(`player_${player.id}`);
      if (value !== "") {
        newScoreCard.push({
          id: scoreCardId,
          playerId: player.id,
          score: parseInt(value),
        });
      }
    }
    console.log(newScoreCard);
    saveScoreCard(id, newScoreCard);
  };
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={savePlayerScores}
    >
        <div className={classes.save}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        type="submit"
      >
        Save
      </Button>
</div>
<div className={classes.teams}>

      <div className={classes.team1}>
        <h1>{team1.teamName}</h1>
        {team1Players &&
          team1Players.map((p) => (
            <TextField
              id={`player_${p.id}`}
              type="number"
              label={`${p.firstName} ${p.lastName} Score`}
              defaultValue={getPlayerScore(p.id)}
            />
          ))}
      </div>
      <div className={classes.team2}>

        <h1>{team2.teamName}</h1>
        {team2Players &&
          team2Players.map((p) => (
            <TextField
              id={`player_${p.id}`}
              label={`${p.firstName} ${p.lastName} Score`}
              defaultValue={getPlayerScore(p.id)}
            />
          ))}
      </div>
      </div>
    </form>
  );
}
