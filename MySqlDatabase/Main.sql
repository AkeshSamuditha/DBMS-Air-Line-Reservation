DROP DATABASE IF EXISTS `airline`;
CREATE DATABASE `airline`; 
USE `airline`;
SET @@session.time_zone='+05:30';

create table user_categories( 
	User char(1) DEFAULT 'N',
    Discription varchar(8),
	Discount FLOAT(5, 2) Not Null DEFAULT '0.000' , -- 000.00 to 100.00 
	Threashold int Not Null Default '0',
	primary key(User),
	
	Check (discount >= 0 AND threashold >= 0)
);

-- insert into user_categories(User, Discription, Discount, Threashold) values ('F', 'Frequent', 0.05, 10),('G', 'Gold', 0.09, 50), ('N', 'New', 0.00, 0);


CREATE TABLE Locations(
	location_ID int AUTO_INCREMENT,
	Location varchar(30),
    Parent_ID int DEFAULT NULL,
    
    PRIMARY KEY(location_ID),
    FOREIGN KEY(Parent_ID) REFERENCES Locations(location_ID));
    

create table class_types(
	Class char(1),
	Discription varchar(10) ,
	Price_per_air_mile int Not Null,
	
	Primary Key(Class),
	
    Check (price_per_air_mile > 0)
);

-- insert into class_types(Class, Discription, Price_per_air_mile) values ('E', 'Economy', 8), ('B','Buisness',15), ('F','First',25);



create table AirPlane_Models(
	Model_ID varchar(4),
	Model varchar(10) Not Null,
	Brand varchar(15) Not Null,
	seat_count_First_Class int Not Null DEFAULT 0,
	seat_count_Buisness_Class int Not Null Default 0,
	seat_count_Economy_Class int Not Null Default 0,
	No_of_planes int Not Null,
	
	primary key(Model_ID),
    UNIQUE KEY same_mode(Model, Brand),
    
    Check (seat_count_First_Class >= 0 AND seat_count_Buisness_Class >=0 AND seat_count_Economy_Class >= 0 AND No_of_planes >= 0));

create table Airplanes(
	id int AUTO_INCREMENT,
	Airplane_ID varchar(5),
	Model varchar(10) Not Null,
	
	primary key(id),
	foreign key(Model) references AirPlane_Models(Model_ID) 
);
CREATE INDEX idx_Airplane_ID ON Airplanes (Airplane_ID);


    
create table users(
    PID int AUTO_INCREMENT,
	Title char(4),
	First_Name varchar(30) NOT NULL,
    Last_Name varchar(30) NOT NULL,
	Email varchar(30) NOT NULL,
	Telephone varchar(15) NOT NULL,
	Country varchar(30) NOT NULL,	
	User_type char(1) NOT NULL DEFAULT 'G',

	primary key(PID),

	check (Title In ("Mr." , "Mrs.", "Ms.", "Miss", Null)));
            

create table registered_users(
	Registered_date DATETIME DEFAULT CURRENT_TIMESTAMP, -- YYYY-MM-DD HH:MM:SS
	PID int,
	UserName varchar(30) NOT NULL unique,
	Password varchar(60) NOT NULL,
	Date_of_Birth Date NOT NULL, -- YYYY-MM-DD
	Address varchar(50),
    user_category char(1) NOT NULL DEFAULT 'N',
	Total_Bookings int NOT NULL default 0,
	
    primary key(PID),
	
	Foreign Key(user_category) References user_categories(User) ON UPDATE CASCADE on delete Restrict,
	Foreign Key(PID) References Users(PID) ON UPDATE CASCADE on delete Restrict,
    
	check (Total_bookings >= 0));

create table Session_table(
	Session_id varchar(30) NOT NULL,
	User_Id int,
	Last_used_time int,

	Primary Key(User_Id),
	foreign key(User_Id) references users(PID) ON UPDATE CASCADE
);

create table Airports(
	Airport_code char(3),
	Airport_Name varchar(100) Not Null UNIQUE,
	Location int NOT NULL,
	
	primary key(Airport_code),
    FOREIGN KEY(Location) REFERENCES Locations(location_ID));


create table Routes(
	Route_ID varchar(5),
	Origin_ID varchar(3),
	Destination_ID varchar(3),
	Miles int,
	
	primary key(Route_ID),
	foreign key(Origin_ID) references Airports(Airport_code) ON UPDATE CASCADE on delete Cascade,
	foreign key(Destination_ID) references Airports(Airport_code) ON UPDATE CASCADE on delete Cascade
);


