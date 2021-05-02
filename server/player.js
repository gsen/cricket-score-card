const express = require('express')
const router = express.Router()
const db = require('./db');
const multer = require('multer');
const path = require('path');
// create a folder called uploads
//define storage for where file is to be uploaded
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '/uploads/'))
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now()+ file.mimetype.replace('image/','.'))
  }
});

// using multer to upload file
var upload = multer({ storage: storage });

router.post('/',upload.single('image'), async (req, res) =>{
  try{
    if(req.body.id){
      let rowUpdated= await db.updatePlayer(req.body, `/uploads/${req.file.filename}`)
      if(rowUpdated>0){
        res.status(201).json(rowUpdated);
      }else{
        res.send(null);
      }
    }else{
      const playerId = await db.createPlayer(req.body, `/uploads/${req.file.filename}`);
      if(playerId>0){
        res.status(201).json(playerId);
      }else{
        res.send(null);
      }
    }
  }catch(error){
    
      res.status(500).send(error.message);
    
  }
})




router.get('/', async (req, res) =>{
  const {teamId=null} = req.query
   res.json(await db.getPlayers(teamId));
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