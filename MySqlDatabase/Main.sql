DROP DATABASE IF EXISTS `airline`;

CREATE DATABASE `airline`;

USE `airline`;

SET @@session.time_zone='+05:30';

CREATE TABLE
    user_categories(
        category CHAR(1) DEFAULT 'N',
        discription VARCHAR(8),
        discount NUMERIC(4, 3) NOT NULL DEFAULT '0.000',
        -- 0.000 to 1.000 
        threashold INT NOT NULL DEFAULT 1000,
        -- Threashold at which user is categorized in to the relevent category
        PRIMARY KEY(category),
        CHECK (
            1 >= discount >= 0
            AND threashold >= 0
        )
    );

-- INSERT INTO user_categories(categories, Discription, Discount, Threashold) VALUES ('F', 'Frequent', 0.05, 10),('G', 'Gold', 0.09, 50), ('N', 'New', 0.00, 0);

CREATE TABLE
    class_types(
        class CHAR(1),
        discription VARCHAR(10),
        price_per_air_mile INT NOT NULL,
        PRIMARY KEY(class),
        CHECK (price_per_air_mile > 0)
    );

-- INSERT INTO class_types(class, discription, price_per_air_mile) VALUES ('E', 'Economy', 8), ('B','Buisness',15), ('P','Platinum',25);

CREATE TABLE
    airplane_models(
        model_ID VARCHAR(4),
        model VARCHAR(10) NOT NULL,
        brand VARCHAR(15) NOT NULL,
        seat_countP INT NOT NULL DEFAULT 0,
        seat_countB INT NOT NULL DEFAULT 0,
        seat_countE INT NOT NULL DEFAULT 0,
        no_of_planes INT NOT NULL,
        PRIMARY KEY(model_ID),
        UNIQUE KEY same_model(model, brand),
        CHECK (
            seat_countP >= 0
            AND seat_countB >= 0
            AND seat_countE >= 0
            AND no_of_planes >= 0
        )
    );

CREATE TABLE
    airplanes(
        id INT AUTO_INCREMENT,
        airplane_ID VARCHAR(5),
        model VARCHAR(10) NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY(model) REFERENCES airplane_models(model_ID)
    );

CREATE INDEX idx_airplane_ID ON airplanes (airplane_ID);

CREATE TABLE
    users(
        PID INT AUTO_INCREMENT,
        title CHAR(4),
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        email VARCHAR(30) NOT NULL UNIQUE,
        telephone VARCHAR(15) NOT NULL UNIQUE,
        country VARCHAR(30) NOT NULL,
        user_type CHAR(1) NOT NULL DEFAULT 'G',
        PRIMARY KEY(PID),
        CHECK (user_type IN ("G", "R")),
        CHECK (email LIKE '%@%' AND email Like  %.%),
        CHECK (LENGTH(telephone) = 10),
        CHECK (
            title IN (
                "Mr.",
                "Mrs.",
                "Ms.",
                "Miss",
                NULL
            )
        )
    );

CREATE INDEX idx_email ON users(email);

CREATE TABLE
    registered_users(
        registered_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        -- YYYY-MM-DD HH:MM:SS
        PID int,
        username VARCHAR(30) NOT NULL UNIQUE,
        password VARCHAR(60) NOT NULL,
        date_of_birth DATE NOT NULL,
        -- YYYY-MM-DD
        address VARCHAR(60),
        user_category CHAR(1) NOT NULL DEFAULT 'N',
        total_bookings INT NOT NULL DEFAULT 0,
        PRIMARY KEY(PID),
        FOREIGN KEY(user_category) REFERENCES user_categories(category) ON UPDATE CASCADE ON DELETE RESTRICT,
        FOREIGN KEY(PID) REFERENCES users(PID) ON UPDATE CASCADE ON DELETE RESTRICT,
        CHECK (date_of_birth < DATE_SUB(CURDATE(), INTERVAL 18 YEAR)),
        CHECK LENGTH(password) >= 8,
        CHECK (column_name LIKE '%@%') 
        CHECK (total_bookings >= 0)
    );

