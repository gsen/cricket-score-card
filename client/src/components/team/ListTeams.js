import React, { useEffect,useState } from 'react'
import { listTeams } from '../../service';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';

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
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'auto',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function ListTeams() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(()=>{
      const getAllTeams = async()=>{
          let teams = await listTeams();
          
          setTeams(teams);
          teams?.length>0 && setSelectedTeam(teams[0]) ;
          
      }
      getAllTeams();
  },[])
  const handleChange = (event, index) => {
    setValue(index);
    setSelectedTeam(teams[index]);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
          {teams?.length>0 && teams.map((team,index)=>( <Tab key={team.teamId} label={team.teamName} value={index} {...a11yProps(team.teamId)} />))}
       
      </Tabs>
      <TabPanel value={value} index={value}>
        {selectedTeam?.teamName}
        <Button variant="outlined" color="primary" >
        <Link to={`/teams/edit/${selectedTeam?.teamId}/${selectedTeam?.teamName}`}>Edit team</Link>
      </Button>
      </TabPanel>
    </div>
  );
}

