import React, { useState, useEffect } from "react";
import "./FlightStatus.css";
import Navbar from "../Navbar";
import { Button } from "../Button";
import { useToken } from "./token";
import axios from "axios";

export default function FlightStatus() {
  const [flightID, setFlightID] = useState("");
  const [token, setToken] = useToken();
  const [flightStat, setFlightStat] = useState([
    "F1",
    "CMB",
    "JFK",
    "2023-01-14",
    "04:15:00",
    "04:15:00",
    "scheduled",
  ]);
  const [statusGot, setStatusGot] = useState(true); //Change this to false

  useEffect(() => {
    axios
      .get("http://localhost:6969/api/FlightStatus", {
        headers: {
          Authorization: token,
        },
        params: {
          Flight_ID: flightID,
        },
      })
      .then((response) => getStastusByFlight(response))
      .catch((error) => console.log(error));
  }, []);

  function getStastusByFlight(response) {
    // setFlightsGot2(true);
    // setFlightTable(response.data);
    console.log(flightStat);
  }
  return (
    <>
      <Navbar />
      <br />
      <h2>See Flight Stutus</h2>
      <form className="adminForm">
        <label className="adminFormLabel">Flight ID:</label>
        <br />
        <input
          className="adminFormInput"
          type="text"
          id="flight-id"
          name="flight-id"
          placeholder="F12345"
          onChange={(e) => {
            setFlightID(e.target.value);
          }}
        />
        <br />
        <Button
          className="find-a-flight-btn"
          buttonStyle="btn--black"
          buttonSize="btn--black_size"
          onClick={getStastusByFlight}
        >
          Search
        </Button>
        <>
          {statusGot ? (
            <div className="results">
              <>
                <div>
                  {flightStat.length === 0 ? (
                    <div>
                      SORRY! NO UPCOMING FLIGHTS AVAILABLE AT THE MOMENT.
                    </div>
                  ) : (
                    <div>
                      <h2>Flight Details</h2>
                      <hr></hr>
                      <br />
                      <table>
                        <tbody>
                          <tr>
                            <td>Flight ID:</td>
                            <td>{flightStat[0]}</td>
                          </tr>
                          <tr>
                            <td>From:</td>
                            <td>{flightStat[1]}</td>
                          </tr>
                          <tr>
                            <td>To:</td>
                            <td>{flightStat[2]}</td>
                          </tr>
                          <tr>
                            <td>Date of Travel:</td>
                            <td>{flightStat[3]}</td>
                          </tr>
                          <tr>
                            <td>Time of Departure:</td>
                            <td>{flightStat[4]}</td>
                          </tr>
                          <tr>
                            <td>Time of Arrival:</td>
                            <td>{flightStat[5]}</td>
                          </tr>
                          <tr>
                            <td>Flight Status:</td>
                            <td>{flightStat[6]}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            </div>
          ) : (
            <div> </div>
          )}
        </>
      </form>
    </>
  );
}
