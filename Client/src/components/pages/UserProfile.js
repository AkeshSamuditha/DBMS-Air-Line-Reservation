import React, { useState, useEffect } from "react";
import "../../App.css";
import Navbar from "../Navbar";
import "./UserProfile.css";
import { useToken } from "./token";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const [bookedFlightTable, setBookedFlightTable] = useState([]);
  const [TraveledbookedFlightTable, setTraveledbookedFlightTable] = useState(
    []
  );

  const [titile, setTitle] = useState("Mr.");
  const [firstName, setFirstName] = useState("Jhon");
  const [lastName, setLastName] = useState("Doe");
  const [user_category, setUser_category] = useState("Newbie");
  const [tot_booking, setTot_booking] = useState("0");

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
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:6969/api/registered/RegUserDetails", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => userDetails(response))
      .catch((error) => console.log("Wrong User"));
  }, []);

  function userDetails(response) {
    setTitle(response.data[0].title);
    setFirstName(response.data[0].first_name);
    setLastName(response.data[0].last_name);
    setUser_category(response.data[0].user_category);
    setTot_booking(response.data[0].total_bookings);
  }
  // console.log(response.data);

  function bookedFlightDetails(response) {
    // console.log(response.data);
    setBookedFlightTable(response.data);
    // setFlights0(response.data[0]);
  }

  const CancelBooking = () => {
    axios
      .post("http://localhost:6969/Api/CancelBooking", {
        Ticket_ID: bookedFlightTable[0].ticket_ID,
      })
      .then((response) => window.location.reload())
      .catch((error) => console.log(error));
  };

  function handleClick() {
    const confirmation = window.confirm(
      "Are You Sure You Want To Cancel This Flight?"
    );
    if (confirmation) {
      console.log("Flight Cancelled");
      CancelBooking();
      // Perform the action here
    }
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
            <h3 className="name">{firstName + " " + lastName}</h3>
            <h5 className="membership">{user_category + " Member"}</h5>
            <br />
            <div className="lables">
              <label>Total tickets booked with us: </label>
              <label>{tot_booking}</label>
            </div>
            <br />
          </div>
        </div>

        <>
          <div className="userResults">
            {bookedFlightTable.length === 0 ? (
              <div>
                <center>
                  YOU HAVE NO FLIGHTS WITH US CURRENTLY, HOPE TO SEE YOU SOON
                </center>
              </div>
            ) : (
              <div>
                <div>
                  <h3>UPCOMING FLIGHTS WIHT US</h3>
                </div>
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
                  <tbody>
                    {bookedFlightTable.map((val, key) => {
                      return (
                        <tr key={key}>
                          <td>{"T" + val.ticket_ID}</td>
                          <td>{val.class + val.seat_ID}</td>
                          <td>{val.flight_ID}</td>
                          <td>{val.origin_ID}</td>
                          <td>{val.destination_ID}</td>
                          <td>{val.date_of_travel}</td>
                          <td>{val.arr_time}</td>
                          <td>{val.dep_time}</td>
                          <td>{val.flight_status}</td>
                          <td>
                            <button
                              className="delete-button"
                              onClick={handleClick}
                            >
                              Cancel Ticket
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      </div>
    </>
  );
}