CREATE INDEX idx_username ON registered_users(username);

CREATE INDEX idx_password ON registered_users(password);

CREATE TABLE
    session_table(
        session_id VARCHAR(30) NOT NULL,
        user_Id INT,
        last_used_time BIGINT,
        PRIMARY KEY(user_Id),
        FOREIGN KEY(user_Id) REFERENCES users(PID) ON UPDATE CASCADE ON DELETE RESTRICT
    );

CREATE TABLE
    admins(
        admin_id INT AUTO_INCREMENT,
        admin_name VARCHAR(30) NOT NULL UNIQUE,
        admin_password VARCHAR(60) NOT NULL,
        PRIMARY KEY(admin_id),
        CHECK (LENGTH(admin_password) >= 8)
    );

CREATE TABLE
    locations(
        location_ID INT AUTO_INCREMENT,
        location VARCHAR(30),
        parent_ID INT DEFAULT NULL,
        PRIMARY KEY(location_ID),
        FOREIGN KEY(parent_ID) REFERENCES locations(location_ID) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE INDEX idx_location_parent ON locations(parent_ID);

CREATE TABLE
    airports(
        airport_code CHAR(3),
        airport_name VARCHAR(100) NOT NULL UNIQUE,
        location INT NOT NULL,
        PRIMARY KEY(airport_code),
        FOREIGN KEY(location) REFERENCES locations(location_ID)
    );

CREATE TABLE
    routes(
        route_ID VARCHAR(5),
        origin_ID VARCHAR(3),
        destination_ID VARCHAR(3),
        miles INT,
        PRIMARY KEY(route_ID),
        FOREIGN KEY(origin_ID) REFERENCES airports(airport_code) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY(destination_ID) REFERENCES airports(airport_code) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    flights(
        flight_ID VARCHAR(5),
        airplane VARCHAR(5),
        route VARCHAR(5),
        date_of_travel date,
        dep_time time,
        -- HH:MM:SS
        arr_time time,
        tickets_remainingP INT NOT NULL DEFAULT 0,
        -- Tickets remaining in the Platinum Class
        tickets_remainingB INT NOT NULL DEFAULT 0,
        -- Buisness Class
        tickets_remainingE INT NOT NULL DEFAULT 0,
        -- Economy Class
        revenue NUMERIC(50, 3) NOT NULL DEFAULT 0,
        flight_status VARCHAR(10) NOT NULL DEFAULT 'Scheduled',
        PRIMARY KEY(flight_ID),
        FOREIGN KEY(airplane) REFERENCES airplanes(airplane_ID) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY(route) REFERENCES routes(route_ID) ON UPDATE CASCADE ON DELETE CASCADE,
        UNIQUE KEY(date_of_travel, airplane),
        -- No two flights can be on the same day for the same airplane
        CHECK (
            tickets_remainingP >= 0
            AND tickets_remainingB >= 0
            AND tickets_remainingE >= 0
        )
    );

CREATE TABLE
    tickets(
        time_of_booking DATETIME DEFAULT CURRENT_TIMESTAMP,
        flight VARCHAR(5),
        ticket_ID INT AUTO_INCREMENT,
        class CHAR(1),
        seat_ID INT,
        price NUMERIC(20, 2),
        PID INT,
        adult_or_child CHAR(1),
        PRIMARY KEY(ticket_ID),
        FOREIGN KEY(flight) REFERENCES flights(flight_ID) ON UPDATE CASCADE ON DELETE RESTRICT,
        FOREIGN KEY(PID) REFERENCES users(PID) ON UPDATE CASCADE ON DELETE RESTRICT,
        FOREIGN KEY(class) REFERENCES class_types(class) ON UPDATE CASCADE ON DELETE RESTRICT,
        UNIQUE KEY seat_allocation(flight, class, seat_ID),
        -- No two tickets can be for the same seat in the same class for the same flight
        CHECK (adult_or_child In ("A", "C")),
        CHECK (
            seat_ID >= 0
            AND seat_ID <= 999
        )
    );

-- Function to calculate the price of a ticket for a given class, route and the category of the passenger

DELIMITER //

CREATE FUNCTION TICKET_PRICE(ID INT, R VARCHAR(5), 
C CHAR(1)) RETURNS NUMERIC(20, 2) DETERMINISTIC BEGIN 
	DECLARE price NUMERIC(20,2) DEFAULT 0;
	DECLARE discnt NUMERIC(5,2) DEFAULT 0;
	DECLARE usr_cat CHAR(1);
	SET price = (
	        SELECT price_per_air_mile
	        FROM class_types
	        WHERE class = C
	        LIMIT 1
	    ) * (
	        SELECT miles
	        FROM routes
	        WHERE route_ID = R
	        LIMIT 1
	    );
	IF (
	    SELECT user_type
	    FROM users
	    WHERE PID = ID
	    LIMIT 1
	) LIKE 'R' then
	set usr_cat = (
	        SELECT user_category
	        FROM registered_users
	        WHERE PID = ID
	    );
	set discnt = (
	        SELECT discount
	        FROM user_categories
	        WHERE category = usr_cat
	    );
	END IF;
	RETURN price - (price * discnt);
	END// 


Delimiter ;

-- Function to calculate the number of tickets remaining for a given class and flight

DELIMITER //

CREATE FUNCTION GET_TICKETS_REMAINING(A VARCHAR(5), 
C CHAR(1)) RETURNS INT DETERMINISTIC BEGIN 
	DECLARE tickets INT DEFAULT 0;
	IF C = 'P' THEN
	SET tickets = (
	        SELECT seat_countP
	        FROM airplane_models
	        WHERE model_ID = (
	                SELECT model
	                FROM airplanes
	                WHERE airplane_ID = A
	            )
	    );
	ELSEIF C = 'B' THEN
	SET tickets = (
	        SELECT seat_countB
	        FROM airplane_models
	        WHERE model_ID = (
	                SELECT model
	                FROM airplanes
	                WHERE Airplane_ID = A
	            )
	    );
	ELSEIF C = 'E' THEN
	SET tickets = (
	        SELECT seat_countE
	        FROM airplane_models
	        WHERE model_ID = (
	                SELECT model
	                FROM airplanes
	                WHERE Airplane_ID = A
	            )
	    );
	END IF;
	RETURN tickets;
	END// 


Delimiter ;

-- function to get location of a Airport
DELIMITER //
CREATE FUNCTION getLoc(L char(3))
RETURNS char(60)
DETERMINISTIC
BEGIN
    DECLARE loc VARCHAR(60);
    SET loc = (SELECT locations.location FROM locations WHERE location_ID = (SELECT location FROM airports WHERE airport_code = L) LIMIT 1);
    RETURN loc;
END//
DELIMITER ;

-- Procedure to add new flights

DELIMITER //

CREATE PROCEDURE NEW_FLIGHT(F VARCHAR(5), A VARCHAR
(5), R VARCHAR(5), D DATE, D_TIME TIME, A_TIME TIME
) BEGIN 
	INSERT INTO
	    Flights(
	        flight_ID,
	        airplane,
	        route,
	        date_of_travel,
	        dep_time,
	        Arr_time,
	        tickets_remainingP,
	        tickets_remainingB,
	        tickets_remainingE
	    )
	VALUES (
	        F,
	        A,
	        R,
	        D,
	        D_time,
	        A_time,
	        get_tickets_remaining(A, 'P'),
	        get_tickets_remaining(A, 'B'),
	        get_tickets_remaining(A, 'E')
	    );
	END// 


DELIMITER ;

-- Procedure to add new registered users

DELIMITER //

CREATE PROCEDURE NEW_GUEST_USER(TITLE VARCHAR(4), FIRST_NAME 
VARCHAR(30), LAST_NAME VARCHAR(30), EMAIL VARCHAR(
30), TELEPHONE VARCHAR(15), COUNTRY VARCHAR(30), F 
VARCHAR(5), C CHAR(1), SEAT_ID INT, ADULT_OR_CHILD 
CHAR(1)) BEGIN 
	DECLARE PID INT DEFAULT 0;
	START TRANSACTION;
	INSERT INTO
	    users(
	        title,
	        first_Name,
	        last_Name,
	        email,
	        telephone,
	        country,
	        user_type
	    )
	VALUES (
	        title,
	        first_Name,
	        last_Name,
	        email,
	        telephone,
	        country,
	        'G'
	    );
	SET PID = LAST_INSERT_ID();
	-- Get the PID of the last inserted user
	CALL new_ticket(F, C, seat_ID, PID, adult_or_child);
	COMMIT;
	END// 


DELIMITER ;

-- Procedure to add ticket booking

DELIMITER //

CREATE PROCEDURE NEW_TICKET(F VARCHAR(5), C CHAR(1)
, SEAT_ID INT, ID INT, ADULT_OR_CHILD CHAR(1)) BEGIN 
	DECLARE tikt_price NUMERIC(20,2);
	DECLARE R VARCHAR(5);
	SET adult_or_child = UPPER(adult_or_child);
	SET R = (SELECT route FROM flights WHERE flight_ID = F);
	-- set the route of the flight
	SET tikt_price = ticket_Price(ID, R, C);
	-- Calculate the price of the ticket
	START TRANSACTION;
	INSERT INTO
	    tickets(
	        flight,
	        class,
	        seat_ID,
	        price,
	        PID,
	        adult_or_child
	    )
	values (
	        F,
	        C,
	        seat_ID,
	        tikt_price,
	        ID,
	        adult_or_child
	    );
	CALL change_tickets_remaining(F, C, -1);
	-- Change the tickets remaining for the flight and class
	UPDATE registered_users
	SET
	    total_bookings = total_bookings + 1
	WHERE PID = ID;
	-- Increase the number of bookings for the user
	UPDATE flights
	SET
	    revenue = revenue + tikt_price
	WHERE flight_ID = F;
	-- Increase the revenue of the flight
	COMMIT;
	END// 


DELIMITER ;

-- Procedure to cancle a ticket

DELIMITER //

CREATE PROCEDURE CANCEL_TICKET(TICKET INT) BEGIN 
	DECLARE ID VARCHAR(5);
	DECLARE F VARCHAR(5);
	DECLARE C CHAR(1);
	DECLARE tot INT;
	SET ID = (SELECT PID FROM tickets WHERE ticket_ID = ticket LIMIT 1);
	-- Get the PID of the user
	SET F = (SELECT flight FROM tickets WHERE ticket_ID = ticket);
	-- Get the flight ID
	SET C = (SELECT class FROM tickets WHERE ticket_ID = ticket);
	-- Get the class of the ticket
	SET tot = (
	        SELECT total_bookings
	        FROM registered_users
	        WHERE PID = ID
	    );
	START TRANSACTION;
	CALL change_tickets_remaining(F, C, 1);
	-- Increment the tickets remaining for the flight and class
	UPDATE registered_users
	SET total_bookings = tot - 1
	WHERE registered_users.PID = ID;
	-- Decrease the number of bookings for the user
	UPDATE flights
	set revenue = revenue - (
	        SELECT price
	        FROM tickets
	        WHERE
	            tickets.ticket_ID = ticket
	    )
	WHERE flight_ID = F;
	-- Decrease the revenue of the flight
	DELETE FROM tickets WHERE ticket_ID = ticket;
	COMMIT;
	END// 


DELIMITER;

-- Procedure to change the number of tickets remaining for a flight and class

DELIMITER //

CREATE PROCEDURE CHANGE_TICKETS_REMAINING(F VARCHAR
(5), C CHAR(1), N INT) BEGIN 
	IF C = 'P' THEN
	UPDATE flights
	SET
	    flights.tickets_remainingP = flights.tickets_remainingP + N
	WHERE flight_ID = F;
	ELSEIF C = 'B' THEN
	UPDATE flights
	SET
	    flights.tickets_remainingB = flights.tickets_remainingB + N
	WHERE flight_ID = F;
	ELSEIF C = 'E' THEN
	UPDATE flights
	SET
	    flights.tickets_remainingE = flights.tickets_remainingE + N
	WHERE flight_ID = F;
	END IF;
	END// 


DELIMITER ;

-- Procedure to delay flights

DELIMITER //

CREATE PROCEDURE FLIGHT_DELAY(F VARCHAR(5), DELAY_TIME 
TIME) BEGIN 
	UPDATE flights
	SET
	    Arr_time = Arr_time + Delay_time
	WHERE Flight_ID = F;
	UPDATE flights SET flight_status = 'Delayed' WHERE Flight_ID = F;
	END// 


DELIMITER ;

-- Trigger to update the user category of the user based on the no of bookings by the user

DELIMITER //

CREATE TRIGGER SELECT_USER_CATEGORY BEFORE UPDATE ON 
REGISTERED_USERS FOR EACH ROW BEGIN 
	DECLARE T int;
	SET
	    new.user_category = (
	        CASE
	            WHEN new.total_bookings >= (
	                SELECT threashold
	                FROM user_categories
	                WHERE
	                    category = 'G'
	            ) THEN 'G'
	            WHEN new.total_bookings >= (
	                SELECT threashold
	                FROM user_categories
	                WHERE
	                    category = 'F'
	            ) THEN 'F'
	            ELSE 'N'
	        END
	    );
	END// 


DELIMITER ;

-- Trigger to add new airplanes when a new airplane model is added

DELIMITER //

CREATE TRIGGER NEW_AIRPLANE_MODEL AFTER INSERT ON AIRPLANE_MODELS 
FOR EACH ROW BEGIN 
	DECLARE i INT DEFAULT 1;
	DECLARE A_ID VARCHAR(5) DEFAULT 'A1';
	DECLARE M_ID VARCHAR(4) DEFAULT NEW.MODEL_ID;
	WHILE i <= (NEW.No_of_planes)
	DO IF (
	        SELECT id
	        FROM airplanes
	        ORDER BY id DESC
	        LIMIT 1
	    ) IS NULL THEN
	SET A_ID = 'A1';
	ELSE
	SET A_ID = concat(
	        'A', (
	            SELECT id
	            FROM airplanes
	            ORDER BY id DESC
	            LIMIT 1
	        ) + 1
	    );
	END IF;
	INSERT INTO airplanes(airplane_ID, model) values (A_ID, M_ID);
	SET i = i + 1;
	END WHILE;
	END// 


DELIMITER ;

CREATE VIEW AIRPLANES_W_SEASTS AS 
	SELECT
	    airplane_ID, (
	        seat_countP + seat_countE + seat_countB
	    ) as seat_count
	FROM
	    airplanes,
	    airplane_models
	WHERE
	    airplanes.model = airplane_Models.m
MODEL_ID; 


CREATE VIEW In_Time AS
SELECT flight, PID, adult_or_child, origin_ID, destination_ID, flight_ID, dep_time, arr_time, flight_status, on_board FROM tickets RIGHT JOIN  (SELECT origin_ID, destination_ID, flight_ID, dep_time, arr_time, flight_status, (get_tickets_remaining(airplane, 'P' ) + get_tickets_remaining(airplane, 'B' ) + get_tickets_remaining(airplane, 'E' ) - (tickets_remainingP + tickets_remainingB + tickets_remainingE)) as on_board
FROM routes AS R
RIGHT JOIN flights AS F ON Route_ID  =route
WHERE CURRENT_TIMESTAMP 
BETWEEN dep_time AND arr_time AND CURDATE() = date_of_travel) AS A ON flight = flight_ID;



SELECT * FROM Flights;

SELECT * FROM airplanes;

SELECT * FROM tickets;

SELECT * FROM Users;

SELECT * FROM Locations;

SELECT * FROM Airplane_Models;

SELECT * FROM routes order by Route_ID;