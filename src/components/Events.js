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
        <br></br>
        <br></br>
        <div className="covid">
          <p>Covid Restrictions</p>
        </div>
        <br></br>
        <br></br>
        <div className="information">
          <div className="information_left">
            <div className="dateandtime">
              {/* Display Event Date */}
              {event.dates?.start?.localDate ? null : (
                <h3>Date: {event.dates?.start?.localDate}</h3>
              )}

              {/* Display Event Time */}
              {!event.dates?.start?.localTime ? null : (
                <h3>Event starts at: {event.dates?.start?.localTime}</h3>
              )}
            </div>
            <br></br>
            <div className="price">
              {/* Display Price Range */}
              {!event.priceRanges?.[0]?.min ? null : (
                <h4>
                  Price Ranges: ${event.priceRanges?.[0]?.min} to $
                  {event.priceRanges?.[0]?.max}
                </h4>
              )}
            </div>
            <br></br>
            <div className="ticketmaster">
              Ticketmaster
            </div>
          </div>
          <div className="information_right">
          {/* Display event promoter */}
          {!event.promoter?.description ? null : (
            <h3>{event.promoter?.description}</h3>
          )}
          <br></br>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ridiculus aliquam velit sit morbi lorem tempus. Pellentesque ornare ultrices massa fermentum. Pharetra consectetur ac vel hendrerit eu aliquet metus. Fermentum sit lectus pretium vitae scelerisque vitae, vitae lorem fringilla. Enim elementum enim aliquam in eu. Risus sit sed accumsan neque elit adipiscing sem.<br></br>
          <br></br>
                  {/* Display seat map */}
        {!seatMap ? (
          <button className="seatmapbutton" onClick={() => setSeatMap(!seatMap)}>See Seatmap</button>
        ) : null}

        {seatMap ? (
          <div>
            <button className="seatmapbutton" onClick={() => setSeatMap(!seatMap)}>Hide Seatmap</button>
            <br />
            <img src={event.seatmap?.staticUrl} width="500" />
          </div>
        ) : null}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
