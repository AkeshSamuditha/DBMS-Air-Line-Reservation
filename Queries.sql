-- Reservation Details: When From, To and Date Range(From_Date,To_Date) is given and available Flights will be given
Select Date_of_travel, Dep_time, Arr_time, Tockets_remaining 
From Flights 
where Route = (
    Select Route_ID 
    From Routes 
    Where Origin_ID = 'From' AND Destination_ID = 'To' AND Date_of_travel BETWEEN 'From_Date' AND 'To_Date'
    order by Date_of_travel
    ) AND Tockets_remaining > 0;

--  When User select number of tickets and class type, the price will be calculated along with that the tickets will be booked
    CALL new_ticket('Flight_ID', 'Seat_ID', 'Class_Type', 'Passenger_ID' );

-- Checking Flight Status
Select Status, Airplane_ID
From Airplane
Where Airplane_ID = (
    Select Flights.Airplane 
    From Flights 
    where Route = (
        Select Route_ID 
        From Routes 
        Where Origin_ID = 'From' AND Destination_ID = 'To' AND Date_of_travel BETWEEN 'From_Date' AND 'To_Date'
        order by Date_of_travel
        )
    );
;