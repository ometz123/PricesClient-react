import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, setUser] = useState({
        userId:"John@Doe.com",
        firstName: "John",
        lastName: "Doe",
        rank: 1000,
        loggedIn: true,
        userLocation: null,
        birthDate:"1990-12-16T00:00:00Z",
        gender:null,
        state:null,
        city:null,
        password:"JohnDoe"

    })

    const setUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUser({ ...user, userLocation: position ? position.coords : null });
                //console.log("user(userContext) Location: Lat: ", position.coords.latitude, "Lon: ", position.coords.longitude);
            }// , error => {
            //     console.log(error);
            // }, options => {
            //     console.log(options);
            // }
        );

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