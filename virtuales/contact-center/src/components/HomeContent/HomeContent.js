import "./HomeContent.css";
import React from "react";
import { Link } from "react-router-dom";
import useFectGet from "../../utils/useFectGet";
import Loading from "../Loading/Loading";
import { FormattedMessage } from "react-intl";

function HomeContent() {
  const eventsData = useFectGet("https://api.virtuales.io/app/eventos");

  return (
    <div>
      <h1 style={{ color: "white", marginLeft: "50px" }}><FormattedMessage id="schedule.welcome" /> Virtuales</h1>
      <main className="container main-bg2 grid2">
        {!eventsData ? (
          <Loading></Loading>
        ) : (
          eventsData.map((event, index) => (
            <div className="card-home" key={index}>
              <Link to={`/room/${event.site}`}>
                <div className="logo-agenda2">
                  <img src={event.logo} className="logo" />
                </div>
                <div>
                  <h1 className="event-title">
                    {event.name} <br />
                    <span className="weight-normal">
                      {event.name} {event.site}
                    </span>
                  </h1>
                </div>
              </Link>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default HomeContent;
