import React, { useEffect, useState } from "react";
import "./header.css";
import HeaderMobile from "./headerMobile";
import HeaderDesktop from "./headerDesktop";
import useWindowSize from "../../utils/useWindowSize";

function Header() {
  const { width } = useWindowSize();
  const breakpointWidth = 768;

  const [getDataStorage, setGetDataStorage] = useState()
 
  const dataStorage = localStorage.getItem("data");
  
  useEffect(() => {
    setGetDataStorage(JSON.parse(dataStorage))
    
  }, [])


 
  return (
    <>
      {width >= breakpointWidth ? (
        <HeaderDesktop data={getDataStorage} />
      ) : (
        <HeaderMobile />
      )}
    </>
  );
}

export default Header;