create table Flights(
	Flight_ID varchar(5),
	Airplane varchar(5),
	Route varchar(5),
	Date_of_travel date,
	Dep_time time,
	Arr_time time,
	Tickets_Remaining_First_Class int  NOT NULL DEFAULT 0,
	Tickets_Remaining_Business_Class int  NOT NULL DEFAULT 0,
	Tickets_Remaining_Economy_Class int  NOT NULL DEFAULT 0,
	Revenue numeric(8,2) NOT NULL DEFAULT 0,
	Flight_Status varchar(10) NOT NULL DEFAULT 'Scheduled',
	
	primary key(Flight_ID),
	foreign key(Airplane) references Airplanes(Airplane_ID) ON UPDATE CASCADE on delete Cascade,
	foreign key(Route) references Routes(Route_ID) ON UPDATE CASCADE on delete Cascade,
    UNIQUE KEY (Date_of_travel, Airplane),

	Check (Tickets_Remaining_First_Class>=0 AND Tickets_Remaining_Business_Class >=0 AND  Tickets_Remaining_Economy_Class >=0)
);


CREATE table Tickets(
	Time_of_Booking DATETIME default CURRENT_TIMESTAMP,
	Flight varchar(5),
	Ticket_ID int AUTO_INCREMENT,
	class char(1),
	seat_ID int(3),
	price numeric(8,2),
	PID int,
	Adult_or_Child char(1),
	
	primary key(Ticket_ID),
	foreign key(Flight) references Flights(Flight_ID) ON UPDATE CASCADE on delete Cascade,
	foreign key(PID) references Users(PID) ON UPDATE CASCADE on delete Cascade,
	foreign key(class) references class_types(Class) ON UPDATE CASCADE on delete Restrict,
	UNIQUE KEY seat_allocation(Flight,class, seat_ID),
	check (price>= 300),
	check (Adult_or_Child In ("A", "C")),
	check (seat_ID >= 0 AND seat_ID <= 300)
);

DELIMITER //
CREATE FUNCTION Ticket_Price(PID int, Route varchar(5), C char(1))
RETURNS int
DETERMINISTIC
BEGIN
	DECLARE price int DEFAULT 0;
	DECLARE discount int DEFAULT 0;
	DECLARE user_categories char(1);
	
	Set Price = (Select Price_per_air_mile from class_types WHERE Class = C)*(SELECT Miles FROM routes WHERE Route_ID = Route);
	
	if (Select User_type from users where PID = PID LIMIT 1) = 'R' then
		set user_categories = (Select User_category from Registered_Users where PID = PID);
		set discount = (select discount from user_categories where User = user_categories);
	end if;
	
	return Price - (Price * discount);
END//
Delimiter ;


DELIMITER //
CREATE FUNCTION get_tickets_remaining(Airplane varchar(5), Class char(1))
RETURNS int
DETERMINISTIC
BEGIN
	DECLARE tickets int DEFAULT 0;
	IF Class = 'F' THEN
		Set tickets = (SELECT seat_count_First_Class FROM AirPlane_Models WHERE Model_ID = (Select Model FROM Airplanes WHERE Airplane_ID = Airplane));
	ELSEIF Class = 'B' THEN
		Set tickets = (SELECT seat_count_Buisness_Class FROM AirPlane_Models WHERE Model_ID = (Select Model FROM Airplanes WHERE Airplane_ID = Airplane));
	ELSEIF Class = 'E' THEN
		Set tickets = (SELECT seat_count_Economy_Class FROM AirPlane_Models WHERE Model_ID = (Select Model FROM Airplanes WHERE Airplane_ID = Airplane));
	END IF;
	RETURN tickets;
END//
Delimiter ;


DELIMITER //
CREATE PROCEDURE New_Registered_User(Title varchar(4), First_Name varchar(30), Last_Name varchar(30), Email varchar(30), Telephone varchar(15), Country varchar(30), UserName varchar(30), Password varchar(30), DOB Date, Address varchar(50))
BEGIN
	DECLARE Last_PID INT DEFAULT 0;
	
	START TRANSACTION;
	
	INSERT INTO USERS(Title, First_Name, Last_Name, Email, Telephone, Country, User_type) VALUES (Title, First_Name, Last_Name, Email, Telephone, Country, 'G');
	SET Last_PID = LAST_INSERT_ID();
	INSERT INTO Registered_Users(PID, UserName, Password, Date_of_Birth, Address) VALUES (Last_PID, UserName, Password, DOB, Address);
	
	COMMIT;
END//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE new_flight(F varchar(5), A varchar(5), R VARCHAR(5), D DATE, D_time TIME, A_time TIME)
BEGIN
    INSERT INTO Flights(Flight_ID, Airplane ,Route ,Date_of_travel ,Dep_time ,Arr_time,Tickets_Remaining_First_Class, Tickets_Remaining_Business_Class, Tickets_Remaining_Economy_Class) 
	VALUES (F, A, R, D, D_time, A_time, get_tickets_remaining(A, 'F'), get_tickets_remaining(A,'B'), get_tickets_remaining(A,'E'));
