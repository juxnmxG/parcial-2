import React from "react";
import { FormattedMessage } from "react-intl";

function InfoEvent({ data }) {

  return (
    <div className="flex-box">
      <div>
        <h1 className="tituloevento">
          {data.event.title} <br />
          <span className="weight-normal">
            <FormattedMessage id="event.welcome" /> {data.event.subtitle}
          </span>
        </h1>
      </div>
      <a target="_blank" href="https://tacticaledge.co/">
        <div className="logo-agenda">
          <img src={data.event.logo}  />
        </div>
      </a>
    </div>
  );
}

export default InfoEvent;
