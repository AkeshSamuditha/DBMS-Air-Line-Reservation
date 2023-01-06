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
            const body = method.getBody();

            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;
            
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getAvailableSeats(method){
        try{
            const body = method.getBody();

            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;
            
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }


    async getBookFlight(method){
        try{
            const body = method.getBody();

            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;
            
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getSeatPrice(method){
        try{
            const body = method.getBody();

            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;
            
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getFlightStatus(method){
        try{
            const body = method.getBody();

            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;
            
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getDestinations(method){
        try{
            const body = method.getBody();

            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;
            
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getBookedFlightDetails(method,user){
        try{
            const body = method.getBody();

            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;

            const data = await user.getBookedFlightDetails(From,To,From_Date,To_Date);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getPastFlights(method,user){
        try{
            const body = method.getBody();

            const PID = body.PID;

            const data = await user.getPastFlights(PID);
            return(data);
        }catch(err){
            return err;
        }
    }

    /////////////////////////////////// POST ///////////////////////////////////////////////////
    async postCancelBooking(method){
        try{
            const body = method.getBody();

            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;
            
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);
           
        }catch(err){
            return err;
        }
    }

    async postGuestUserSubmission(method){
        try{
            const body = method.getBody();

            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;
            
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);

        }catch(err){
            return err;
        }
    }

    /////////////////////////////////// UPDATE ///////////////////////////////////////////////////


    /////////////////////////////////// DELETE ///////////////////////////////////////////////////
}

module.exports = UserControl;
