import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, setUser] = useState({
        name: "John",
        lastName: "Doe",
        loggedIn: true,
        userLocation: null
    })

    const setUserLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setUser({ ...user, userLocation: position ? position.coords : null });
        });
    }
    return (
        <UserContext.Provider value={{
            user,
            SetUser: setUser,
            setUserLocation: setUserLocation
        }}>
            {props.children}
        </UserContext.Provider>
    );
}
export default UserContextProvider;