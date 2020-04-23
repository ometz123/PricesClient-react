import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

function FCGoogleMap(props) {
    return (
        <div>
            <Map
                google={props.google}
                zoom={8}
                //style={mapStyles}
                containerStyle={containerStyle}
                initialCenter={{ lat: 47.444, lng: -122.176 }}
            >
                <Marker position={{ lat: 48.00, lng: -122.00 }} />
            </Map>
        </div>
    );
}
const mapStyles = {
    maxWidth: '300px',
    maxHeight: '300px',
    position: 'relative',
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
    apiKey: 'AIzaSyC47_J_bDoU4euesrr-ChlFjRpas0HzLQM'
})(FCGoogleMap);
