import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const googleApiKey=`AIzaSyC47_J_bDoU4euesrr-ChlFjRpas0HzLQM`;
function FCGoogleMap(props) {
    const [location,setLocation]= React.useState({ lat: 32.658456, lng: 35.580300 })
    return (
        <div>
            <Map
                google={props.google}
                zoom={12}
                style={mapStyles}
                containerStyle={containerStyle}
                initialCenter={{ lat: 32.658456, lng: 35.580300 }}
                onClick={()=>setLocation({ lat: 32.658470, lng: 35.580390 })}

            >
                <Marker position={location} />
            </Map>
        </div>
    );
}
const mapStyles = {
    maxWidth: '300px',
    maxHeight: '300px',
    //position: 'relative',
    //width: '100%',
    //height: '100%'
};
const containerStyle = {
    //position: 'relative',  
    maxWidth: '300px',
    maxHeight: '300px',
  }

//export default FCGoogleMapView;
export default GoogleApiWrapper({
    apiKey: googleApiKey,
    language:"he"
})(FCGoogleMap);
