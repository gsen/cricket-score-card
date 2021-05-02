const express = require('express')
const app = express();
const cors = require('cors');
const auth = require('./auth');
const user = require('./user');
const team = require('./team');
const player = require('./player');
const match = require('./match');
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use('/user',user);
app.use('/auth',auth);
app.use('/team',team);
app.use('/player',player);
app.use('/match',match);
app.listen(3001,()=> {
//    db.main()
console.log('server started')
});

