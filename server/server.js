const express = require('express')
const app = express();
const cors = require('cors');
const auth = require('./auth');
const user = require('./user');
app.use(cors());
app.use(express.json());

app.use('/user',user);
app.use('/auth',auth);

app.listen(3001,()=> {
//    db.main()
console.log('server started')
});

