import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookAFlight from "./components/pages/BookAFlight";
import Destinations from "./components/pages/Destinations";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";

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
        </Switch>
      </Router>
    </>
  );
}

export default App;
