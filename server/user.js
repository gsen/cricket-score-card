const express = require('express')
const router = express.Router()
const db = require('./db');


router.post('/create', async (req, res) =>{
  const {username,password, firstName, lastName} = req.body;
  const userId = await db.createUser({username,password, firstName, lastName});
  if(userId>0){
    res.status(201).json(userId);
  }else{
    res.send(null);
  }
})


module.exports = router