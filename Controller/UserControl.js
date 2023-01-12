const {executeSQL} = require("../DB/db");

class UserControl{

    /////////////////////////// GET ///////////////////////////	
    //8
    async getFlights(method) {
        try {
            const body = method.getBody();
            const From = body.from;
            const To = body.to;
            const From_Date = body.from_date;
            const To_Date = body.to_date;
            // console.log(body)
            // console.log("SHIT",From,To,From_Date,To_Date);

            const sqlQuary = `
                SELECT flight_ID, date_of_travel, dep_time, arr_time, tickets_remainingP, tickets_remainingB, tickets_remainingE, flight_Status
                FROM flights
                WHERE route = (
                    SELECT route_ID
                    FROM routes
                    WHERE origin_ID = ? AND destination_ID = ? AND date_of_travel BETWEEN ? AND ? AND date_of_travel > CURDATE()
                    ORDER BY date_of_travel
                ) AND (Tickets_remainingP + Tickets_remainingB + Tickets_remainingE > 0);`;

            const data = await executeSQL(sqlQuary,[From,To,From_Date,To_Date]);
            // console.log(data);
            return(data);
        }catch(err){
            return err;
        }
    }

    //9
    async getAvailableSeats(method) {
        try {
            const body = method.getBody();

            const Flight_ID = body.Flight_ID;
            const sqlQuary = `
                SELECT class, seat_ID
                FROM tickets
                WHERE flight = 'F1'
                ORDER BY class, seat_ID;`;

            const data = await executeSQL(sqlQuary,[Flight_ID]);
            return(data);
        }catch(err){
            return err;
        }
    }

    //12
    async getSeatPrice(method) {
        try {
            const body = method.getBody();

            const PID = body.PID;
            const Route = body.Route;
            const Class = body.Class;

            const sqlQuary = `CALL ticket_price(?, ?, ?);`;

            const data = await executeSQL(sqlQuary,[PID,Route,Class]);
            return(data);
        }catch(err){
            return err;
        }
    }

    //14
    async getFlightStatus(method) {
        try {
            const body = method.getBody();

            const Flight_ID = body.Flight_ID;

            const sqlQuary = `SELECT flight_Status FROM flights WHERE flight_ID = ?;`;

            const data = await executeSQL(sqlQuary,[Flight_ID]);
            return(data);
        }catch(err){
            return err;
        }
    }

    //15
    async getDestinations() {
        try {
            const sqlQuary = `SELECT * FROM airports;`;

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


    async RGetPastFlights(user){
        try{
            const data = await user.RGetPastFlights();
            return(data);
        }catch(err){
            return err;
        }
    }

    /////////////////////////////////// POST ///////////////////////////////////////////////////
    //10
    async postBookFlight(method) {
        try {
            const body = method.getBody();

            const Flight_ID = body.Flight_ID;
            const Class = body.Class;
            const seat_ID = body.seat_ID;
            const PID = body.PID;
            const Adult_or_Child = body.Adult_or_Child;

            const sqlQuary = `CALL new_ticket(?, ?, ?, ?, ?);`;

            const data = await executeSQL(sqlQuary, [Flight_ID, Class, seat_ID, PID, Adult_or_Child]);

        }catch(err){
            return err;
        }
    }
    //11
    async postCancelBooking(method) {
        try {
            const body = method.getBody();

            const  Ticket_ID = body.Ticket_ID;

            const sqlQuary = `CALL cancel_ticket(?);`;

            const data = await executeSQL(sqlQuary,[Ticket_ID]);

        }catch(err){
            return err;
        }
    }

    //13
    async postGuestUserSubmission(method) {
        try {
            const body = method.getBody();

            const Title = body.Title;
            const First_Name = body.First_Name;
            const Last_Name = body.Last_Name;
            const Email = body.Email;
            const Telephone = body.Telephone;
            const Country = body.Country;


            const sqlQuary = `INSERT INTO users(title, first_Name, last_Name, email, telephone, country) VALUES (?, ?, ?, ?, ?, ?);`;

            const data = await executeSQL(sqlQuary,[Title,First_Name,Last_Name,Email,Telephone,Country]);

        }catch(err){
            return err;
        }
    }

    /////////////////////////////////// UPDATE ///////////////////////////////////////////////////


    /////////////////////////////////// DELETE ///////////////////////////////////////////////////
}



module.exports = UserControl;