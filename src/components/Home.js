import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { isCompositeComponent } from "react-dom/test-utils";

function Home(props) {
  let [events, setEvents] = useState([]);

  const handleClick = (e) => {
    axios
      .get(
        "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=biW1fGE1aeVKqhiGWAdGttCRSItyVN2z"
      )
      .then((resApi) => {
        // console.log(`it's working`);
        setEvents(resApi.data._embedded.events);
        // console.log(resApi.data._embedded.events.dates);
      });
  };

  const ShowEvents = () => {
    return (
      <div>
        {events.map((uniqueEvent) => {
          let img = [...uniqueEvent.images].filter((im) => im.width > 1000);
          console.log(uniqueEvent.dates.start);
          return (
            <div key={uniqueEvent.id}>
              <img src={img[0].url} width="500" />
              <div>{uniqueEvent.name} </div>
              <div>Time: {uniqueEvent.dates.start.localTime}</div>
             <div> Date: {uniqueEvent.dates.start.localDate}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      //   x.innerHTML = "Geolocation is not supported by this browser.";
    }
  };
  const showPosition = (position) => {
    // console.log(position.coords.latitude);
    // console.log(position.coords.longitude);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      <div className="tagline">Let us help you find plans...</div>
      <div className="boxes">
        <form>
          <input type="text" placeholder="City" />
          <input type="text" placeholder="Date" />
        </form>
        <button onClick={handleClick}>Search</button>
      </div>
      <ShowEvents />
    </div>
  );
}

export default Home;