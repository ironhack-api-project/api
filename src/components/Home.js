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
        setEvents(resApi.data._embedded.events);
        console.log(resApi.data._embedded.events[0].images[0].width);
      });
  };

  const ShowEvents = () => {
    return (
      <div>
        {events.map((uniqueEvent) => {
        let img=uniqueEvent.images.sort((a,b)=>{

        })
          return <div key={uniqueEvent.id}>{uniqueEvent.name}
          
          
          </div>;
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
          <input type="text" placeholder="Radius" />
        </form>
        <button onClick={handleClick}>Search</button>
      </div>
      <ShowEvents />
    </div>
  );
}

export default Home;
