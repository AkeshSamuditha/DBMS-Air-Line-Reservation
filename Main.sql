DROP DATABASE IF EXISTS `airline`;
CREATE DATABASE `airline`; 
USE `airline`;

create table user_types( 
	User char(1) DEFAULT 'N',
    Discription varchar(8),
	Discount FLOAT(4, 3) Not Null DEFAULT '0.000' ,
	Threashold int Not Null Default '0',
	primary key(User),
	
	Check (discount >= 0 AND threashold >= 0)
);

insert into user_types(User, Discription, Discount, Threashold) values ('F', 'Frequent', 0.05, 10),('G', 'Gold', 0.09, 50), ('N', 'New', 0.00, 0);


create table class_types(
	Class char(1),
	Discription varchar(10) ,
	Price_per_air_mile int Not Null,
	
	Primary Key(Class),
	
    Check (price_per_air_mile > 0)
);

insert into class_types(Class, Discription, Price_per_air_mile) values ('E', 'Economy', 8), ('B','Buisness',15), ('P','Platinum',25);

create table Routes(
	Route_ID varchar(5),
	Origin_ID varchar(3),
	Destination_ID varchar(3),
	Miles int,
	
	primary key(Route_ID),
	foreign key(Origin_ID) references Airports(Airport_code) ON UPDATE CASCADE on delete Cascade,
	foreign key(Destination_ID) references Airports(Airport_code) ON UPDATE CASCADE on delete Cascade
);

insert into Routes values ('R1','JFK','CMK', 200);
insert into Routes values ('R2','CMK','JFK', 200);


create table AirPlane_Models(
	-- Type char(1) default 'M',
	Model_ID varchar(4),
	Model varchar(10) Not Null,
	Brand varchar(15) Not Null,
	seat_count varchar(3) Not Null,
	No_of_planes int Not Null,
	
	primary key(Model_ID),
    UNIQUE KEY same_mode(Model, Brand),
    
    Check (seat_count > 0 AND No_of_planes >= 0));

insert into AirPlane_Models(Model_ID, Model, Brand, seat_count, No_of_planes) 
values ('M1', 'Boeing','747','400','4'),
	('M2','Airbus','A350','898','5'),
	('M3','Airbus','A352','900','1');

     
    
create table Registered_users(
	Registered_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Type char(1) default 'R',
	-- PID int(7) unsigned ZEROFILL AUTO_INCREMENT,
    PID varchar(7),
	Passport varchar(15) UNIQUE Not Null,
	First_Name varchar(30) NOT NULL,
    Last_Name varchar(30) NOT NULL,
    User_type char(1) NOT NULL DEFAULT 'N',
	Email varchar(30) UNIQUE NOT NULL,
	Telephone varchar(15) UNIQUE NOT NULL,
	Age int,
	Sex char(1),
	Address varchar(50) NOT NULL,
	Total_bookings int Default '0',
	

	primary key(PID),
	Foreign Key(User_type) References user_types(User) ON UPDATE CASCADE on delete Restrict,
	
	check (Total_bookings >= 0),
	check (sex In ("M" , "F", Null)));
            

insert into Registered_Users(PID, Passport, First_Name, Last_Name, Email, Telephone, Age, Sex, Address, Total_Bookings) values('U1','N87973274234','Dilshan' ,'Karunarathna','DilshanKarunarathna@gmail.com', +94701123891, 38,'M', 'Sri Lanka', 10);
insert into Registered_Users(PID, Passport, First_Name, Last_Name, Email, Telephone, Age, Sex, Address, Total_bookings) values('U2','N87973274235','Dilshan' ,'Karunarathnb','DilshanKarunarathnb@gmail.com', +94701123892, 38,'M', 'Sri Lanka', 49);
insert into Registered_Users(PID, Passport, First_Name, Last_Name, Email, Telephone, Age, Sex, Address, Total_bookings) values('U4','N87973274237','Dilshan' ,'Karunarathnd','DilshanKarunarathnd@gmail.com', +94701123894, 38,'M', 'Sri Lanka', 10);


create table Guests(
	Type char(1) default 'S',
	PID varchar(6),
	UserName varchar(30),
    User_type char(1) NOT NULL DEFAULT 'N',
	-- Age int,
	
	primary key(PID));


create table Airplanes(
	Airplane_ID varchar(5),
	Model varchar(4),
    Status BOOLEAN DEFAULT TRUE,
	
	primary key(Airplane_ID),
	foreign key(Model) references AirPlane_Models(Model_ID) ON UPDATE CASCADE on delete Cascade
);

insert into Airplanes(Airplane_ID, Model) values ('A1','M1'); 
insert into Airplanes(Airplane_ID, Model) values ('A2','M1');
insert into Airplanes(Airplane_ID, Model) values ('A3','M2');
insert into Airplanes(Airplane_ID, Model) values ('A4','M3');


create table Airports( -- Need to Organize Some data
	Airport_code char(3),
	Airport_Name varchar(100) Not Null UNIQUE,
	Location int NOT NULL,
	
	primary key(Airport_code),
    FOREIGN KEY(Location) REFERENCES Locations(Location));

-- insert into Airports values ('CMK','Bandaranayake International Airport','Katunayake','Colombo','Sri Lanka');
-- insert into Airports values ('JFK','John F. Kennedy International Airport','Queens','New York','USA');


