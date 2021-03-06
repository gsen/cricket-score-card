const express = require('express')
const router = express.Router()
const db = require('./db');


router.post('/', async (req, res) =>{
  const {teamName} = req.body;
  try{
      const teamId = await db.createTeam(teamName);
      if(teamId>0){
        res.status(201).json(teamId);
      }else{
        res.send(null);
      }
  }catch(error){
    if(error.code="ER_DUP_ENTRY"){
      res.status(500).send(`Team with name:${teamName} already created. Please try with a differnt name.`)
    }else{
      res.status(500).send(error.message);
    }
  }
})

router.get('/all', async (req, res) =>{
  res.json(await db.getAllTeams());
})

router.get('/:teamId/stats', async(req,res)=>{
  res.json(await db.getTeamStats(req.params.teamId))
})

router.put('/', async (req, res) =>{
  const {teamName, teamId} = req.body;
  try{
      const rowsAffected = await db.updateTeamName(teamName, teamId);
      if(rowsAffected>0){
        res.status(201).json(rowsAffected);
      }else{
        res.send(0);
      }
  }catch(error){
    if(error.code="ER_DUP_ENTRY"){
      res.status(500).send(`Team with name:${teamName} already created. Please try with a differnt name.`)
    }else{
      res.status(500).send(error.message);
    }
  }
})


module.exports = router