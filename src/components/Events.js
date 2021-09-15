import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";











function Events(props) {
  let [event, setEvent] = useState({});
  let [seatMap, setSeatMap] = useState(false);
  let [img, setImg] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?id=${props.match.params.eventId}&apikey=biW1fGE1aeVKqhiGWAdGttCRSItyVN2z`
      )
      .then((resApi) => {
        setEvent(resApi.data._embedded.events[0]);
        console.log(resApi.data._embedded.events[0]);
        setImg(
          resApi.data._embedded.events[0].images.find((im) => im.width > 1000)
        );
      });
  }, []);

  return (
    <div>
      <div>
          {/* Display Image  */}
        <img src={img?.url} width="500" />
        <h1>{event.name}</h1>

          {/* Display Price Range */}
        {!event.priceRanges?.[0]?.min ? null : (
          <h2>
            Price Ranges: ${event.priceRanges?.[0]?.min} to $
            {event.priceRanges?.[0]?.max}
          </h2>
        )}

          {/* Display event promoter */}
          {!event.promoter?.description ? null:(
        <h3>{event.promoter?.description}</h3>
        )}

          {/* Display Event Date */}
        {event.dates?.start?.localDate ? null : (
        <h3>Date: {event.dates?.start?.localDate}</h3>
        )}

          {/* Display Event Time */}
        {!event.dates?.start?.localTime ? null:(
        <h3>Event starts at: {event.dates?.start?.localTime}</h3>
        )}

          {/*Display Seat Map  */}
        {!seatMap ? (
          <button onClick={() => setSeatMap(!seatMap)}>See Seatmap</button>
        ) : null}

        {seatMap ? (
          <div>
            <button onClick={() => setSeatMap(!seatMap)}>Hide Seatmap</button>
            <br />
            <img src={event.seatmap?.staticUrl} width="500" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Events;
