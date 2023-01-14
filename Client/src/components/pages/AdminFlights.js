import React, { useState, useEffect } from "react";
import "../../App.css";
import "./Admin.css";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import AdminNavbar from "../AdminNavbar";
import axios from "axios";
import { useToken } from "./token";

export default function AdminFlights() {
  const [route, setRoute] = useState("");
  const [arrCity, setArrCity] = useState("");
  const [deptCity, setDeptCity] = useState("");
  const [flight, setFlight] = useState("");
  const [deptTime, setDeptTime] = useState("");
  const [arrTime, setArrTime] = useState("");
  const [onBoard, setOnBoard] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:6969/admin/api/flightsInAir", {
  //       headers: {
  //         Authorization: token,
  //       },
  //     })
  //     .then((response) => handleFlightDetails(response))
  //     .catch((error) => console.log(error));
  // }, []);

  function handleFlightDetails(response) {
    console.log(response);
    setFlight(response.data[0].flight);
    setDeptCity(response.data[0].dept_city);
    setArrCity(response.data[0].arr_city);
    setRoute(response.data[0].route);
    setDeptTime(response.data[0].dept_time);
    setArrTime(response.data[0].arr_time);
    setOnBoard(response.data[0].on_board);
  }

  const [token, setToken] = useToken();

  return (
    <>
      {token ? (
        <div>
          <AdminNavbar />
          <div className="container">
            <Link to="/admin-home">
              <Button
                className="find-a-flight-btn"
                buttonStyle="btn--black"
                buttonSize="btn--black_size"
              >
                Home
              </Button>
            </Link>
            <Link to="/admin-passengers">
              <Button
                className="find-a-flight-btn"
                buttonStyle="btn--black"
                buttonSize="btn--black_size"
              >
                Passengers
              </Button>
            </Link>
          </div>
          <div className="container">
            <h1 className="topic">Flights in Air</h1>
            <br />
            <table id="flight-table">
              <tbody>
                <tr>
                  <th>Flight Number</th>
                  <th>Departure City</th>
                  <th>Arrival City</th>
                  <th>Departure Time</th>
                  <th>Arrival Time</th>
                  <th>On Board</th>
                  <th>Flight Status</th>
                </tr>
                <tr>
                  <td>{flight}</td>
                  <td>{deptCity}</td>
                  <td>{arrCity}</td>
                  <td>{deptTime}</td>
                  <td>{arrTime}</td>
                  <td>{onBoard}</td>
                  <td>On Time</td>
                </tr>
              </tbody>
            </table>
            <br />
          </div>
        </div>
      ) : (
        <div className="container">
          <h1>පලයන් යන්න</h1>
        </div>
      )}
    </>
  );
}
