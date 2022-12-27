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

    async getFlights(method,user){
        try{
            const body = method.getBody();
            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;
            
            const data = await executeSQL(

            `Select Date_of_travel, Dep_time, Arr_time, Tickets_Remaining 
             From Flights 
             where Route = (
                 Select Route_ID 
                 From Routes 
                 Where Origin_ID = '${From}' AND Destination_ID = '${To}' AND (Date_of_travel BETWEEN '${From_Date}' AND '${To_Date}')
                 order by Date_of_travel
                 ) AND Tickets_remaining > 0;`
                
            );
            return(data);
        }catch(err){
            return err;
        }
    }
}



module.exports = UserControl;
