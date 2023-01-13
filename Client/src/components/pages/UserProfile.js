import React, { useState, useEffect } from "react";
import "../../App.css";
import Navbar from "../Navbar";
import "./UserProfile.css";
import { useToken } from "./token";
import axios from "axios";
// import { DataGrid } from "@mui/x-data-grid";
// import { DataGrid } from "react-data-grid";

// const columns = [
//   { key: "id", name: "ID" },
//   { key: "title", name: "Title" },
//   { key: "count", name: "Count" },
// ];
// const rows = [
//   { id: 0, title: "row1", count: 20 },
//   { id: 1, title: "row2", count: 40 },
//   { id: 2, title: "row3", count: 60 },
// ];

export default function UserProfile() {
  
  const [bookedFlightTable, setBookedFlightTable] = useState([]);
  const [TraveledbookedFlightTable, setTraveledbookedFlightTable] = useState([]);
  

  const [token, setToken] = useToken();

  useEffect(() => {
    axios
      .get("http://localhost:6969/api/registered/BookedflightDetails", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => bookedFlightDetails(response))
      .catch((error) => console.log(error));
  },);

  function bookedFlightDetails(response) {
    console.log(response.data);
    setBookedFlightTable(response.data);
    // setFlights0(response.data[0]);
  }

  return (
    <>
      <Navbar />
      <div>
        <div className="userprofile">
          <h2>Welcome aboard</h2>
        </div>
        <div className="user-container">
          <div className="user">
            <i className={"fas fa-user-circle fa-9x center"} />
            <h3 className="name">John Doe</h3>
            <h5 className="membership">Platinum Member</h5>
            <br />
            <div className="lables">
              <label>Total tickets booked : </label>
              <label>Count</label>
            </div>
            <br />
            <div className="past-flights">
              <h3>UPCOMING FLIGHTS WIHT US...</h3>
              <br />
              <div>
              
            </div>
            </div>
          </div>
        </div>

        <>
              <div>
              {bookedFlightTable.length === 0 ? (
                <div>
                YOU HAVE NO FLIGHTS WITH US CURRENTLY, HOPE TO SEE YOU SOON
                </div>):(
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Ticket ID</th>
                        <th>Seat ID</th>
                        <th>Flight ID</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Date of Travel</th>
                        <th>Arrival Time</th>
                        <th>Departure Time</th>
                        <th>Flight Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {bookedFlightTable.map((val, key) => {
                    return (
                      <tr key={key}>
                        <td>{"T"+val.ticket_ID}</td>
                        <td>{val.class+val.seat_ID}</td>
                        <td>{val.flight_ID}</td>
                        <td>{val.origin_ID}</td>
                        <td>{val.destination_ID}</td>
                        <td>{val.date_of_travel}</td>
                        <td>{val.arr_time}</td>
                        <td>{val.dep_time}</td>
                        <td>{val.flight_status}</td>
                        <td><button className="edit-button">Cancel</button></td>
                      </tr>
                    )
                  })}
              </table>
              </div>)}
              </div>
              </>
      </div>
    </>
  );
}
