import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import TextField from "@material-ui/core/TextField";

import { listMatches, listTeams } from "../../service";
import Autocomplete from "@material-ui/lab/Autocomplete";

const columns = [
  {
    field: "team",
    headerName: "Team",
    sortable: false,
    width: 300,
    valueGetter: (params) => {
     const {row} = params;
      return `${row.team1.teamName} vs ${row.team2.teamName}`
    },
  },
  {
    field: "winner",
    headerName: "Winner",
    sortable: false,
    width: 200,
    valueGetter: (params) => {
     const {row} = params;
      return `${row.winner.teamName}`
    },
  },
  {
    field: "date",
    headerName: "Match Date",
    sortable: true,
    width: 300,
    valueGetter: (params) => {
     const {row} = params;
      return `${new Date(row.matchDate).toLocaleDateString()}`
    },
  },
];

export default function ListPlayers() {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState(null);
  const [selectedTeam,setSelectedTeam] = useState(null);
  useEffect(() => {
      listTeams().then(teams=> {
          setTeams(teams);
          if(teams?.length>0){
              setSelectedTeam(teams[0]);
          }
        });
  }, []);

  const onRowClick = (param)=>{
    const {row = undefined} = param;
if(row){
    
}
  }

  const getMatches = (teamId)=>{
    listMatches(teamId).then((matches) => setMatches(matches));
  }
  useEffect(()=>{
      if(selectedTeam)
    getMatches(selectedTeam.teamId)
  }, [selectedTeam])

  return (
    <div>
  <Autocomplete
          value={selectedTeam}
          onChange={(event, newValue) => {
            setSelectedTeam(newValue);
          }}
          id="teams"
          options={teams}
          getOptionLabel={(option) => option.teamName}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Team" variant="outlined" required />
          )}
        />
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={matches}
        columns={columns}
        onSelectionModelChange
        onRowClick={onRowClick}
        autoPageSize
        autoHeight
      />
    </div>
    </div>
  );
}
