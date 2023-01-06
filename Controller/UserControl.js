const {executeSQL} = require("../DB/db");

class UserControl{
    async getReservation(method,user){
        try{
            const body = method.getBody();
            // const count = body.count;
            const data = await executeSQL(`SELECT * FROM tickets`);
            return(data);
        }catch(err){
            return err;
        }
    }
    /////////////////////////// GET ///////////////////////////	
    async getFlights(method){
        try{
            const body = method.getBody();
            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;
            
            const data = await executeSQL(

            `Select Date_of_travel, Dep_time, Arr_time, Tickets_Remaining_First_Class, Tickets_Remaining_Business_Class, Tickets_Remaining_Economy_Class
             From Flights 
             where Route = (
                 Select Route_ID 
                 From Routes 
                 Where Origin_ID = '${From}' AND Destination_ID = '${To}' AND (Date_of_travel BETWEEN '${From_Date}' AND '${To_Date}')
                 order by Date_of_travel
                 );`
                
            );
            return(data);
        }catch(err){
            return err;
        }
    }

    async getRevenueByAircraftType(method){
        try{

            return("not implemented");
            const body = method.getBody();

            const Model = body.Model;
            const Brand = body.Brand;
            
            const sqlQuary = `Select MODEL_ID, Model, Brand, Revenue
            From Flights Left Join (select Airplane_ID, Model_ID, airplane_models.Model, Brand
            from Airplanes LEFT JOIN airplane_models
            on Model_ID = airplanes.Model) as A
            on Airplane = Airplane_ID
            GROUP by Model_ID;`;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getBookingsByPassengerType(method){
        try{

            return("not implemented");
            const body = method.getBody();

            const Model = body.Model;
            const Brand = body.Brand;
            
            const sqlQuary = `Select MODEL_ID, Model, Brand, Revenue
            From Flights Left Join (select Airplane_ID, Model_ID, airplane_models.Model, Brand
            from Airplanes LEFT JOIN airplane_models
            on Model_ID = airplanes.Model) as A
            on Airplane = Airplane_ID
            GROUP by Model_ID;`;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getRevenueByAircraftType(method){
        try{
            const body = method.getBody();

            const Model = body.Model;
            const Brand = body.Brand;
            
            const sqlQuary = `Select MODEL_ID, Model, Brand, Revenue
            From Flights Left Join (select Airplane_ID, Model_ID, airplane_models.Model, Brand
            from Airplanes LEFT JOIN airplane_models
            on Model_ID = airplanes.Model) as A
            on Airplane = Airplane_ID
            GROUP by Model_ID;`;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getAvailableSeats(method){
        try{
            const body = method.getBody();

            const Flight_ID = body.Flight_ID;
            
            const sqlQuary = `Select Class, seat_ID
            from tickets
            where Flight = '${Flight_ID}'
            Order by Class, seat_ID;`;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }


   

    async getSeatPrice(method){
        try{
            const body = method.getBody();

            const PID = body.PID;
            const Route = body.Route;
            const Class = body.Class;
        
            const sqlQuary = `CALL Ticket_Price('${PID}', '${Route}', '${Class}') `;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getFlightStatus(method){
        try{
            const body = method.getBody();

            const Flight_ID = body.Flight_ID;
            
            const sqlQuary = `Select Flight_Status from Flights where Flight_ID = '${Flight_ID}';`;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getDestinations(){
        try{            
            const sqlQuary = `select \* from Airports`;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getBookedFlightDetails(user){
        try{
            const data = await user.getBookedFlightDetails();
            return(data);
        }catch(err){
            return err;
        }
    }

    async getPastFlights(method){
        try{
            const body = method.getBody();

            const Origin_ID =  body.Origin_ID; 
            const Destination_ID = body.Destination_ID;

            const sqlQuary = `Create view Airplanes_w_seasts as
            SELECT Airplane_ID, (seat_count_First_Class+seat_count_Economy_Class+seat_count_Buisness_Class) as seat_count
            FROM Airplanes, Airplane_Models
            WHERE Airplanes.Model = Airplane_Models.Model_ID;
            
            SELECT Flight_ID, Airplane, Date_of_travel, Dep_time, Arr_time, (seat_count-(Tickets_Remaining_Business_Class+Tickets_Remaining_Economy_Class+Tickets_Remaining_First_Class)) as passenger_count
            FROM (Flights Left Join Airplanes_w_seasts on Airplane = Airplane_ID)
            WHERE route In (select route_ID
            FROM routes
            WHERE Origin_ID = "${Origin_ID}" AND Destination_ID = "${Destination_ID}");
            
            Drop view Airplanes_w_seasts;`;

            const data = await executeSQL(sqlQuary);

            return(data);
        }catch(err){
            return err;
        }
    }

    async RGetPastFlights(user){
        try{
            const data = await user.RGetPastFlights();
            return(data);
        }catch(err){
            return err;
        }
    }

    /////////////////////////////////// POST ///////////////////////////////////////////////////
    async postBookFlight(method){
        try{
            const body = method.getBody();

            const Flight_ID = body.Flight_ID;
            const Class = body.Class;
            const seat_ID = body.seat_ID;
            const PID = body.PID;
            const Adult_or_Child = body.Adult_or_Child;
            
            const sqlQuary = `CALL new_ticket('${Flight_ID}', '${Class}', '${seat_ID}', '${PID}', '${Adult_or_Child}');`;

            const data = await executeSQL(sqlQuary);
            
        }catch(err){
            return err;
        }
    }

    async postCancelBooking(method){
        try{
            const body = method.getBody();

            const  Ticket_ID = body.Ticket_ID;
            
            const sqlQuary = `CALL cancel_ticket("${Ticket_ID}");`;

            const data = await executeSQL(sqlQuary);
           
        }catch(err){
            return err;
        }
    }

    async postGuestUserSubmission(method){
        try{
            const body = method.getBody();

            const Title = body.Title;
            const First_Name = body.First_Name;
            const Last_Name = body.Last_Name;
            const Email = body.Email;
            const Telephone = body.Telephone;
            const Country = body.Country;

            
            const sqlQuary = `INSERT INTO USERS(Title, First_Name, Last_Name, Email, Telephone, Country) VALUES ('${Title}', '${First_Name}', '${Last_Name}', '${Email}', '${Telephone}', '${Country}');`;

            const data = await executeSQL(sqlQuary);

        }catch(err){
            return err;
        }
    }

    /////////////////////////////////// UPDATE ///////////////////////////////////////////////////


    /////////////////////////////////// DELETE ///////////////////////////////////////////////////
}



module.exports = UserControl;
