const {executeSQL} = require("../DB/db");

class UserControl{

    /////////////////////////// GET ///////////////////////////	
    
    
    
    async getPassengersByFlight(method) {
        try {
        const body = method.getBody();
        
        const Flight_ID = body.flight_ID;
    
        const sqlQuary = `
            SELECT (
                SELECT COUNT(*) 
                FROM tickets 
                WHERE adult_or_child LIKE '%A%' AND flight = ?) as Above_18, (
                SELECT COUNT(*) 
                FROM tickets 
                WHERE adult_or_child LIKE '%C%'AND flight = ?) as Below_18;`;

        const data = await executeSQL(sqlQuary,[Flight_ID,Flight_ID]);
            return(data);
        }catch(err){
            return err;
        }
    }  
    //2
    async getPassengersByDestination(method) {
        try {
            const body = method.getBody();

            const Destination_ID = body.Destination_ID;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;

            const sqlQuary = `
                SELECT COUNT(*) 
                FROM tickets 
                WHERE flight IN (
                    SELECT flight_ID 
                    FROM flights 
                    WHERE (route IN (
                        SELECT route_ID 
                        FROM routes 
                        WHERE destination_ID = ?) 
                    AND date_of_travel BETWEEN ? AND ?));
            `;

            const data = await executeSQL(sqlQuary,[Destination_ID,From_Date,To_Date]);
                return(data);
            }catch(err){
                return err;
        }
    }
    //3
    async getBookingsByPassengerType(method) {
        try {
            const body = method.getBody();

            const From_Date = body.From_Date;
            const To_Date = body.To_Date;


            const sqlQuary = `
            SELECT (
                    SELECT COUNT(*) 
                    FROM tickets, users 
                    WHERE users.PID = tickets.PID 
                    AND Time_of_booking BETWEEN ? AND ? 
                    AND user_type LIKE '%G%') AS Guests,
                    (SELECT COUNT(*) 
                    FROM tickets, users 
                    WHERE users.PID = tickets.PID 
                    AND Time_of_booking BETWEEN ? AND ? 
                    AND user_type LIKE '%R%') AS Registered;`;

            const data = await executeSQL(sqlQuary,[From_Date,To_Date,From_Date,To_Date]);
            return(data);
            }catch(err){
                return err;
        }
    }

    //4
    async getPastFlights(method) {
        try {
            const body = method.getBody();

            const Origin_ID = body.Origin_ID;
            const Destination_ID = body.Destination_ID;

            const sqlQuary = `
                SELECT flight_ID, airplane, date_of_travel, dep_time, arr_time, (seat_count-(tickets_RemainingB + tickets_RemainingE + tickets_RemainingP)) as passenger_count
                FROM (flights LEFT JOIN Airplanes_w_seasts 
                ON airplane = airplane_ID)
                WHERE route IN (
                    SELECT route_ID
                    FROM routes
                    WHERE origin_ID = ? AND destination_ID = ? AND date_of_travel < CURDATE());`;

            const data = await executeSQL(sqlQuary,[Origin_ID,Destination_ID]);

            return(data);
            }catch(err){
                return err;
        }
    }
        
    //5
    async getRevenueByAircraftType(method) {
        try {
            const body = method.getBody();

            const Model = body.Model;
            const Brand = body.Brand;

            const sqlQuary = `
                SELECT model_ID, model, brand, revenue
                FROM flights LEFT JOIN (
                    SELECT airplane_ID, model_ID, airplane_models.model, brand
                    FROM airplanes LEFT JOIN airplane_models
                    ON model_ID = airplanes.model) as A
                ON airplane = airplane_ID
                GROUP BY model_ID;`;

            const data = await executeSQL(sqlQuary);
            return(data);
            
        }catch(err){
            return err;
        }
    }


    
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