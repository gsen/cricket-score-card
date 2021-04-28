const express = require('express')
const router = express.Router()
const db = require('./db');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
// router.get('/', function (req, res) {
//   res.send('Birds home page')
// })
// define the about route
router.get('/', function (req, res) {
  const {username,password} = req.body;
  const result = await db.authenticate(username,password);
  res.send('About birds')
})

module.exports = router