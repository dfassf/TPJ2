
--설치해야 할 파일들
--npm i body-parser cookie-parser cors crypto dotenv express express-session mysql mysql2 nunjucks path router sequelize sequelize-cli
 

--application, interview, review에 foreign key 부여
ALTER TABLE application
ADD CONSTRAINT curr_app_id
FOREIGN KEY (curr_id)
REFERENCES curriculum(id); 	

ALTER TABLE interview
ADD CONSTRAINT curr_int_id
FOREIGN KEY (curr_id)
REFERENCES curriculum(id); 	

ALTER TABLE review
ADD CONSTRAINT curr_rev_id
FOREIGN KEY (curr_id)
REFERENCES curriculum(id); 	

alter table curriculum drop foreign key curr_app_id;
alter table interview drop foreign key curr_int_id;
alter table review drop foreign key curr_rev_id;




--user에서:
-- SELECT * FROM user 
-- AS A LEFT JOIN (select username, userclass from curriculum) AS B ON A.curr_id=B.id;


select id, title, userid, content, date_format(date, '%Y-%m-%d %h:%i:%s') as date, hit, curr_id, `show` from review order by id desc limit 3


insert into user (userid,userpw,username,gender,userdt,usertype) values('11','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('12','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('13','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('14','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('15','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('16','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('17','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('18','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('19','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('20','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('21','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('22','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('23','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('24','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('25','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('26','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('27','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('28','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('29','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('30','1','1',1,now(),1);
insert into user (userid,userpw,username,gender,userdt,usertype) values('31','1','1',1,now(),1);


insert into curriculum (subject, start_date, end_date, registereddate, content, recruit, `show`) values('1',now(),now(),now(),'1',1,1);
insert into curriculum (subject, start_date, end_date, registereddate, content, recruit, `show`) values('2',now(),now(),now(),'2',1,1);
insert into curriculum (subject, start_date, end_date, registereddate, content, recruit, `show`) values('3',now(),now(),now(),'3',1,1);
insert into curriculum (subject, start_date, end_date, registereddate, content, recruit, `show`) values('4',now(),now(),now(),'4',1,1);
insert into curriculum (subject, start_date, end_date, registereddate, content, recruit, `show`) values('5',now(),now(),now(),'5',1,1);
insert into curriculum (subject, start_date, end_date, registereddate, content, recruit, `show`) values('6',now(),now(),now(),'6',1,1);
insert into curriculum (subject, start_date, end_date, registereddate, content, recruit, `show`) values('7',now(),now(),now(),'7',1,1);
insert into curriculum (subject, start_date, end_date, registereddate, content, recruit, `show`) values('8',now(),now(),now(),'8',1,1);
insert into curriculum (subject, start_date, end_date, registereddate, content, recruit, `show`) values('9',now(),now(),now(),'9',1,1);
insert into curriculum (subject, start_date, end_date, registereddate, content, recruit, `show`) values('10',now(),now(),now(),'10',1,1);