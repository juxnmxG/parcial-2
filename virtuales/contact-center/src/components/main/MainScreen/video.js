import React, {  useState } from "react";
import VideoCall from "./VideoCall";
import ChannelForm from "./ChannelForm";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function VideoInfo({ children }) {

  const [inCall, setInCall] = useState(false);
  const { room } = useParams()

  return (
    <section className="videoMain">
      <div >
        <div>
          {inCall ? (
            <div className={"display-video" }>
                < VideoCall setInCall={setInCall} channelName={room} />
            </div>
          ) : (
            <div className="display-video">
              <img
                src="https://resources.virtuales.io/eventos/img/fondo.jpeg"
                alt="main screen"
                className="screenVideo"
              />
              <ChannelForm
                setInCall={setInCall}
              />
            </div>
          )}
        </div>
        <div className="badgePonente">
          <p>{"streamAgora.badgeTitle"}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

export default VideoInfo;