CREATE TABLE Locations( -- Need to Create Some data
	location_ID int AUTO_INCREMENT,
    Parent_ID int DEFAULT NULL,
    Location varchar(30),
    
    PRIMARY KEY(location_ID),
    FOREIGN KEY(Parent_ID) REFERENCES Locations(location_ID));



create table Flights(
	Flight_ID varchar(5),
	Airplane varchar(5),
	Route varchar(5),
	Date_of_travel date,
	Dep_time time,
	Arr_time time,
	Tickets_Remaining int  NOT NULL DEFAULT 0,
	
	primary key(Flight_ID),
	foreign key(Airplane) references Airplanes(Airplane_ID) ON UPDATE CASCADE on delete Cascade,
	foreign key(Route) references Routes(Route_ID) ON UPDATE CASCADE on delete Cascade,
    UNIQUE KEY (Date_of_travel, Airplane),

	Check (Tickets_Remaining>=0)
);

-- insert into Flights(Flight_ID, Airplane,Route, Date_of_travel,Dep_time, Arr_time) values ('F1','A1','R1','2023-01-01','04:15:00','09:00:00');
-- insert into Flights values ('F2','A2','R2','2023-01-01','05:30:00','12:00:00',5);
-- insert into Flights values ('F3','A3','R1','2023-01-02','13:30:00','19:15:00',1);
-- insert into Flights values ('F4','A4','R1','2023-01-02','14:15:00','20:30:00',2);


create table Tickets(
	Time_of_Booking DATETIME default CURRENT_TIMESTAMP,
	Flight varchar(5),
	Ticket_ID int AUTO_INCREMENT,
	seat_ID varchar(3),
	price numeric(8,2),
	class varchar(10),
	PID varchar(6),
	
	primary key(Ticket_ID),
	foreign key(Flight) references Flights(Flight_ID) ON UPDATE CASCADE on delete Cascade,
	foreign key(PID) references Registered_users(PID) ON UPDATE CASCADE on delete Cascade,
	-- foreign key(PID) references Guests(PID) ON UPDATE CASCADE on delete Restrict,
	foreign key(class) references class_types(Class) ON UPDATE CASCADE on delete Restrict,
	UNIQUE KEY seat_allocation(Flight, seat_ID),
	check (price>= 300)
);


DELIMITER //
Create PROCEDURE selec_user_type()
BEGIN
    UPDATE Registered_Users,user_types
	SET  User_type = 
    (Case 
		WHEN Total_bookings >= (select Threashold FROM user_types WHERE User='G')  THEN 'G'
		WHEN Total_bookings >= (select Threashold FROM user_types WHERE User='F')  THEN 'F'
		ELSE 'N' END);
END//
DELIMITER ;

CREATE TRIGGER new_user
After INSERT
ON Registered_users FOR EACH ROW
	CALL Selec_User_type()

DELIMITER //
CREATE TRIGGER ticket_booked   
After INSERT  
ON Tickets FOR EACH ROW
BEGIN	
	UPDATE Registered_Users, Tickets 
		SET Registered_Users.Total_bookings = Registered_Users.Total_bookings + 1  
			WHERE Registered_Users.PID = Tickets.PID;
	CALL Selec_User_type();
END//
DELIMITER ;

-- create FUNCTION ticket_remaining(airplane varchar(5))
-- RETURNS int DETERMINISTIC
-- RETURN (Select seat_count FROM airplane_models RIGHT OUTER JOIN airplanes ON Model_ID = airplanes.Model WHERE airplane = Airplane_ID);

DELIMITER //
CREATE PROCEDURE new_flight(F varchar(5), A varchar(5), R VARCHAR(5), D DATE, D_time TIME, A_time TIME)
BEGIN
	-- IF condition to check whether same Airplane have 2 Flights
	DECLARE seats int;
    SET seats = (Select seat_count FROM airplane_models RIGHT OUTER JOIN airplanes ON Model_ID = airplanes.Model WHERE A = Airplane_ID);
    INSERT INTO Flights (SELECT F, A, R, D, D_time, A_time, seats WHERE (SELECT Status FROM airplanes where Airplane_ID = A));
    UPDATE airplanes SET Status = false where Airplane_ID = A; 
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE new_ticket(F varchar(5), seat_ID varchar(5), C char(1), PID varchar(5))
BEGIN
	-- if CONDITION TO CHECK WHETHER FLIGHT IS AVAILABLE
	DECLARE ticket_price int;
    DECLARE R varchar(5);
    SET R = (SELECT Route FROM flights where FLIGHT_ID = F);
    SET ticket_price = (Select Price_per_air_mile from class_types WHERE Class = C)*(SELECT Miles FROM routes WHERE Route_ID = R);
    
    INSERT INTO tickets(Flight, seat_ID, price, class, PID) SELECT F, seat_ID, ticket_price, C, PID WHERE (SELECT Tickets_Remaining FROM flights where Route = R) > 0;
    
    UPDATE flights SET flights.Tickets_Remaining = Flights.Tickets_Remaining - 1 WHERE Flight_ID = F;
    
END//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE flight_delay()
BEGIN
	-- Pocedure for flight delays
END//
DELIMITER ;



CALL new_flight('F1','A1','R1','2023-01-01','04:15:00','09:00:00');
CALL new_flight('F2','A2','R2','2023-01-01','05:30:00','12:00:00');
CALL new_ticket('F2', 2, 'E', 'U2' );
select * from Flights;
select * from airplanes;
select * from tickets;
SELECT * FROM Registered_users;
