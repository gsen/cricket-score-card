import React, { useEffect, useState } from "react";
import { listTeams, teamStats, SERVER_URL } from "../../service";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
    display: "flex",
    flexDirection:'column',
    height: "auto",
    width:'100%',
    gap:theme.spacing(1),
    "& > div:first-child":{
      backgroundColor: theme.palette.background.paper,
    }
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  players:{
    display:'flex',
    justifyContent: 'start',
    alignItems:'center',
    gap: theme.spacing(2),
    "& .image":{
      height: 50,
width:50,
objectFit:'contain',
aspectRatio:'16/9',
borderRadius: '100%',
margin:theme.spacing(1)
    },
    "& img":{
      width:'100%',
      height:'100%',
borderRadius: '100%'

    }
   
  }
  ,edit:{
    alignSelf:'flex-end'
  },
  stats:{
display:'flex',
justifyContent:'space-between'
  }
}));

export default function ListTeams() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  useEffect(() => {
    const getAllTeams = async () => {
      let teams = await listTeams();

      setTeams(teams);
    };
    getAllTeams();
  }, []);
  const handleChange = (event, index) => {
    teamStats(teams[index].teamId).then((stats) => {
      setValue(index);
      setSelectedTeam({ ...teams[index], ...stats });
    });
  };

  return (
    <div className={classes.root}>
      
      <div style={{display:'flex'}}>
        
      
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {teams?.length > 0 &&
          teams.map((team, index) => (
            <Tab
              key={team.teamId}
              label={team.teamName}
              value={index}
              {...a11yProps(team.teamId)}
            />
          ))}
      </Tabs>
      <TabPanel value={value} index={value} style={{width:'100%'}}>
        <div className={classes.stats}>
          <div>Matches Won: {selectedTeam?.matchesWon}</div>
          <div>Matches Played: {selectedTeam?.matchesPlayed}</div>
        </div>
        <h1>Players</h1>
        {selectedTeam?.players?.length>0 && selectedTeam.players.map(player=> <div className={classes.players}>
          <div className="image">
          <img src={SERVER_URL+player.image} alt={player.firstName}/>
          </div>
          <div>
            {player.firstName} {player.lastName}
          </div>
        </div>)}
      </TabPanel>
      </div>
      <div className={classes.edit}>
      <Button variant="outlined" color="primary" >
        <Link to={`/teams/edit/${selectedTeam?.teamId}/${selectedTeam?.teamName}`}>Edit team</Link>
      </Button>
      </div>
    </div>
  );
}
