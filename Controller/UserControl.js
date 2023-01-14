const {executeSQL} = require("../DB/db");

class UserControl {
  /////////////////////////// GET ///////////////////////////
  //1
  async getPassengersByFlight(method, user) {
    try {
      const Flight_ID = method.searchURL("Flight_ID");

      const data = await user.getPassengersByFlight(Flight_ID);
      return data;
    } catch (err) {
      return err;
    }
  }
  //2
  async getPassengersByDestination(method, user) {
    try {
      const Destination_ID = method.searchURL("Destination_ID");
      const From_Date = method.searchURL("From_Date");
      const To_Date = method.searchURL("To_Date");

      const data = await user.getPassengersByDestination(
        Destination_ID,
        From_Date,
        To_Date
      );
      console.log(data);
      return data;
    } catch (err) {
      return err;
    }
  }
  //3
  async getBookingsByPassengerType(method, user) {
    try {
      const From_Date = method.searchURL("From_Date");
      const To_Date = method.searchURL("To_Date");

      const data = await user.getBookingsByPassengerType(From_Date, To_Date);
      return data;
    } catch (err) {
      return err;
    }
  }

  //4
  async getPastFlights(method, user) {
    try {
      const Origin_ID = method.searchURL("Origin_ID");
      const Destination_ID = method.searchURL("Destination_ID");

      const data = await user.getPastFlights(Origin_ID, Destination_ID);
      return data;
    } catch (err) {
      return err;
    }
  }

  //5
  async getRevenueByAircraftType(method, user) {
    try {
      const Model = method.searchURL("Model");
      const Brand = method.searchURL("Brand");

      const data = await user.getRevenueByAircraftType(Model, Brand);
      console.log(data);
      return data;
    } catch (err) {
      return err;
    }
  }
  //8
  async getFlights(method) {
    try {
      const From = method.searchURL("From");
      const To = method.searchURL("To");
      const From_Date = method.searchURL("From_Date");
      const To_Date = method.searchURL("To_Date");

      const sqlQuary = `
                SELECT flight_ID, date_of_travel, dep_time, Arr_time, Tickets_remainingP, Tickets_remainingB, Tickets_remainingE, flight_Status, route
                FROM flights
                WHERE route = (
                    SELECT route_ID
                    FROM routes
                    WHERE origin_ID = ? AND destination_ID = ? AND date_of_travel BETWEEN ? AND ? AND date_of_travel > CURDATE()
                    ORDER BY date_of_travel
                ) AND (Tickets_remainingP + Tickets_remainingB + Tickets_remainingE > 0);`;

      const data = await executeSQL(sqlQuary, [From, To, From_Date, To_Date]);
      return data;
    } catch (err) {
      return err;
    }
  }

  //9
  async getAvailableSeats(method) {
    try {
      const Flight_ID = method.searchURL("Flight_ID");

      const sqlQuary = `
                SELECT class, seat_ID
                FROM tickets
                WHERE flight = 'F1'
                ORDER BY class, seat_ID;`;

      const data = await executeSQL(sqlQuary, [Flight_ID]);
      return data;
    } catch (err) {
      return err;
    }
  }

  //12
  async getSeatPrice(method, user) {
    try {
      var PID = null;
      if (user && user.PID) {
        PID = user.PID;
      } else {
        PID = 0;
      }
      const Route = method.searchURL("Route");
      const Class = method.searchURL("Class");
      const Flight_ID = method.searchURL("Flight_ID");

      const sqlQuary = `SELECT (SELECT ticket_price(?, ?, ?)) AS price, (SELECT get_tickets_remaining((SELECT airplane FROM flights WHERE Flight_ID  = ?), ? )) AS seatlimit;`;

      const data = await executeSQL(sqlQuary, [
        PID,
        Route,
        Class,
        Flight_ID,
        Class,
      ]);
      console.log(data);
      return data;
    } catch (err) {
      return err;
    }
  }

  //14
  async getFlightStatus(method) {
    try {
      const Flight_ID = method.searchURL("Flight_ID");
      
      const sqlQuary = `SELECT flight_Status FROM flights WHERE flight_ID = ?;`;

      const data = await executeSQL(sqlQuary, [Flight_ID]);
      return data;
    } catch (err) {
      return err;
    }
  }

