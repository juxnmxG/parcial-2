import { createContext, useState } from "react";

export const EventData = createContext({});

function EventDataProvider({ children }) {
  const [data, setData] = useState({});

  return (
    <EventData.Provider value={{ data, setData }}>
      {children}
    </EventData.Provider>
  );
}

export default EventDataProvider;
