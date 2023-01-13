const { hash, compare } = require("bcryptjs");
const { executeSQL } = require("../DB/db");
const uniqid = require('uniqid');

class RegUser {
    constructor(PID, UserName, type, fname, lname, sessionID, lastUsedTime) {
        this.PID = PID;
        this.UserName = UserName;
        this.userTP = type;

        if (sessionID) {
            this.sessionID = sessionID;
        }
        else {
            this.sessionID = uniqid();
        }
        if (lastUsedTime) {
            this.lastUsedTime = lastUsedTime;
        }
        else {
            this.lastUsedTime = Number(new Date().getTime());
        }
        if (fname) {
            this.fname = fname;
        }
        else {
            this.fname = null;
        }

        if (lname) {
            this.lname = lname;
        }
        else {
            this.lname = null;
        }
    }


    async setLastUsedTime() {

        this.lastUsedTime = Number(new Date().getTime());
        try {
            await executeSQL(`UPDATE Session_table SET last_used_time= ? WHERE user_Id = ?`, [Number(this.lastUsedTime), this.PID]);
        } catch (e) {
            console.log("Error");
        }
    }

    async changePass(CurrPassword, NewPassword) {

        var credential, hashedPass, success;

        try {

            credential = await executeSQL(`SELECT username,password FROM registered_users WHERE PID = ?`, [this.PID]);
            hashedPass = credential[0].password;
            success = await compare(CurrPassword, hashedPass);
        }
        catch (e) {
            return ("Error");
        }

        if (success) {
            try {

                const hashedPassword = await hash(NewPassword, 10);
                await executeSQL(`UPDATE registered_users SET password = ? WHERE PID = ?`, [hashedPassword, this.PID]);

                return ("Password Changed");

            } catch (e) {
                return (e);
            }
        } else {
            return ("Error");
        }
    }

    async getBookedFlightDetails() {
        try {
            const sqlQuary = `
            SELECT flight_ID, origin_ID, destination_ID, date_of_travel, dep_time, arr_time, flight_status, ticket_ID, seat_ID, class
                FROM ( 
                    SELECT * 
                    FROM 
                    tickets 
                    WHERE PID = 4) 
                    AS A
                LEFT JOIN (
					SELECT * FROM flights 
					RIGHT JOIN routes 
					ON route = route_ID
					WHERE flight_ID IN (
                    SELECT flight 
                    FROM tickets WHERE PID = 4) 
                    AND date_of_travel >= CURDATE()) AS B
                ON B.flight_ID = A.flight;`

            const data = await executeSQL(sqlQuary, [this.PID]);
            return (data);
        } catch (err) {
            return err;
        }
    }

    async RGetPastFlights() {
        try {
            const sqlQuary = `
                SELECT origin_ID, destination_ID, date_of_travel, dep_time, arr_time, flight_Status
                FROM flights 
                RIGHT JOIN routes 
                ON route = route_ID
                WHERE flight_ID IN (
                    SELECT flight 
                    FROM tickets 
                    WHERE PID = ?) 
                    AND Date_of_travel < CURDATE();`;

            const data = await executeSQL(sqlQuary, [this.PID]);
            return (data);
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

class AdminUser extends RegUser{
    constructor(Admin_id,Admin_name,type) {
        super(null,Admin_name,type,null,null,null,null);
        this.Admin_id = Admin_id; 
    }

    async setLastUsedTime() {

        this.lastUsedTime = Number(new Date().getTime());
    
    }

    async changePass(CurrPassword, NewPassword) {

        var credential, hashedPass, success;

        try {

            credential = await executeSQL(`SELECT username,password FROM admins WHERE admin_id = ?`, [this.PID]);
            hashedPass = credential[0].password;
            success = await compare(CurrPassword, hashedPass);
        }
        catch (e) {
            return ("Error");
        }

        if (success) {
            try {

                const hashedPassword = await hash(NewPassword, 10);
                await executeSQL(`UPDATE admins SET password = ? WHERE admin_id = ?`, [hashedPassword, this.PID]);

                return ("Password Changed");

            } catch (e) {
                return (e);
            }
        } else {
            return ("Error");
        }
    }

    //1
    async getPassengersByFlight(Flight_ID) {
        try {
            const sqlQuary = `SELECT (
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
    async getPassengersByDestination(Destination_ID,From_Date,To_Date) {
        try {
            const sqlQuary = `SELECT COUNT(*) AS passengers_count
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
    async getBookingsByPassengerType(From_Date,To_Date) {
        try {
            const sqlQuary = `SELECT (
                                SELECT COUNT(*) 
                                FROM tickets, users 
                                WHERE users.PID = tickets.PID AND Time_of_booking BETWEEN ? AND ? AND user_type LIKE '%G%') AS Guests,
                                (SELECT COUNT(*) 
                                FROM tickets, users 
                                WERE users.PID = tickets.PID AND Time_of_booking BETWEEN ? AND ? AND user_type LIKE '%R%') AS Registered;`;

            const data = await executeSQL(sqlQuary,[From_Date,To_Date,From_Date,To_Date]);
            return(data);
        }catch(err){
            return err;
        }
    }

    //4
    async getPastFlights(Origin_ID,Destination_ID) {
        try {
            const sqlQuary = `SELECT flight_ID, airplane, date_of_travel, dep_time, arr_time, (seat_count-(tickets_RemainingB + tickets_RemainingE + tickets_RemainingP)) as passenger_count
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
    async getRevenueByAircraftType() {
        try {
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

    async getRegUserDetails() {
        try {
            const sqlQuary = `
            SELECT title, first_name, last_name, (SELECT discription FROM user_categories WHERE category = user_category) AS user_category , total_bookings, telephone, email, country, address, date_of_birth, username 
            FROM registered_users LEFT JOIN users USING(PID) 
            WHERE PID = ?;`;

            const data = await executeSQL(sqlQuary,[this.PID]);
            return(data);
        }catch(err){
            return err;
        }
    }
    

}


module.exports = { RegUser , AdminUser };
