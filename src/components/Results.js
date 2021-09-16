import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./Home";

function Results(props) {
  let { keyword, city } = useParams();
  let [events, setEvents] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const keyword = params.get("keyword"); // bar

    const city = params.get("city"); // bar
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&keyword=${keyword}&city=${city}&sort=relevance,desc&apikey=biW1fGE1aeVKqhiGWAdGttCRSItyVN2z`
      )
      .then((resApi) => {
        setEvents(resApi?.data?._embedded?.events);
      });
  }, [props.location.search]);

  const ShowEvents = () => {
    if (events === undefined) {
      return <div>not found</div>;
    } else {
      return (
        <div className="events">
          {events?.map((uniqueEvent) => {
            let img = [...uniqueEvent.images].filter((im) => im.width > 1000);
            let city = [...uniqueEvent._embedded.venues].map((venue) => {
              return venue.city;
            });
            return (
              <div key={uniqueEvent.id} className="container">
                <Link
                  to={{
                    pathname: `/events/${uniqueEvent.id}`,
                    myCustomProps: uniqueEvent,
                  }}
                >
                  <img src={img[0].url} className="resultimage" />
                  <div>
                    <h2>{uniqueEvent.name}</h2>
                  </div>
                  <div>
                    <strong>City</strong>: {city[0].name}
                  </div>

                  <div>
                    <strong>Time</strong>: {uniqueEvent.dates.start.localTime}
                  </div>
                  <div>
                    <strong>Date</strong>: {uniqueEvent.dates.start.localDate}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div>
      <Home />
      <ShowEvents />
    </div>
  );
}

export default Results;
