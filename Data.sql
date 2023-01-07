insert into user_categories(User, Discription, Discount, Threashold) values ('F', 'Frequent', 0.05, 10),('G', 'Gold', 0.09, 50), ('N', 'New', 0.00, 0);
insert into class_types(Class, Discription, Price_per_air_mile) values ('E', 'Economy', 8), ('B','Buisness',15), ('F','First',25);

Insert into Locations(Location) values('Sri Lanka');
Insert into Locations(Location, Parent_ID) values('Colombo', 1);
Insert into Locations(Location) values('USA');
Insert into Locations(Location, Parent_ID) values('New York State', 3);
Insert into Locations(Location, Parent_ID) values('New York City', 4);
Insert into Locations(Location, Parent_ID) values('Hambantota', 1);
Insert into Locations(Location) values('India');
Insert into Locations(Location, Parent_ID) values('Delhi', 7);
Insert into Locations(Location, Parent_ID) values('Palam', 8);
Insert into Locations(Location, Parent_ID) values('Maharashtra', 7);
Insert into Locations(Location, Parent_ID) values('Mumbai', 10);
Insert into Locations(Location, Parent_ID) values('Tamil Nadu', 7);
Insert into Locations(Location, Parent_ID) values('Chennai', 12);
Insert into Locations(Location) values('Thailand');
Insert into Locations(Location, Parent_ID) values('Bangkok',14);
Insert into Locations(location) values('Singapore');
Insert into Locations(Location) values('Indoneasia');
Insert into Locations(Location, Parent_ID) values('Jakarta', 17);
Insert into Locations(Location, Parent_ID) values('Bali Island', 17);
Insert into Locations(Location, Parent_ID) values('Oklohoma', 3);
Insert into Locations(Location, Parent_ID) values('Buffalo City', 20);


insert into Users(Title, First_Name, Last_Name, Email, Telephone, Country) 
values('Mr.', 'Dilshan' ,'Karunarathna','DilshanKarunarathna@gmail.com', '+94701123891',  'Sri Lanka'), ('Mr.', 'Dilshan' ,'Karunarathnb','DilshanKarunarathnb@gmail.com', '+94701123892',  'Sri Lanka'),('Mrs.', 'Dilshan' ,'Karunarathnd','DilshanKarunarathnd@gmail.com', '+94701123894', 'Sri Lanka');

Insert into Airports(Airport_code, Airport_Name, Location) values('BIA','Bandaranaike International Airport' ,2);
Insert into Airports(Airport_code, Airport_Name, Location) values('HRI','Mattala Rajapaksa International Airport', 6);
Insert into Airports(Airport_code, Airport_Name, Location) values('BFK', 'Buffalo Municipal Airport', 21 );
Insert into Airports(Airport_code, Airport_Name, Location) values('DEL', 'Indira Gandhi International Airport', 9);
Insert into Airports(Airport_code, Airport_Name, Location) values('BOM', 'Chhatrapati Shivaji Maharaj International Airport', 11);
Insert into Airports(Airport_code, Airport_Name, Location) values('MAA', 'Chennai International Airport', 13 );
Insert into Airports(Airport_code, Airport_Name, Location) values('BKK', 'Bangkok Airport ', 15);
Insert into Airports(Airport_code, Airport_Name, Location) values('SIN', 'Singapore Changi Airport', 16);
Insert into Airports(Airport_code, Airport_Name, Location) values('CGK', 'Soekarno–Hatta International Airport', 18);
Insert into Airports(Airport_code, Airport_Name, Location) values('DPS', 'Denpasar Bali Airport', 19);
Insert into Airports(Airport_code, Airport_Name, Location) values('JFK', 'John F. Kennedy International Airport', 5);


insert into Routes values ('R1','BIA','JFK', 9396.32);
insert into Routes values ('R2','BOM','JFK', 8542.41 );
insert into Routes values ('R3','BIA','BOM', 948.51 );
insert into Routes values ('R4','DEL','JFK', 7913.95 );
insert into Routes values ('R5','MAA','JFK', 8995.55 );
insert into Routes values ('R6','SIN','JFK', 9395.88 );
insert into Routes values ('R7','CGK','JFK', 9745.95 );
insert into Routes values ('R8','JFK','CGK', 9745.95 );
insert into Routes values ('R9','JFK','SIN', 9395.88 );
insert into Routes values ('R10','JFK','DEL', 7913.95 );
insert into Routes values ('R11','JFK','BOM', 8542.41 );
insert into Routes values ('R12','JFK','BIA', 9396.32);
insert into Routes values ('R13','BOM','BIA', 948.51 );

insert into AirPlane_Models(Model_ID, Model, Brand, seat_count_First_Class,seat_count_Buisness_Class,seat_count_Economy_Class, No_of_planes) values ('M1', 'Boeing','747','20', '50', '400','4');
insert into AirPlane_Models(Model_ID, Model, Brand, seat_count_First_Class,seat_count_Buisness_Class,seat_count_Economy_Class, No_of_planes) values ('M2','Airbus','A350','20', '50','700','5');
insert into AirPlane_Models(Model_ID, Model, Brand, seat_count_First_Class,seat_count_Buisness_Class,seat_count_Economy_Class, No_of_planes) values ('M3','Airbus','A352','20', '50','900','1');
 

CALL new_flight('F1','A1','R1','2023-01-01','04:15:00','15:00:00');
CALL new_flight('F2','A2','R2','2023-01-01','05:30:00','14:00:00');
CALL new_flight('F3','A3','R3','2023-01-02','05:30:00','06:30:00');
CALL new_flight('F4','A4','R4','2023-01-02','06:30:00','17:30:00');
CALL new_flight('F5','A1','R5','2023-01-03','08:30:00','18:00:00');
CALL new_flight('F6','A2','R6','2023-01-03','05:30:00','12:00:00');
CALL new_flight('F7','A3','R7','2023-01-04','06:30:00','12:00:00');
CALL new_flight('F8','A4','R9','2023-01-04','08:30:00','14:30:00');
CALL new_flight('F9','A1','R8','2023-01-05','05:30:00','15:30:00');
CALL new_flight('F10','A2','R10','2023-01-05','09:30:00','18:00:00');
CALL new_flight('F11','A3','R8','2023-01-06','05:30:00','14:00:00');

CALL new_ticket('F2', 'E', 2, '2', 'A' );
CALL new_ticket('F2', 'E', 3, '2', 'C' );
CALL new_ticket('F1', 'E', 3, '1', 'A' );
CALL new_ticket('F1', 'B', 1, '3', 'C' );
CALL new_ticket('F1', 'F', 1, '1', 'A' );
CALL new_ticket('F1', 'F', 2, '3', 'C' );


select * from Flights;
select * from airplanes;
select * from tickets;
SELECT * FROM Users;
Select * from Locations;
select * from AirPlane_Models;
select * from routes order by Route_ID;
select * from Registered_Users;
