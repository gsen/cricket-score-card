import React, { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import BackupOutlinedIcon from "@material-ui/icons/BackupOutlined";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { createTeam, listTeams, updateTeam } from "../../service";
import { useHistory } from "react-router";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {addPlayer as createPlayer, SERVER_URL} from "../../service";
import { getItem } from "../../StorageService";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
    "& div":{
        display:'flex'
    }
  },
  column:{
    display: "flex",
    flexDirection: "column",
    "& button":{
        marginLeft: theme.spacing(1)
    }
  },
  imageContainer: {
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
}));

export default function AddEditPlayer({ location }) {
let {firstName='', lastName='', id=null, image=null, teamId=null} = location?.state||{};
  const classes = useStyles();
  const [team, setTeam] = useState(null);
  const [teams, setTeams] = useState([]);

  const imageSelection = useRef(null);
  const imageElement = useRef(null);
  const user = getItem('user');
  useEffect(()=>{
    if(image){
        imageElement?.current?.setAttribute('src', `${SERVER_URL}${image}`);
    }
  },[])
  useEffect(() => {
    listTeams().then((teams) => {
      setTeams(teams);
    });
  }, []);

  const addPlayer = async (e) => {
    e.preventDefault();
    const { firstName, lastName } = e.target;

    
    let formData = new FormData();
    formData.append('firstName', firstName.value);
    formData.append('lastName', lastName.value);
    formData.append('teamId', team?.teamId);
    formData.append('image', imageSelection.current?.files[0])
    if(id){
        formData.append('id',id);
    }
    createPlayer(formData)
  };
  const uploadImage = () => {
    imageSelection.current.click();
  };
  const imageChanged = (e) => {
    const [file] = imageSelection.current.files;
    imageElement.current.src = URL.createObjectURL(file);
  };
  return (
    <form className={classes.root} autoComplete="off" onSubmit={addPlayer}>
      <div className={classes.imageContainer}>
        <img
          width="200px"
          height="200px"
          style={{ objectFit: "cover" }}
          ref={imageElement}
        ></img>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<BackupOutlinedIcon />}
          type="button"
          onClick={uploadImage}
        >
          UploadImage
        </Button>
      </div>
      <div className={classes.column}>
          <div>
              
        <TextField
          required
          name="firstName"
          id="firstName"
          label="First Name"
          defaultValue={firstName}
          variant="outlined"
          disabled={!user.isAdmin}
        />

        <TextField
          required
          name="lastName"
          id="lastName"
          label="Last Name"
          defaultValue={lastName}
          variant="outlined"
          disabled={!user.isAdmin}

        />

        <input
          ref={imageSelection}
          type="file"
          name="playerImage"
          id="playerImage"
          accept="image/*"
          onChange={imageChanged}
          hidden
        />
        <Autocomplete
          value={team}
          onChange={(event, newValue) => {
            setTeam(newValue);
          }}
          disabled={teamId}
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
        
          </div>
          <div>
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
      </div>
      
    </form>
  );
}
