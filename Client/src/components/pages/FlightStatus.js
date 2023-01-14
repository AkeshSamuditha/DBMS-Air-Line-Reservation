import React, { useState, useEffect } from "react";
import "./FlightStatus.css";
import Navbar from "../Navbar";
import { Button } from "../Button";
import axios from "axios";

export default function FlightStatus() {
  const [flightID, setFlightID] = useState("");
  const [flightStat, setFlightStat] = useState([]);

  const [statusGot, setStatusGot] = useState(false); //Change this to false

  const getFlightStatus = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:6969/api/FlightStatus", {
        params: {
          Flight_ID: flightID,
        },
      })
      .then((response) => getStastusByFlight(response))
      .catch((error) => console.log(error));
  };

  function getStastusByFlight(response) {
    setStatusGot(true);
    setFlightStat(response.data);
  }
  return (
    <div>
      <Navbar />
      <div className="stat-bg">
        <h1>See Flight Stutus</h1>
        <div>
          <form className="flightStatFrom">
            <label className="adminFormLabel">Flight ID:</label>
            <br />
            <input
              className="flightStatFormInput"
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
              onClick={getFlightStatus}
            >
              Search
            </Button>
            <>
              {statusGot ? (
                <div className="flightStatResults">
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
                          <table className="flightStatTable">
                            <tbody>
                              <tr>
                                <td>Flight Status:</td>
                                <td>{(flightStat[0].flight_Status)}</td>
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
        </div>
      </div>
    </div>
  );
}
