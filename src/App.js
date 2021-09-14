import React from "react";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Events from "./components/Events";

//Ticketmaster API Key = biW1fGE1aeVKqhiGWAdGttCRSItyVN2z

function App() {
  return (
    <div className="App">
      <h1>App.js</h1>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/events" component={Events} />
      </Switch>
    </div>
  );
}

export default App;
