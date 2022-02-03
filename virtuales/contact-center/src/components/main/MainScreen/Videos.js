import { AgoraVideoPlayer } from "agora-rtc-react";

function Videos(props) {
  const { users, tracks } = props;
  return (
    <div className="screen">
      <div id="videos">
        <AgoraVideoPlayer
          style={{ height: "100%", width: "100%" }}
          className="vid"
          videoTrack={tracks[1]}
        />
        {/* <div className="multiple-video">
          {users.length > 0 &&
            users.map((user) => {
              if (user.videoTrack) {
                return (
                  <AgoraVideoPlayer
                    style={{ height: "100%", width: "30%" }}
                    videoTrack={user.videoTrack}
                    key={user.uid}
                  />
                );
              } else return null;
            })}
        </div> */}
      </div>
    </div>
  );
}

export default Videos;
