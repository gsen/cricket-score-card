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
  },
  team2: {
    flex: "1",
  },
}));

function ScoreCard({ location }) {
  const { team1, team2, id, winner } = location?.state;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [scoreCard, setScoreCard] = useState(null);
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
    <>
      <Button onClick={editScoreCard}>Edit</Button>
      <div className={classes.root}>
        <div className={classes.team1}>
          <h1>{team1.teamName}</h1>
        </div>
        <div className={classes.team2}>
          <h1>{team2.teamName}</h1>
        </div>
      </div>
    </>
  );
}

export default ScoreCard;
