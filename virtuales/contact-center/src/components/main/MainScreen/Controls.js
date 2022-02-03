import { useState } from "react";
import { createClient } from "agora-rtc-react";
import Button from "../../button/button";

function Controls(props) {

  const {
    tracks,
    setStart,
    setInCall,
    sharedScreen,
    unSharedScreen,
    users,
    localScreen,
    client,
    desktop,
  } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    desktop.leave();
    desktop.removeAllListeners()
    // we close the tracks to perform cleanup
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
    window.location.href = ""
  };

  return (
    <div className="controls">
      <Button
        variant="controls-menu"
        className={trackState.audio ? "on" : ""}
        onClick={() => mute("audio")}
        icon={
          trackState.audio
            ? "https://resources.virtuales.io/care/img/mic-off.svg"
            : "https://resources.virtuales.io/care/img/mic-on.svg"
        }
      >
        {trackState.audio ? "Off" : "On"}
      </Button>
      <Button
        variant="controls-menu"
        className={trackState.video ? "on" : ""}
        onClick={() => mute("video")}
        icon={
          trackState.video
            ? "https://resources.virtuales.io/care/img/camara-off.svg"
            : "https://resources.virtuales.io/care/img/camara-on.svg"
        }
      >
        {trackState.video ? "Off" : "On"}
      </Button>
      {
        <Button
          variant="controls-menu"
          onClick={() => leaveChannel()}
          icon={"https://resources.virtuales.io/care/img/entrar.svg"}
        >
          Leave
        </Button>
      }
      <Button
        variant={"controls-menu"}
        onClick={localScreen ? () => unSharedScreen() : () => sharedScreen()}
        icon={"https://resources.virtuales.io/care/img/share-video.svg"}
      >
        Share
      </Button>
    </div>
  );
}

export default Controls;