  //15
  async getDestinations() {
    try {
      const sqlQuary = `SELECT * FROM airports;`;

      const data = await executeSQL(sqlQuary);
      return data;
    } catch (err) {
      return err;
    }
  }

  async getBookedFlightDetails(user) {
    try {
      const data = await user.getBookedFlightDetails();
      console.log(user);
      return data;
    } catch (err) {
      return err;
    }
  }

  async RGetPastFlights(user) {
    try {
      const data = await user.RGetPastFlights();
      return data;
    } catch (err) {
      return err;
    }
  }

  async getRegUserDetails(user) {
    try {
      const data = await user.getRegUserDetails();
      return data;
    } catch (err) {
      return err;
    }
  }

  //10
  async postBookFlight(method, user) {
    try {
      const body = method.getBody();

      var PID = null;
      // console.log(user.PID);
      if (user && user.PID) {
        PID = user.PID;
      } else if (user && user.PID) {
        PID = body.PID;
      } else {
        return "Booking failed";
      }

      const Flight_ID = body.Flight_ID;
      const Class = body.Class;
      const seat_ID = body.Seat_ID;
      const Adult_or_Child = body.Adult_or_Child;

      const sqlQuary = `CALL new_ticket(?, ?, ?, ?, ?);`;

      const data = await executeSQL(sqlQuary, [
        Flight_ID,
        Class,
        seat_ID,
        PID,
        Adult_or_Child,
      ]);
      return "Ticket Booked";
    } catch (err) {
      return "Error";
    }
  }

  /////////////////////////////////// POST ///////////////////////////////////////////////////

  //11
  async postCancelBooking(method) {
    try {
      const body = method.getBody();

      const Ticket_ID = body.Ticket_ID;

      const sqlQuary = `CALL cancel_ticket(?);`;

      const data = await executeSQL(sqlQuary, [Ticket_ID]);
      return "Cancelled";
    } catch (err) {
      return err;
    }
  }

  //13
  async postGuestUserSubmission(method) {
    try {
      const Title = method.searchURL("shit");
      const First_Name = method.searchURL("First_Name");
      const Last_Name = method.searchURL("Last_Name");
      const Email = method.searchURL("Email");
      const Telephone = method.searchURL("Telephone");
      const Country = method.searchURL("Country");
      const Flight = method.searchURL("Flight");
      const Class = method.searchURL("Class");
      const Seat_ID = method.searchURL("Seat_ID");
      const Adult_or_Child = method.searchURL("Adult_or_Child");

      console.log(
        Title,
        First_Name,
        Last_Name,
        Email,
        Telephone,
        Country,
        Flight,
        Class,
        Seat_ID,
        Adult_or_Child
      );

      const sqlQuary = `CALL new_guest_user(?,?,?,?,?,?,?,?,?,?);`;

      const data = await executeSQL(sqlQuary, [
        Title,
        First_Name,
        Last_Name,
        Email,
        Telephone,
        Country,
        Flight,
        Class,
        Seat_ID,
        Adult_or_Child,
      ]);
      return "Guest User Created";
    } catch (err) {
      console.log(err);
      return "Error";
    }
  }

  //new
  async newflight(method) {
    try {
      const body = method.getBody();
      const Flight_ID = body.Flight_ID;
      const Airplane_ID = body.Airplane_ID;
      const Route = body.Route;
      const Date_of_travel = body.Date_of_travel;
      const Dep_time = body.Dep_time;
      const Arr_time = body.Arr_time;

      const sqlQuary = `CALL newflight(?, ?, ?, ?, ?, ?);`;

      const data = await executeSQL(sqlQuary, [
        Flight_ID,
        Airplane_ID,
        Route,
        Date_of_travel,
        Dep_time,
        Arr_time,
      ]);
    } catch (err) {
      return err;
    }
  
  
  
  
  
  }

  /////////////////////////////////// UPDATE ///////////////////////////////////////////////////

  async passengersInTransit(method, user) {
    try {

      const data = await user.passengersInTransit();
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }


  async flightsInAir(method, user) {
    try {

      const data = await user.flightsInAir();
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  /////////////////////////////////// DELETE ///////////////////////////////////////////////////
}

module.exports = UserControl;
