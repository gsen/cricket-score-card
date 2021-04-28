DROP TABLE IF EXISTS users_tbl;
DROP TABLE IF EXISTS team_tbl;
DROP TABLE IF EXISTS player_tbl;
DROP TABLE IF EXISTS match_tbl;
DROP TABLE IF EXISTS player_score_tbl;

create table users_tbl(user_id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, username VARCHAR(100) NOT NULL UNIQUE,user_password VARCHAR(100) NOT NULL,is_admin BOOLEAN not NULL default 0, PRIMARY KEY (user_id));

create table team_tbl(team_id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL unique, PRIMARY KEY (team_id));

create table player_tbl(player_id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, team_id INT NOT NULL, image varchar(200),  
PRIMARY KEY (player_id),  CONSTRAINT FK_TeamPlayer FOREIGN KEY (team_id)
    REFERENCES team_tbl(team_id));
   
create table match_tbl(match_id INT NOT NULL AUTO_INCREMENT, team1 int not null, team2 int not null, match_date datetime, primary key(match_id),
CONSTRAINT FK_Team1 FOREIGN KEY (team1)
    REFERENCES team_tbl(team_id), CONSTRAINT FK_Team2 FOREIGN KEY (team2)
    REFERENCES team_tbl(team_id));

create table player_score_tbl(id INT NOT NULL AUTO_INCREMENT, match_id int not null, player_id int not null, score int not null, primary key(id),
CONSTRAINT FK_MatchScore FOREIGN KEY (match_id)
    REFERENCES match_tbl(match_id), CONSTRAINT FK_PlayerScore FOREIGN KEY (player_id)
    REFERENCES player_tbl(player_id));