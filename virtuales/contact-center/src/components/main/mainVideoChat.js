import React from "react";
import BannerNextEvent from "./bannerNextEvents/marquee";
import VideoInfo from "./MainScreen/video";

import DescriptionEvent from "./InfoSpeaker/infoSpeaker";


function VideoInfoWrapper() {

  const dataStorage = localStorage.getItem("data");
  const dataStorageGet = JSON.parse(dataStorage);

  return (
    <div className="videoWrapper">
      <VideoInfo>
        <BannerNextEvent marquee={dataStorageGet.event.marquee}></BannerNextEvent>
      </VideoInfo>
      <DescriptionEvent></DescriptionEvent>
    </div>
  );
}

export default VideoInfoWrapper;
