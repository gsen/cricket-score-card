import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import { createTeam, updateTeam } from "../../service";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    alignContent:'center',
    "& .MuiTextField-root": {
      width: 200,
      marginRight: theme.spacing(1)
    },
  },
}));

export default function AddTeam({match}) {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [teamName, setTeamName] = useState(match?.params?.name? match.params.name:'');

  const [helperText,setHelperText] = useState("");
  const history = useHistory();
  const onChange = (e)=>{
    setTeamName(e.target.value);
  }
  const addTeam = async(e) => {
    e.preventDefault();
   
    if (teamName) {
        try{
            let result;
            if(match?.params?.teamId){
                result = await updateTeam(teamName, match?.params?.teamId);
            }else{
                result =  await createTeam(teamName);
            }
            
             if(result>0){
                 history.push('/teams');
             }
        }catch(error){
            setError(true);
            setHelperText(error);
        }
    } else {
      setError(true);
      setHelperText("Name cannot be blank");
    }
  };
  return (
    <form className={classes.root} autoComplete="off" onSubmit={addTeam}>
      <div>
        <TextField
          error={error}
          name="teamName"
          id="outlined-error-helper-text"
          label="Team Name"
          defaultValue=""
          helperText={helperText}
          variant="outlined"
          value={teamName}
          onChange={onChange}
        />
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
    </form>
  );
}
