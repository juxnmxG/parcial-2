import { useState, useEffect, useContext } from "react";
import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { usersConected } from "../../../context/CamsConected/CamsConected";

import Controls from "./Controls";
import AgoraRTC from "agora-rtc-sdk-ng";
import Videos from "./Videos";

const config = {
  mode: "rtc",
  codec: "vp8",
};
let configCamera = {
  encoderConfig: "1080_p",
}
const useClient = createClient(config);
const useDesktopClient = createClient(config);
let useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks(configCamera);

function VideoCall(props) {

  const { setInCall, channelName } = props;
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const { room } = useParams()
  const { screens, setScreens, setTracks, setLocalScreen, localScreen, setSpeakers, speakers } = useContext(usersConected)

  const [token, setToken] = useState();
  const [validateRol, setValidateRol] = useState();
  const [dataEvent, setDataEvent] = useState();
  const [start, setStart] = useState(false);
  const [loginUser, setLoginUser] = useState(false);
  const [loginScreen, setLoginScreen] = useState(false);

  const client = useClient();
  let screenClient = useDesktopClient();
  let screen = null;

  const dataStorage = localStorage.getItem("data");
  const dataStorageGet = JSON.parse(dataStorage);

  const sharedScreen = async () => {
    if (!loginScreen) await screenClient.join(token.app, token.channel_desktop, token.token_desktop, token.uid_desktop)
      .then(() => {
        setLoginScreen(true)
        console.log("::conectado::")
      })
      .catch(() => {
        setLoginScreen(false)
        console.log("::desconectado::")
      });

    screen = await AgoraRTC.createScreenVideoTrack({
      encoderConfig: token.resolution_desktop,
    });

    setLocalScreen(screen)
    await screenClient.publish(screen);
    screen.on("track-ended", () => {
      unSharedScreen()
    });
  };

  const unSharedScreen = async () => {
    await screenClient.leave();
    screenClient.removeAllListeners()
    screen.close()
    screen.removeAllListeners()
    setLocalScreen(false);
    setLoginScreen(false)
  };

  const getUserName = async (user) => {
    const res = await fetch(`https://api.virtuales.io/event/${dataStorageGet.event.id}/rooms/${room}/atteendes/${user.uid}`)
    const response = await res.json();
    console.log(`https://api.virtuales.io/event/${dataStorageGet.event.id}/rooms/${room}/atteendes/${user.uid}`)
    console.log("userName respuesta", response)
    return await response;
  }

  useEffect(() => {
    const getToken = async () => {

      if (!token) {

        const res = await fetch(`https://api.virtuales.io/event/${dataStorageGet.event.id}/rooms/${room}/token/${"dataUser.rol"}?name=${"dataUser.name"}`)
        const resDataEvent = await fetch(`https://api.virtuales.io/event/${dataStorageGet.event.id}/rooms/${room}/schedules`)

        setToken(await res.json());
        setDataEvent(await resDataEvent.json());
      }
    }
    getToken()

    const validateRolUser = async () => {
      if (!validateRol) {
        const res = await fetch(`https://api.virtuales.io/event/${dataStorageGet.event.id}/rooms/${room}/rol?email=${"user.email"}`)
        setValidateRol(await res.json());
      }
    }
    validateRolUser();
  }, [])


  useEffect(() => {

    let init = async (name) => {

      client.on("user-published", async (user, mediaType) => {
        console.log("userName respuesta-clientOn", user)
        const userName = await getUserName(user)

        await client.subscribe(user, mediaType);

        user.userName = userName.name;

        if (mediaType === "video") {
          setSpeakers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {

        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setSpeakers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }

      });

      client.on("user-left", (user) => {
        setSpeakers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      screenClient.on("user-published", async (user, mediaType) => {
        await screenClient.subscribe(user, mediaType);
        if (mediaType === "video")
          setScreens((prevUsers) => {
            return [...prevUsers, user];
          });
      });

      screenClient.on("user-left", (user) => {
        setScreens((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      screenClient.on("user-unpublished", (user, type) => {

        if (type === "video") {
          setScreens((prevUsers) => {
            user.videoTrack?.stop();
            console.log("user-unpublished-screenClient", user.videoTrack)
            return prevUsers.filter((User) => User.uid !== user.uid);
          });

        }
      });

      if (token && !loginUser && name) await client.join(token.app, name, token.token, token.uid)
        .then(() => {
          setLoginUser(true)
          console.log("::conectado::")
        })
        .catch(() => {
          setLoginUser(false)
          console.log("::desconectado::")
        });

      if (tracks) {
        await client.publish([tracks[0], tracks[1]]);
      }
      if (token && !loginScreen) {
        await screenClient.join(token.app, token.channel_desktop, token.token_desktop, token.uid_desktop)
          .then(() => {
            setLoginScreen(true)
            console.log("::conectado::")
          })
          .catch(() => {
            setLoginScreen(false)
            console.log("::desconectado::")
          });
      }
      //setStart(true);
    };


    if (token && ready && tracks) {
      tracks[1].setEncoderConfiguration(token.resolution);
      setTracks(tracks)
      init(channelName);
    }

    return () => {
        return setStart(true)
    };

  }, [channelName, client, ready, tracks, !token, screenClient, screen]);

  return (
    <div className="vid">
      {start && tracks &&
        <div>
          <Videos users={speakers} localScreen={localScreen} tracks={tracks} rol={validateRol.rol} screens={screens}/>
        </div>
      }
      {ready && tracks && (
        <Controls
          tracks={tracks}
          setStart={setStart}
          setInCall={setInCall}
          sharedScreen={sharedScreen}
          unSharedScreen={unSharedScreen}
          users={speakers}
          localScreen={localScreen}
          client={client}
          desktop={screenClient}
        />
      )}
    </div>
  );
}

export default VideoCall;
