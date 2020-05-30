import React, { /*useState,*/ useEffect, useContext } from 'react';
import /*Circle,*/ { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { SearchContext } from '../../../Contexts/SearchContext';
import { UserContext } from '../../../Contexts/UserContext';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';

const googleApiKey = `AIzaSyC47_J_bDoU4euesrr-ChlFjRpas0HzLQM`;

function FCGoogleMap(props) {
    const { search, setSearch } = useContext(SearchContext);
    const { user, setUserLocation/*, setUser*/ } = useContext(UserContext);

    //const [positionByUserLocation, setPositionByUserLocation] = useState(true);
    let positionByUserLocation = true;
    //let coords = null;
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
    //
    function getLocation() {
        console.log('getLocation was called');
        navigator.permissions.query({
            name: 'geolocation'
        }).then((result) => {
            if (result.state === 'granted') {
                console.log("result.state: ", result.state);
                //geoBtn.style.display = 'none';
            } else if (result.state === 'prompt') {
                console.log("result.state: ", result.state);
                //geoBtn.style.display = 'none';

            } else if (result.state === 'denied') {
                console.log("עליך לאשר שימוש במיקום");
                console.log("result.state: ", result.state);

                //geoBtn.style.display = 'inline';
            }
            result.onchange = function () {
                console.log(result.state);
            }
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, positionError);
        } else {
            console.log('Geolocation is not supported by this device')
        }
    }
    // function revealPosition() { console.log("revealPosition"); };
    // function positionDenied() { console.log("positionDenied"); };
    // function geoSettings() { console.log("geoSettings"); };
    function positionError() {
        console.log('Geolocation is not enabled. Please enable to use this feature')

        //if(allowGeoRecall) getLocation()
    }
    function showPosition() {
        console.log('position accepted')
        //allowGeoRecall = false
    }
    //
    const handleResetLocation = () => {
        getLocation();
        // if ("geolocation" in navigator) {
        //     console.log("Available");
        //   } else {
        //     console.log("Not Available");
        //   }
        setUserLocation();
        if (user.userLocation == null) {
            //setUserLocation();
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
            });
        }
        setSearch({
            ...search,
            lat: user.userLocation ? user.userLocation.latitude : search.lat,
            lng: user.userLocation ? user.userLocation.longitude : search.lng
        })
        console.log(search);
        positionByUserLocation = !positionByUserLocation;
    }
    const fetchPlaces = (mapProps, map) => {
        const { google } = mapProps;
        //const service = new google.maps.places.PlacesService(map);
        console.log("google: ", google);
        console.log("google.maps.places: ", google.maps.places);

    }
    useEffect(() => {
        const asyncuseEffect= async()=> {
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
        asyncuseEffect();
    }, [positionByUserLocation/*,search, setSearch, setUserLocation, user*/])
    return (
        <div>
            <GpsFixedIcon onClick={() => handleResetLocation()} />
            <Map
                google={props.google}
                zoom={12}
                style={mapStyles}
                //containerStyle={containerStyle}
                initialCenter={{ lat: search.lat, lng: search.lng }}
                center={{ lat: search.lat, lng: search.lng }}
                onClick={(...e) => handleMapClick(e[2])}
                onReady={fetchPlaces}
            >
                <Marker
                    position={{ lat: search.lat, lng: search.lng }}
                    animation={props.google.maps.Animation.DROP} />
               

                {/* <Circle
                    radius={search.distance}
                    center={{ lat: search.lat, lng: search.lng }}
                    onMouseover={() => console.log('mouseover')}
                    onClick={() => console.log('click')}
                    onMouseout={() => console.log('mouseout')}
                    strokeColor='transparent'
                    strokeOpacity={0}
                    strokeWeight={5}
                    fillColor='#FF0000'
                    fillOpacity={0.2}
                /> */}
            </Map>
        </div>
    );
}
const mapStyles = {
    //maxWidth: '300px',
    maxHeight: '260px',
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
