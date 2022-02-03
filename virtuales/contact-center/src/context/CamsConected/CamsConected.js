import React, { createContext, useState } from 'react';

export const usersConected = createContext();

function CamsConected({ children }) {
    const [users, setUsers] = useState([])
    const [screens, setScreens] = useState([])
    const [speakers, setSpeakers] = useState([])
    const [tracks, setTracks] = useState()
    const [localScreen, setLocalScreen] = useState()

    return <usersConected.Provider
        value={{
            users,
            setUsers,
            screens,
            setScreens,
            tracks,
            setTracks,
            localScreen,
            setLocalScreen,
            speakers,
            setSpeakers,
        }}>
        {children}
    </usersConected.Provider>;
}

export default CamsConected;
