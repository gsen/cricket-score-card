DROP TABLE IF EXISTS users_tbl;

create table users_tbl(user_id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, username VARCHAR(100) NOT NULL,user_password VARCHAR(100) NOT NULL,is_admin BOOLEAN not NULL default 0, PRIMARY KEY (user_id));

insert into users_tbl(first_name,last_name,username, user_password,is_admin) 
values ('admin','user', 'admin@test.com', 'admin123', 1);