create table Registered_user(ID varchar(6),
			    U_name varchar(30),
			    Age int,
                            Total_bookings int,
                            User_type varchar(8) Default 'NOOB',
                            primary key(ID),
                            
                            Check (User_Type = "Gold" or "Frequent" or "NOOB" ));
                            
create table Guest(ID varchar(6),
		    U_name varchar(30),
                    Age int,
                    primary key(ID));

create table Model(ID varchar(2),
		    Model varchar(10),
		    Brand varchar(15),
		    seat_count varchar(3),
                    No_of_planes int,
                    primary key(ID));
                    
create table Airplane(Airplane_ID varchar(5),
		    Model_ID varchar(30),
                    primary key(Airplane_ID),
                    foreign key(Model_ID) references Model(ID));
                    
create table Airport(Airport_code char(3),
		    Airport_Name varchar(100),
		    City varchar(15),
                    State varchar(15),
                    Country varchar(15),
                    primary key(Airport_code));
                    
create table Route(Routine_ID varchar(5),
	        Origin_ID varchar(3),
                Destination_ID varchar(3),
                primary key(Routine_ID),
                foreign key(Origin_ID) references Airport(Airport_code),
                foreign key(Destination_ID) references Airport(Airport_code));
			
create table Flight(Flight_ID varchar(5),
		    Airplane_ID varchar(5),
                    Routine_ID varchar(5),
                    Date_of_travel date,
                    Dep_time time,
                    Arr_time time,
                    Tickets_bought int,
                    primary key(Flight_ID),
                    foreign key(Airplane_ID) references Airplane(Airplane_ID),
                    foreign key(Routine_ID) references Route(Routine_ID));
				
create table Ticket(Flight_ID varchar(5),
		    Ticket_ID varchar(5),
                    seat_ID varchar(3),
                    price numeric(8,2),
                    class varchar(10),
                    Passenger_ID varchar(6),
                    foreign key(Flight_ID) references Flight(Flight_ID),
                    foreign key(Passenger_ID) references Registered_user(ID),
                    foreign key(Passenger_ID) references Guest(ID));

create table user_type(U_type varchar(10),
		        discount int,
                        threashold int,
                        primary key(U_type));
                        
create table class_type(class varchar(10),
			price_per_air_mile int);
