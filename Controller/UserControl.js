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
            // const count = body.count;
            const data = await executeSQL(`SELECT * FROM flights`);
            return(data);
        }catch(err){
            return err;
        }
    }
}



module.exports = UserControl;