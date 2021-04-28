// get the client
const mysql = require('mysql2/promise');
 
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: 'mysqluser',
  database: 'dev',
  password:'mysql',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


 exports.authenticate = async(username,password)=> {
    let [rows]= await pool.execute('select `first_name`, `last_name`, `username`, `is_admin` from `users_tbl` where `username` = ? and `password` = ?',[username,password])
    return rows?.length > 0?rows[0]:null;
  }

