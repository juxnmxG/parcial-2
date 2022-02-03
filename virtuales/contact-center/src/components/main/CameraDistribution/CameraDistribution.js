import { AgoraVideoPlayer } from 'agora-rtc-react';
import React, { useContext } from 'react';
import { usersConected } from '../../../context/CamsConected/CamsConected';
import "./CameraDistribution.css"

function CameraDistribution() {

    const { speakers, screens, tracks, localScreen } = useContext(usersConected)

    return <div className={ `marginTop video-grid-auditorio-${speakers.length - 1}`}>

        {tracks && tracks[1] && screens.length > 0 &&
            <div className="miniCams" >
                <AgoraVideoPlayer

                    className="vid-minicams"
                    videoTrack={tracks[1]}
                />
                <div className="minicams-name">{"dataUser.name"}</div>
            </div>
        }
        {localScreen && tracks && tracks[1] && speakers.length === 0 &&
            <div className="vid-minicams-local" >
                <AgoraVideoPlayer

                    className="vid-minicams-localscreen"
                    videoTrack={tracks[1]}
                />
                <div className="minicams-name">{"dataUser.name"}</div>
            </div>
        }
        {localScreen && tracks && tracks[1] && speakers.length > 0 &&
            <div className="miniCams" >
                <AgoraVideoPlayer

                    className="vid-minicams"
                    videoTrack={tracks[1]}
                />
                <div className="minicams-name">{"dataUser.name"}</div>
            </div>
        }
        {localScreen && speakers.length > 0 && 
            speakers.map((user) =>
                <div className="miniCams" key={user.uid}>
                    <AgoraVideoPlayer
                        videoTrack={user.videoTrack}
                        className="vid-minicams"
                    />
                    <div className="minicams-name">{user.userName}</div>
                </div>
            )
        }

        {screens.length > 0 && speakers.length === 1 && speakers.length < 2 &&(
            <div className="vid-minicams-local" >
                <AgoraVideoPlayer
                    videoTrack={speakers[0].videoTrack}
                    className="vid-minicams-localscreen"
                />
                <div className="minicams-name">{speakers[0].userName}</div>
            </div>
        )}
        {screens.length > 0 && speakers.length === 1 && speakers.length < 2 &&(
            <div className="miniCams" >
                <AgoraVideoPlayer
                    videoTrack={speakers[0].videoTrack}
                    className="vid-minicams"
                />
                <div className="minicams-name">{speakers[0].userName}</div>
            </div>
        )}
        
        {screens.length > 0 && speakers.length > 1 && (
            speakers.map((user) =>
                <div className="miniCams" key={user.uid}>
                    <AgoraVideoPlayer

                        videoTrack={user.videoTrack}
                        className="vid-minicams"
                    />
                    <div className="minicams-name">{user.userName}</div>
                </div>
            )
        )}
    </div>;
}

export default CameraDistribution;
