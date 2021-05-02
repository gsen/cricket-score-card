import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import TextField from "@material-ui/core/TextField";

import { listMatches, listTeams } from "../../service";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button, ButtonGroup, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme)=>({
    root:{
        display:'flex',
        flexDirection:'column',
        gap:theme.spacing(1)
    },
    container:{
        display:'flex',
        flexDirection:'column',
        gap:theme.spacing(1)
    },
    scoreCard:{
        alignSelf:'flex-end'
    }
}))

const columns = [
  {
    field: "match",
    headerName: "Match",
    sortable: false,
    width: 300,
    valueGetter: (params) => {
      const { row } = params;
      return `${row.team1.teamName} vs ${row.team2.teamName}`;
    },
  },
  {
    field: "winner",
    headerName: "Winner",
    sortable: false,
    width: 200,
    valueGetter: (params) => {
      const { row } = params;
      return `${row.winner.teamName}`;
    },
  },
  {
    field: "date",
    headerName: "Match Date",
    sortable: true,
    width: 160,
    valueGetter: (params) => {
      const { row } = params;
      return `${new Date(row.matchDate).toLocaleDateString()}`;
    },
  },
];

export default function ListMatch() {
    const classes = useStyles();

  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const history = useHistory();
  useEffect(() => {
    listTeams().then((teams) => {
      setTeams(teams);
      if (teams?.length > 0) {
        setSelectedTeam(teams[0]);
      }
    });
  }, []);

  const onRowClick = (param) => {
    const { row = undefined } = param;
    if (row) {
        setSelectedMatch(row);
    }
  };


const viewScoreCard = ()=>{
    if(selectedMatch){
        history.push('/matches/scorecard',selectedMatch);
    }
}

  const getMatches = (teamId) => {
    listMatches(teamId).then((matches) => setMatches(matches));
  };
  useEffect(() => {
    if (selectedTeam) getMatches(selectedTeam.teamId);
  }, [selectedTeam]);

  return (
    <div className={classes.root}>
      <Autocomplete
        value={selectedTeam}
        onChange={(event, newValue) => {
          setSelectedTeam(newValue);
          setSelectedMatch(null);
        }}
        id="teams"
        options={teams}
        getOptionLabel={(option) => option.teamName}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Team"
            variant="outlined"
            required
          />
        )}
      />
      <div className={classes.container} style={{ width: "100%" }}>
        <ButtonGroup className={classes.scoreCard}
          variant="contained"
          color="primary"
          aria-label="contained primary button group" disabled={!selectedMatch}>
          <Button  onClick={viewScoreCard}>Scorecard</Button>
        </ButtonGroup>
        <DataGrid
          rows={matches}
          columns={columns}
          autoPageSize
          autoHeight
          onSelectionModelChange
          onRowClick={onRowClick}
        />
      </div>
    </div>
  );
}
