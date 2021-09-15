import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import backarrow from '../backarrow.png';

function Events(props) {
  let [event, setEvent] = useState({});
  let [seatMap, setSeatMap] = useState(false);
  let [img, setImg] = useState([]);

  let history = useHistory();

  useEffect(() => {
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?id=${props.match.params.eventId}&apikey=biW1fGE1aeVKqhiGWAdGttCRSItyVN2z`
      )
      .then((resApi) => {
        setEvent(resApi.data._embedded.events[0]);
        console.log(resApi.data._embedded.events[0]);
        setImg(
          resApi.data._embedded.events[0].images.filter((im) => im.width > 1000)
        );
      });
  }, []);

  return (
    <div>
      <div>
        <div className="eventsimage">
          <img src={img[0]?.url} width="100%" />
          <div class="eventtitle">
            <h1>{event.name}</h1>
          </div>
        </div>
        <div class="container">
        <button className="goback" onClick={() => history.goBack()}><img src={backarrow} /> Back to Results</button>
        {/* Display Price Range */}
        {!event.priceRanges?.[0]?.min ? null : (
          <h2>
            Price Ranges: ${event.priceRanges?.[0]?.min} to $
            {event.priceRanges?.[0]?.max}
          </h2>
        )}

        {/* Display event promoter */}
        {!event.promoter?.description ? null : (
          <h3>{event.promoter?.description}</h3>
        )}

        {/* Display Event Date */}
        {event.dates?.start?.localDate ? null : (
          <h3>Date: {event.dates?.start?.localDate}</h3>
        )}

        {/* Display Event Time */}
        {!event.dates?.start?.localTime ? null : (
          <h3>Event starts at: {event.dates?.start?.localTime}</h3>
        )}
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
    </div>
  );
}

export default Events;
