import React, { useState, useEffect, useContext } from 'react';
import { Map, GoogleApiWrapper, Marker/*, Circle*/ } from 'google-maps-react';
import { SearchContext } from '../../../Contexts/SearchContext';
import { UserContext } from '../../../Contexts/UserContext';

const googleApiKey = `AIzaSyC47_J_bDoU4euesrr-ChlFjRpas0HzLQM`;

function FCGoogleMap(props) {
    const { search, setSearch } = useContext(SearchContext);
    const { user, setUserLocation, setUser } = useContext(UserContext);

    //const [positionByUserLocation, setPositionByUserLocation] = useState(true);
    let positionByUserLocation = false;
    const handleMapClick = (e) => {
        const { latLng } = e;
        setSearch({
            ...search,
            lat: latLng.lat(),
            lng: latLng.lng()
        });
        positionByUserLocation = !positionByUserLocation;
        //console.log("search: ", search);
    }
    const handleResetLocation = () => {
        if ("geolocation" in navigator) {
            console.log("Available");
          } else {
            console.log("Not Available");
          }
        if (user.userLocation == null) {
            //setUserLocation();
        }
        setSearch({
            ...search,
            lat: user.userLocation ? user.userLocation.latitude : search.lat,
            lng: user.userLocation ? user.userLocation.longitude : search.lng
        })
        console.log(search);
        positionByUserLocation = !positionByUserLocation;
    }
    async function asyncuseEffect() {
        //console.log(12);
        await setUserLocation();
        console.log("user(googleMap): ", user);
        console.log("search(googleMap): ", search);
        if (positionByUserLocation) {
            setSearch({
                ...search,
                lat: user.userLocation ? user.userLocation.latitude : search.lat,
                lng: user.userLocation ? user.userLocation.longitude : search.lng
            });

        }

        //latitude, longitude

        //console.log(34);

    }
    useEffect(() => {
        asyncuseEffect();
    }, [positionByUserLocation])
    return (
        <div>
            <button onClick={() => handleResetLocation()}>  Reset My Location</button>
            <Map
                google={props.google}
                zoom={12}
                style={mapStyles}
                //containerStyle={containerStyle}
                initialCenter={{ lat: search.lat, lng: search.lng }}
                center={{ lat: search.lat, lng: search.lng }}
                onClick={(...e) => handleMapClick(e[2])}
            >
                {/* <Circle
                    radius={1200}
                    center={coords}
                    onMouseover={() => console.log('mouseover')}
                    onClick={() => console.log('click')}
                    onMouseout={() => console.log('mouseout')}
                    strokeColor='transparent'
                    strokeOpacity={0}
                    strokeWeight={5}
                    fillColor='#FF0000'
                    fillOpacity={0.2}
                /> */}
                <Marker position={{ lat: search.lat, lng: search.lng }} />
            </Map>
        </div>
    );
}
const mapStyles = {
    maxWidth: '300px',
    maxHeight: '300px',
    //position: 'relative',
    width: '100%',
    height: '100%'
};
// const containerStyle = {
//     //position: 'relative',  
//     //maxWidth: '300px',
//     //maxHeight: '300px',
// }

//export default FCGoogleMapView;
export default GoogleApiWrapper({
    apiKey: googleApiKey,
    language: "he"
})(FCGoogleMap);
