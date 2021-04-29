const express = require('express')
const app = express();
const cors = require('cors');
const auth = require('./auth');
const user = require('./user');
const team = require('./team');
const player = require('./player');
app.use(cors());
app.use(express.json());

app.use('/user',user);
app.use('/auth',auth);
app.use('/team',team);

app.user('/player',player);
app.listen(3001,()=> {
//    db.main()
console.log('server started')
});

