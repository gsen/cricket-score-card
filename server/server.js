const express = require('express')
const app = express();
const cors = require('cors');
const auth = require('./auth');
app.use(cors());
app.use(express.json());

app.use('/auth',auth);

app.listen(3001,()=> {
//    db.main()
});

