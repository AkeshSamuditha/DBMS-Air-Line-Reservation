insert into Registered _User values ('R00001','Dilshan Karunarathna',38,3,'Gold');
insert into Registered _User values ('R00002','Kasun Rathnayake',25,10,'Noob');
insert into Registered _User values ('R00003','Nadun Bandara',26,1,'Frequent');
insert into Registered _User values ('R00004','Akesh Samuditha',28,5,'Gold');
insert into Registered _User values ('R00005','Charindu Thisara',38,3,'Noob');

insert into Guest values ('U00001','Akesh Samuditha',23);
insert into Guest values ('U00002','Savindu Rajapaksha',24);
insert into Guest values ('U00003','Supun Adikari',24);
insert into Guest values ('U00004','Sandaruth Siriwardhana',26);
insert into Guest values ('U00005','Tharaka Chathuranga',22);

insert into Airplane values ('A0001','M001');
insert into Airplane values ('A0002','M001');
insert into Airplane values ('A0003','M002');
insert into Airplane values ('A0004','M003');

insert into Airport values ('CMK','Bandaranayake International Airport','Katunayake','Colombo','Sri Lanka');
insert into Airport values ('JFK','John F. Kennedy International Airport','Queens','New York','USA');

insert into Model values ('M001','Boeing','747','400','4');
insert into Model values ('M002','Airbus','A350','898','5');
insert into Model values ('M003','Airbus','A350','900','1');

insert into Route values ('R0001','JMK','CMK');
insert into Route values ('R0002','CMK','JMK');

insert into Flight values ('00001','A0001','R0001','2023-01-01','04:15:00','09:00:00',2);
insert into Flight values ('00002','A0002','R0002','2023-01-01','05:30:00','12:00:00',5);
insert into Flight values ('00003','A0003','R0001','2023-01-02','13:30:00','19:15:00',1);
insert into Flight values ('00004','A0004','R0001','2023-01-02','14:15:00','20:30:00',2);

insert into User_Type values ('Frequent',0.05,10);
insert into User_Type values ('Gold',0.09,50);

insert into Class_Types values ('Economy',8);
insert into Class_Types values ('Buisness',15);
insert into Class_Types values ('Platinum',25);
