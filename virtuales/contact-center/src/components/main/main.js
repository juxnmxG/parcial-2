import React, { useContext, useEffect, useState } from "react";
import "./main.css";
import InfoEvent from "./BannerLogo/infoEvent";
import VideoInfoWrapper from "./mainVideoChat";
import ChatComponent from "../ChatComponent/ChatComponent";


function Main() {
  const dataStorage = localStorage.getItem("data");
  const dataStorageGet = JSON.parse(dataStorage);
  
  return (
    <>
      <InfoEvent data={dataStorageGet}></InfoEvent>
      <section className="auditorium" style={{marginTop: "30px"}}>
        <VideoInfoWrapper></VideoInfoWrapper>
        <ChatComponent />
      </section>
    </>
  );
}

export default Main;