END//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE new_ticket(F varchar(5), C char(1), seat_ID varchar(5),  PID int, Adult_or_Child char(1))
BEGIN
	DECLARE ticket_price int;
    DECLARE R varchar(5);
	SET Adult_or_Child = UPPER(Adult_or_Child);
	SET R = (SELECT Route FROM flights where FLIGHT_ID = F);
    SET ticket_price = Ticket_Price(PID, R, C);

	START TRANSACTION;	
	
    INSERT INTO tickets(Flight,class, seat_ID, price, PID, Adult_or_Child) values (F, C, seat_ID, ticket_price, PID, Adult_or_Child);
	CALL Change_Tickets_Remaining(F, C, -1);

	UPDATE Registered_Users SET Total_bookings = Total_bookings + 1 WHERE PID = PID;
	UPDATE Flights set Revenue = Revenue + ticket_price WHERE Flight_ID = F;

    COMMIT;
END//
DELIMITER ;


DELIMITER //
Create PROCEDURE cancel_ticket(Ticket int)
BEGIN

	DECLARE PID varchar(5);
	DECLARE F varchar(5);
	DECLARE C char(1);


	SET PID = (SELECT PID FROM tickets WHERE Ticket_ID = Ticket LIMIT 1);
	SET F = (SELECT Flight FROM tickets WHERE Ticket_ID = Ticket);
	SET C = (SELECT class FROM tickets WHERE Ticket_ID = Ticket);

	START TRANSACTION;

	CALL Change_Tickets_Remaining(F, C, 1);
	UPDATE Registered_Users SET Total_bookings = Total_bookings - 1 WHERE Registered_Users.PID = PID;
    UPDATE Flights set Revenue = Revenue - (select price from Tickets where Tickets.Ticket_ID = Ticket) WHERE Flight_ID = F;
	DELETE FROM tickets WHERE Ticket_ID = Ticket;

	COMMIT;
END//
DELIMITER;


DELIMITER //
CREATE PROCEDURE flight_delay(Flight_ID varchar(5), Delay_time TIME)
BEGIN
	UPDATE flights SET Arr_time = Arr_time + Delay_time WHERE Flight_ID = Flight_ID;
	UPDATE flights SET Flight_Status = 'Delayed' WHERE Flight_ID = Flight_ID;
END//
DELIMITER ;


DELIMITER //
CREATE TRIGGER select_user_category
After UPDATE
ON Registered_Users FOR EACH ROW
BEGIN
	UPDATE Registered_Users,user_categories
	SET  User_type = 
	(Case 
		WHEN Total_bookings >= (select Threashold FROM user_categories WHERE User='G')  THEN 'G'
		WHEN Total_bookings >= (select Threashold FROM user_categories WHERE User='F')  THEN 'F'
		ELSE 'N' END);
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Change_Tickets_Remaining(F varchar(5), C char(1), N int) 
BEGIN
	IF C = 'F' THEN
    	UPDATE flights SET flights.Tickets_Remaining_First_Class = Flights.Tickets_Remaining_First_Class + N WHERE Flight_ID = F;
	ELSEIF C = 'B' THEN
		UPDATE flights SET flights.Tickets_Remaining_Business_Class = Flights.Tickets_Remaining_Business_Class + N WHERE Flight_ID = F;
	ELSEIF C = 'E' THEN
		UPDATE flights SET flights.Tickets_Remaining_Economy_Class = Flights.Tickets_Remaining_Economy_Class + N WHERE Flight_ID = F;
	END IF;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER new_airplane_model 
After INSERT ON AirPlane_Models 
FOR EACH ROW
BEGIN
	DECLARE i INT DEFAULT 1;
	DECLARE A_ID varchar(5) DEFAULT 'A1';
	DECLARE M_ID varchar(4) default NEW.MODEL_ID;
	
	WHILE i <= (New.No_of_planes) DO
		IF (Select id from Airplanes order by id desc limit 1) is null THEN
			SET A_ID = 'A1';
		ELSE
			SET A_ID = concat('A', (Select id from Airplanes order by id desc limit 1)+1);
		END IF;
		Insert Into Airplanes(Airplane_ID, Model) values (A_ID, M_ID);
		SET i = i + 1;
	END WHILE;
END//
DELIMITER ;

select * from Flights;
select * from airplanes;
select * from tickets;
SELECT * FROM Users;
Select * from Locations;
select * from AirPlane_Models;
select * from routes order by Route_ID;
