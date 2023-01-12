import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookAFlight from "./components/pages/BookAFlight";
import Destinations from "./components/pages/Destinations";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import UserProfile from "./components/pages/UserProfile";
import AdminHome from "./components/pages/AdminHome";
import AdminFlights from "./components/pages/AdminFlights";
import AdminPassengers from "./components/pages/AdminPassengers";
import AdminLogIn from "./components/pages/AdminLogIn";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/api/BookFlight" component={BookAFlight} />
          <Route path="/destinations" component={Destinations} />
          <Route path="/Auth/login" component={LogIn} />
          <Route path="/Auth/Register" component={SignUp} />
          <Route path="/Auth/UserProfile" component={UserProfile} />
          <Route path="/admin-home" component={AdminHome} />
          <Route path="/admin-flights" component={AdminFlights} />
          <Route path="/admin-passengers" component={AdminPassengers} />
          <Route path="/admin-login" component={AdminLogIn} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
