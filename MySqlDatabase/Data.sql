INSERT INTO user_categories(category, discription, Discount, threashold) VALUES ('F', 'Frequent', 0.05, 10),('G', 'Gold', 0.09, 50), ('N', 'New', 0.00, 0);
INSERT INTO class_types(class, discription, price_per_air_mile) VALUES ('E', 'Economy', 8), ('B','Buisness',15), ('P','Platinum',25);
-- INSERT INTO admins(admin_name, admin_password) VALUES ('admin', 'admin'); 


INSERT INTO locations(location) VALUES('Sri Lanka');
INSERT INTO locations(location, parent_ID) VALUES('Colombo', 1);
INSERT INTO locations(location) VALUES('USA');
INSERT INTO locations(location, parent_ID) VALUES('New York State', 3);
INSERT INTO locations(location, parent_ID) VALUES('New York City', 4);
INSERT INTO locations(location, parent_ID) VALUES('Hambantota', 1);
INSERT INTO locations(location) VALUES('India');
INSERT INTO locations(location, parent_ID) VALUES('Delhi', 7);
INSERT INTO locations(location, parent_ID) VALUES('Palam', 8);
INSERT INTO locations(location, parent_ID) VALUES('Maharashtra', 7);
INSERT INTO locations(location, parent_ID) VALUES('Mumbai', 10);
INSERT INTO locations(location, parent_ID) VALUES('Tamil Nadu', 7);
INSERT INTO locations(location, parent_ID) VALUES('Chennai', 12);
INSERT INTO locations(location) VALUES('Thailand');
INSERT INTO locations(location, parent_ID) VALUES('Bangkok',14);
INSERT INTO locations(location) VALUES('Singapore');
INSERT INTO locations(location) VALUES('Indoneasia');
INSERT INTO locations(location, parent_ID) VALUES('Jakarta', 17);
INSERT INTO locations(location, parent_ID) VALUES('Bali Island', 17);
INSERT INTO locations(location, parent_ID) VALUES('Oklohoma', 3);
INSERT INTO locations(location, parent_ID) VALUES('Buffalo City', 20);


INSERT INTO airports(airport_code, airport_Name, location) VALUES('BIA','Bandaranaike International Airport' ,2);
INSERT INTO airports(airport_code, airport_Name, location) VALUES('HRI','Mattala Rajapaksa International Airport', 6);
INSERT INTO airports(airport_code, airport_Name, location) VALUES('BFK', 'Buffalo Municipal Airport', 21 );
INSERT INTO airports(airport_code, airport_Name, location) VALUES('DEL', 'Indira Gandhi International Airport', 9);
INSERT INTO airports(airport_code, airport_Name, location) VALUES('BOM', 'Chhatrapati Shivaji Maharaj International Airport', 11);
INSERT INTO airports(airport_code, airport_Name, location) VALUES('MAA', 'Chennai International Airport', 13 );
INSERT INTO airports(airport_code, airport_Name, location) VALUES('BKK', 'Bangkok Airport ', 15);
INSERT INTO airports(airport_code, airport_Name, location) VALUES('SIN', 'Singapore Changi Airport', 16);
INSERT INTO airports(airport_code, airport_Name, location) VALUES('CGK', 'Soekarno–Hatta International Airport', 18);
INSERT INTO airports(airport_code, airport_Name, location) VALUES('DPS', 'Denpasar Bali Airport', 19);
INSERT INTO airports(airport_code, airport_Name, location) VALUES('JFK', 'John F. Kennedy International Airport', 5);


INSERT INTO routes VALUES ('R1','BIA','JFK', 9396.32);
INSERT INTO routes VALUES ('R2','BOM','JFK', 8542.41 );
INSERT INTO routes VALUES ('R3','BIA','BOM', 948.51 );
INSERT INTO routes VALUES ('R4','DEL','JFK', 7913.95 );
INSERT INTO routes VALUES ('R5','MAA','JFK', 8995.55 );
INSERT INTO routes VALUES ('R6','SIN','JFK', 9395.88 );
INSERT INTO routes VALUES ('R7','CGK','JFK', 9745.95 );
INSERT INTO routes VALUES ('R8','JFK','CGK', 9745.95 );
INSERT INTO routes VALUES ('R9','JFK','SIN', 9395.88 );
INSERT INTO routes VALUES ('R10','JFK','DEL', 7913.95 );
INSERT INTO routes VALUES ('R11','JFK','BOM', 8542.41 );
INSERT INTO routes VALUES ('R12','JFK','BIA', 9396.32);
INSERT INTO routes VALUES ('R13','BOM','BIA', 948.51 );


INSERT INTO airplane_models(model_ID, model, brand, seat_countP,seat_countB,seat_countE, no_of_planes) VALUES ('M1', 'Boeing','747','20', '100', '450','4');
INSERT INTO airplane_models(model_ID, model, brand, seat_countP,seat_countB,seat_countE, no_of_planes) VALUES ('M2','Airbus','A350','25', '60','270','5');
INSERT INTO airplane_models(model_ID, model, brand, seat_countP,seat_countB,seat_countE, no_of_planes) VALUES ('M3','Airbus','A352','40', '80','240','1');
 

