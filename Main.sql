create table user_type( 
	U_type varchar(8) DEFAULT 'Noob',
	discount int Not Null,
	threashold int Not Null,
	primary key(U_type)
	
	CHECK (U_type="Frequent" or U_type="Gold" or U_type= 'Noob')
	Check (discount>0 AND threashold >0)
	
);

insert into User_Type values ('Frequent',0.05,10);
insert into User_Type values ('Gold',0.09,50);


create table class_type(
	name varchar(10),
	price_per_air_mile int Not Null
	
	Primary Key(name)
	
	Check ((name = 'Economy' or
	       name = 'Buisness' or
	       name = 'Platinum') and
	       price_per_air_mile > 0)
);

insert into Class_Types values ('Economy',8);
insert into Class_Types values ('Buisness',15);
insert into Class_Types values ('Platinum',25);


create table Registered_user(
	Registered_date DATETIME DEFAULT GETDATE()
	PID char(6),
	Passport varchar(15) Not Null; 
	user_name varchar(30) UNIQUE NOT NULL,
	Email varchar(30) UNIQUE NOT NULL
	Telephone varchar(15) UNIQUE NOT NULL
	Age int,
	Sex varchar(6) Default
	Address varchar(50),
	Total_bookings int Default '0',
	User_type varchar(8) Default 'Noob',

	primary key(ID),
	Foreign Key(User_type) Reference class_type(Class)
	
	check (Total_bookings >=0)
	check (sex = "Male" or sex = "Female" or sex is Null ));
            

insert into Registered _User values ('P00001','Dilshan Karunarathna','DilshanKarunarathna@gmail.com', +94701123891, 38, Sri Lanka, 3,'Gold');
insert into Registered _User values ('P00002','Kasun Rathnayake',25,10,'Noob'); --Need To Insert Data--
insert into Registered _User values ('P00003','Nadun Bandara',26,1,'Frequent');
insert into Registered _User values ('P00004','Akesh Samuditha',28,5,'Gold');
insert into Registered _User values ('P00005','Charindu Thisara',38,3,'Noob');


create table Guest(
	ID varchar(6),
	UserName varchar(30),
	Age int,
	
	primary key(ID));


create table AirPlane_Model(
	Model_ID varchar(2),
	Model varchar(4) Not Null,
	Brand varchar(15) Not Null,
	seat_count varchar(3) Not Null,
	No_of_planes int Not Null,
	
	primary key(ID));

insert into Model values ('M001','Boeing','747','400','4');
insert into Model values ('M002','Airbus','A350','898','5');
insert into Model values ('M003','Airbus','A350','900','1');


create table Airplane(
	Airplane_ID varchar(5),
	Model varchar(4),
	
	primary key(Airplane_ID),
	foreign key(Model) references AirPlane_Model(Model_ID));

insert into Airplane values ('A0001','M001');
insert into Airplane values ('A0002','M001');
insert into Airplane values ('A0003','M002');
insert into Airplane values ('A0004','M003');


create table Airport(
	Airport_code char(3),
	Airport_Name varchar(100) Not Null UNIQUE,
	City varchar(15),
	State varchar(15),
	Country varchar(15),
	
	primary key(Airport_code));

insert into Airport values ('CMK','Bandaranayake International Airport','Katunayake','Colombo','Sri Lanka');
insert into Airport values ('JFK','John F. Kennedy International Airport','Queens','New York','USA');


create table Route(
	Route_ID varchar(5),
	Origin_ID varchar(3),
	Destination_ID varchar(3),
	Miles int,
	
	primary key(Route_ID),
	foreign key(Origin_ID) references Airport(Airport_code),
	foreign key(Destination_ID) references Airport(Airport_code)
);

insert into Route values ('R0001','JFK','CMK', 200);
insert into Route values ('R0002','CMK','JFK', 200);


create table Flight(
	Flight_ID varchar(5),
	Airplane varchar(5),
	Route varchar(5),
	Date_of_travel date,
	Dep_time time,
	Arr_time time,
	Tickets_Remaining int, --Can inster default value using tabel--
	
	primary key(Flight_ID),
	foreign key(Airplane) references Airplane(Airplane_ID),
	foreign key(Route_ID) references Route(Route),

	Check (Tickets_bought>=0)
);

insert into Flight values ('00001','A0001','R0001','2023-01-01','04:15:00','09:00:00',2);
insert into Flight values ('00002','A0002','R0002','2023-01-01','05:30:00','12:00:00',5);
insert into Flight values ('00003','A0003','R0001','2023-01-02','13:30:00','19:15:00',1);
insert into Flight values ('00004','A0004','R0001','2023-01-02','14:15:00','20:30:00',2);


create table Ticket(
	Time_of_Booking DATETIME default GETDATE(),
	Flight varchar(5),
	Ticket_ID varchar(5),
	seat_ID varchar(3),
	price numeric(8,2),
	class varchar(10),
	PID varchar(6),
	
	primary key(Ticket_ID)
	foreign key(Flight) references Flight(Flight_ID),
	foreign key(PID) references Registered_user(ID),
	foreign key(PID) references Guest(PID)
	foreign key(class) reference class_type(name)
	
	check (price>= 300)
);



