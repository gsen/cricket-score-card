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
    let [rows]= await pool.execute('select `first_name`, `last_name`, `username`, `is_admin` from `users_tbl` where `username` = ? and `user_password` = ?',[username,password])
    return rows?.length > 0?rows[0]:null;
  }

  exports.createUser = async(userInfo)=> {
    const {username,password, firstName, lastName} = userInfo;
    let [result] = await pool.execute('insert into users_tbl(`first_name`,`last_name`,`username`, `user_password`) values (?,?, ?, ?);',[firstName,lastName,username,password])
    return result.insertId
  }
// related to team
  exports.createTeam = async(teamName)=>{
    let [result] = await pool.execute('insert into team_tbl(`name`) values (?);',[teamName]);
    return result.insertId;
  }


  exports.updateTeamName = async(teamName, teamId)=>{
    let [rows] = await pool.execute('update team_tbl set `name` = ? where `team_id` = ?',[teamName, teamId]);
    return rows.changedRows;
  }

  exports.getAllTeams = async()=>{
    let [rows] = await pool.execute('select `name` as teamName, `team_id` as teamId from team_tbl');
    return rows
  }

  exports.getTeam = async(teamId)=>{
    let [rows] = await pool.execute('select `name` as teamName, `team_id` as teamId from team_tbl where team_id = ?',[teamId]);
    return rows?.length>0?rows[0]:null;
  }

  // related to player
  exports.createPlayer = async(player, imageName)=>{
    const {firstName, lastName, teamId} = player;
    let [result] = await pool.execute('insert into player_tbl(`first_name`,`last_name`, `team_Id`, `image`) values (?,?,?,?);',[firstName,lastName,parseInt(teamId),imageName]);
    return result.insertId;
  }

  exports.getPlayers = async(teamId)=>{
    if(teamId){
      let [rows] = await pool.execute('select `player_id` as id, `first_name` as firstName, `last_name` as lastName from player_tbl where team_id = ?;',[teamId]);
    return rows;
    }
    let [rows] = await pool.execute('select `player_id` as id, `first_name` as firstName, `last_name` as lastName, `team_id` as teamId from player_tbl;');
    return rows;
  }
  
  
  // related to match
  exports.getMatches = async(teamId)=>{
    let [rows] = await pool.execute('select `match_id` as matchId, `team1`, `team2`, `winner`, `match_date` as matchDate from match_tbl where `team1` = ? or `team2` =?',[teamId, teamId]);
    return rows;
  }

  exports.createMatch = async(match)=>{
    const {team1, team2, matchDate, winner} = match;
    let [result] = await pool.execute('insert into match_tbl(`team1`,`team2`, `winner`, `match_date`) values (?,?,?,?);',[team1,team2,winner,matchDate.slice(0, 19).replace('T', ' ')]);
    return result.insertId;
  }

  exports.getScoreCard = async(matchId)=>{
    let [rows] = await pool.execute('select `id`, `match_id` as matchId, `player_id` as playerId, `score` from player_score_tbl where `match_id` = ?',[matchId]);
    return rows;
  }

  exports.addPlayerScore = async(playerScore)=>{
    const {playerId, matchId, score, id= undefined} = playerScore;
    if(!id){
      let [result] = await pool.execute('insert into player_score_tbl(`player_id`,`match_id`, `score`) values (?,?,?);',[playerId, matchId, score]);
      return result.insertId;
    }else if(id> 0){
      let [result] = await pool.execute('update player_score_tbl set `player_id` = ? and `match_id` = ? and  `score` = ? where id = ?;',[playerId, matchId, score, id]);
      return result.changedRows;
    }
  }