CALL new_flight('F1','A1','R1','2023-01-14','04:15:00','15:00:00');
CALL new_flight('F2','A2','R2','2023-01-14','05:30:00','14:00:00');
CALL new_flight('F3','A3','R3','2023-01-14','05:30:00','06:30:00');
CALL new_flight('F4','A4','R4','2023-01-14','06:30:00','17:30:00');
CALL new_flight('F90','A5','R4','2023-01-14','06:30:00','17:30:00');
CALL new_flight('F5','A1','R5','2023-01-15','08:30:00','18:00:00');
CALL new_flight('F6','A2','R6','2023-01-13','05:30:00','12:00:00');
CALL new_flight('F7','A3','R7','2023-01-13','06:30:00','12:00:00');
CALL new_flight('F8','A4','R9','2023-01-13','08:30:00','14:30:00');
CALL new_flight('F9','A10','R8','2023-01-14','05:30:00','15:30:00');
CALL new_flight('F10','A2','R10','2023-01-16','09:30:00','18:00:00');
CALL new_flight('F11','A3','R8','2023-01-16','05:30:00','14:00:00');
CALL new_flight('F12','A5','R13','2023-01-16','06:00:00','10:00:00');
CALL new_flight('F13','A4','R7','2023-01-16','06:45:00','16:45:00');
CALL new_flight('F14','A8','R11','2023-01-18','07:30:00','16:00:00');
CALL new_flight('F15','A3','R9','2023-01-19','08:00:00','17:00:00');
CALL new_flight('F16','A10','R7','2023-02-07','12:30:00','22:30:00');
CALL new_flight('F17','A2','R12','2023-02-07','06:00:00','16:00:00');
CALL new_flight('F18','A3','R12','2023-02-08','07:00:00','17:00:00');
CALL new_flight('F19','A4','R8','2023-02-07','06:30:00','15:00:00');
CALL new_flight('F20','A5','R3','2023-02-07','08:30:00','09:30:00');
CALL new_flight('F21','A1','R8','2023-02-08','05:30:00','15:30:00');
CALL new_flight('F22','A6','R1','2023-02-08','04:15:00','15:00:00');
CALL new_flight('F23','A3','R3','2023-02-09','09:30:00','10:45:00');
CALL new_flight('F24','A4','R9','2023-02-08','09:30:00','15:30:00');
CALL new_flight('F25','A5','R13','2023-02-08','05:00:00','09:00:00');
CALL new_flight('F26','A9','R9','2023-02-09','08:00:00','17:00:00');
CALL new_flight('F27','A2','R9','2023-02-09','08:30:00','17:45:00');
CALL new_flight('F28','A3','R2','2023-02-10','05:30:00','14:00:00');
CALL new_flight('F29','A4','R6','2023-02-09','05:30:00','12:00:00');
CALL new_flight('F30','A6','R7','2023-02-09','04:15:00','15:00:00');
CALL new_flight('F31','A6','R6','2023-02-10','05:45:00','12:30:00');
CALL new_flight('F32','A1','R6','2023-02-10','05:30:00','12:00:00');
CALL new_flight('F33','A2','R6','2023-02-10','06:30:00','13:00:00');
CALL new_flight('F34','A3','R11','2023-02-11','07:30:00','16:00:00');
CALL new_flight('F35','A10','R12','2023-02-10','07:00:00','17:00:00');
CALL new_flight('F36','A5','R11','2023-02-10','08:30:00','17:45:00');
CALL new_flight('F37','A6','R10','2023-02-11','09:30:00','18:00:00');
CALL new_flight('F38','A1','R11','2023-02-11','07:30:00','16:00:00');
CALL new_flight('F39','A2','R12','2023-02-11','07:00:00','17:00:00');
CALL new_flight('F40','A7','R2','2023-02-12','08:30:00','17:00:00');
CALL new_flight('F41','A4','R1','2023-02-11','04:15:00','15:00:00');
CALL new_flight('F42','A5','R2','2023-02-11','05:30:00','14:00:00');



insert INTO admins(admin_name, admin_password) VALUES ('admin', '$2a$10$35QCTy/gi9fdeECwK8qRi.QUHZ3fEdwq8v.71gHSC5MTCzzB448Ju');
INSERT INTO users (`PID`, `title`, `first_name`, `last_name`, `email`, `telephone`, `country`, `user_type`) VALUES ('1', 'Mr', 'Akesh', 'Samuditha', 'akeshsamuditha@gmail.com', '0703812594', 'Sri Lanka', 'R');
INSERT INTO registered_users (`registered_date`, `PID`, `username`, `password`, `date_of_birth`, `address`, `user_category`, `total_bookings`) VALUES ('0000-01-01 00:00:00', '1', 'Akesh', '$2a$10$utsw1D2Kydja0PP5.yiCwOcYBrwMRzDTvOcK.nCmkxpd6VXAo/NhO', '2001-01-28', 'No, 46 Wariyagoda, Alawwa', 'G', '100000');
CALL new_guest_user('Mr.', 'Supun' ,'Karunarathna','Supun@gmail.c0m', '+94701133821',  'Sri Lanka', 'F1', 'P', '15', 'A');
CALL new_guest_user('Mr.', 'Dilshan' ,'Lakmal','Dilshan@gmail.com', '+94701243892',  'Sri Lanka', 'F2', 'E', '12', 'A');
CALL new_guest_user('Mrs.', 'Nadil' ,'Samuditha','Nadil@gmail.com', '+94701423894', 'Sri Lanka' , 'F4', 'E', '17', 'A');



CALL new_ticket('F2', 'E', '2', '2', 'A' );
CALL new_ticket('F2', 'E', '3', '2', 'C' );
CALL new_ticket('F1', 'E', '3', '1', 'A' );
CALL new_ticket('F1', 'B', '1', '3', 'C' );
CALL new_ticket('F1', 'P', '1', '1', 'A' );
CALL new_ticket('F1', 'P', '2', '3', 'C' );


CALL flight_delay('F3', '03:00:00');
CALL flight_delay('F10', '01:00:00');

select * from Flights;
select * from airplanes;
select * from tickets;
SELECT * FROM users;
Select * from locations;
select * from airPlane_models;
select * from routes order by Route_ID;
select * from Registered_users;
select * from airports;
select * from admins;
select * From flights;