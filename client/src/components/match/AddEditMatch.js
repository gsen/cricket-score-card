import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { addMatch, listTeams } from "../../service";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { useHistory } from "react-router";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function AddEditMatch() {
  const classes = useStyles();
const history = useHistory();
  const [options, setOptions] = useState([]);
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);
  const [winner, setWinner] = useState(null);
  const [matchDate, setMatchDate] = useState(null);
  useEffect(() => {
    listTeams().then((teams) => {
      setOptions(teams);
    });
  }, []);

  const saveMatch = async(e) => {
    e.preventDefault();
    console.log(team1, team2, winner, matchDate);
    let result = await addMatch({team1: team1.teamId, team2:team2.teamId, winner: winner.teamId, matchDate});
    if(result>0){
history.push('/matches')
    }
  };

  return (
    <form className={classes.container} onSubmit={saveMatch}>
      {options?.length > 0 && (
        <Autocomplete
          value={team1}
          onChange={(event, newValue) => {
            setTeam1(newValue);
          }}
          id="team1"
          options={options}
          filterOptions={(options) => {
            return options.filter((option) => option.teamId !== team2?.teamId);
          }}
          getOptionLabel={(option) => option.teamName}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
            required
              {...params}
              label="Select First Team"
              variant="outlined"
            />
          )}
        />
      )}
      {options?.length > 0 && (
        <Autocomplete
          value={team2}
          onChange={(event, newValue) => {
            setTeam2(newValue);
          }}
          filterOptions={(options) => {
            return options.filter((option) => option.teamId !== team1?.teamId);
          }}
          id="team2"
          options={options}
          getOptionLabel={(option) => option.teamName}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
            required
              {...params}
              label="Select Second Team"
              variant="outlined"
            />
          )}
        />
      )}

      {options?.length > 0 && (
        <Autocomplete
          value={winner}
          onChange={(event, newValue) => {
            setWinner(newValue);
          }}
          id="winner"
          
          options={options}
          filterOptions={options=> options.filter(option=> option.teamId == team1?.teamId || option.teamId == team2?.teamId)}
          getOptionLabel={(option) => option.teamName}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Winner" variant="outlined" required />
          )}
        />
      )}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>

        <KeyboardDatePicker
        value={matchDate}
        onChange={setMatchDate}
        label="Match Date"
        onError={console.log}
        format="dd/MM/yyyy"
        required
      />
      </MuiPickersUtilsProvider>
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
    </form>
  );
}
