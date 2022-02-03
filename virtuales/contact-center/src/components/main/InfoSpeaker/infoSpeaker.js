import { useState } from 'react';
import "./infoSpeaker.css"

function DescriptionEvent() {

  const [isSelected, setIsSelected] = useState("info");

  return (
    <>
      <div className='list-infoSpeaker'>
        <ul>
          <li className={isSelected === "info" ? "active" : ""} onClick={() => setIsSelected("info")}>información del ponente</li>
          <li>|</li>
          <li className={isSelected === "resources" ? "active" : ""} onClick={() => setIsSelected("resources")}>Recursos</li>
        </ul>
        <div className='space-infoSpeaker'>
          {isSelected === "info" &&
            <h1>información</h1>
          }
          {isSelected === "resources" &&
            <h1>Recursos</h1>
          }
        </div>
      </div>
    </>
  );
}

export default DescriptionEvent;
