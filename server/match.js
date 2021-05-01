const express = require("express");
const router = express.Router();
const db = require("./db");

router.post("/", async (req, res) => {
  try {
    const matchId = await db.createMatch(req.body);
    if (matchId > 0) {
      res.status(201).json(matchId);
    } else {
      res.send(null);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  const { teamId } = req.query;
  const rows = await db.getMatches(teamId);
  const matches = [];
  if (rows?.length) {
    for (let row of rows) {
      // add
      const { team1, team2, winner, matchDate, matchId } = row;
      const match = {
        id: matchId,
        team1: await db.getTeam(team1),
        team2: await db.getTeam(team2),
        winner: await db.getTeam(winner),
        matchDate: matchDate,
      };
      matches.push(match);
    }
  }
  res.json(matches);
});

router.get("/:id/scorecard", async (req, res) => {
  const matchId = req.params.id;
  const scores = await db.getScoreCard(matchId);
  const players = await db.getPlayers();
  const scoreCard = [];
  if (scores?.length > 0) {
    for (let score of scores) {
      scoreCard.push({
        id: score.id,
        player: players.find((p) => (p.id === score.playerId)),
        teamId: players.find((p) => (p.id === score.playerId))?.teamId,
        score: score.score,
      });
    }
  }
  res.json(scoreCard);
});

router.post('/:matchId/scorecard', async (req, res) =>{
  try{
    const {matchId} = req.params;
  const scoreCard = req.body
  let scoreId;
    if(scoreCard?.length>0){
      for(let score of scoreCard){
        scoreId = await db.addPlayerScore({...score, matchId});
      }
    }
     
      if(scoreId>0){
        res.status(201).json(scoreId);
      }else{
        res.send(null);
      }
  }catch(error){
    
      res.status(500).send(error.message);
    
  }
})

router.put("/", async (req, res) => {
  const { teamName, teamId } = req.body;
  try {
    const rowsAffected = await db.updateTeamName(teamName, teamId);
    if (rowsAffected > 0) {
      res.status(201).json(rowsAffected);
    } else {
      res.send(0);
    }
  } catch (error) {
    if ((error.code = "ER_DUP_ENTRY")) {
      res
        .status(500)
        .send(
          `Team with name:${teamName} already created. Please try with a differnt name.`
        );
    } else {
      res.status(500).send(error.message);
    }
  }
});

module.exports = router;
