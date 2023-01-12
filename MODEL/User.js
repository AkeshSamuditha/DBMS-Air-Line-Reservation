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

    getType() {
        return (this.userTP);
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
                SELECT origin_ID, destination_ID, date_of_travel, dep_time, Arr_time, flight_Status
                FROM flights 
                RIGHT JOIN routes 
                ON route = route_ID
                WHERE flight_ID IN (
                    SELECT flight 
                    FROM tickets WHERE PID = ?) 
                    AND date_of_travel < CURDATE();`

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


module.exports = { RegUser };
