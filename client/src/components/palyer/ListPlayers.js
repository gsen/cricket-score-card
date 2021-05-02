import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import TextField from "@material-ui/core/TextField";

import { getPlayers, listMatches, listTeams } from "../../service";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  addPlayer: {
    alignSelf: "flex-end",
    "& a": {
      textDecoration: "none",
    },
  },
  editPlayer:{
    alignSelf:'flex-end'
  }
}));

const columns = [
  { field: "firstName", headerName: "First Name", width: 160 },
  { field: "lastName", headerName: "Last Name", width: 160 },
  {
    field: "teamName",
    headerName: "Team",
    sortable: true,
    width: 160,
  },
  {
    field: "matchesPlayed",
    headerName: "Matches Played",
    sortable: true,
    width: 160,
  },
  {
    field: "totalRuns",
    headerName: "Runs",
    sortable: true,
    width: 160,
  },
];

export default function ListPlayers() {
  const classes = useStyles();
  const history = useHistory();
  const [players, setPlayers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [originalPlayers, setOriginalPlayers] = useState([]);
  useEffect(() => {
    getPlayers().then((players) => {
      setPlayers(players);
      setOriginalPlayers(players);
    });
  }, []);

  const onRowClick = (param) => {
    const { row = undefined } = param;
    if (row) {
      setSelectedPlayer(row);
    }
  };

  const editPlayer = () => {
    history.push("/players/edit", selectedPlayer);
  };

  const searchChanged = (e) => {
    let searchText = e.target.value;
    setSearchText(searchText);
    if (searchText) {
      setPlayers(
        originalPlayers.filter(
          (p) =>
            p.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
            p.lastName?.toLowerCase().includes(searchText)
        )
      );
    } else {
      setPlayers(originalPlayers);
    }
  };

  return (
    <div className={classes.root}>
      <Button className={classes.editPlayer}
        variant="outlined"
        color="primary"
        disabled={!selectedPlayer}
        onClick={editPlayer}
      >
        Edit Player
      </Button>
      <TextField
        name="lastName"
        id="searchPlayer"
        label="Search Player"
        value={searchText}
        onChange={searchChanged}
        variant="outlined"
      />
      <div style={{ height: 500, width: "100%" }}>
        {players?.length > 0 && (
          <DataGrid
            rows={players}
            columns={columns}
            onSelectionModelChange
            onRowClick={onRowClick}
            autoPageSize
            autoHeight
          />
        )}
      </div>
    </div>
  );
}
