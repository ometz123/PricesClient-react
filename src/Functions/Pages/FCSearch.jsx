import React, { useContext, /*useState*/ } from 'react';
import FCGooglePlacesSearch from './Add_Form/FCGooglePlacesSearch';
import FCTags from './Add_Form/FCTags';
import FCGoogleMap from './Add_Form/FCGoogleMap';
import FCSlider from '../eXtra/FCSlider';
import { SearchContext } from '../../Contexts/SearchContext';
import { ReceiptContext } from '../../Contexts/ReceiptContext';

function FCSearch(props) {
    // const [userLocation, setUserLocation] = useState(null);
    const { search,setSearch } = useContext(SearchContext);
    const { receipt,SetReceipt } = useContext(ReceiptContext);
    const myGoogleKey = `AIzaSyC47_J_bDoU4euesrr-ChlFjRpas0HzLQM`;


    const handleSubmit = (e) => {
        //e.preventDefault();
        let url2 = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/items/GetItemsForSearch`;

        console.log("search(FCSearch): ", search);
        if (true) {
            console.log('fetch items: ');

            fetch(url2, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
                //, mode: `no-cors`,
            }
            )
                .then(res => {
                    console.log('res=', res);
                    console.log('res.status', res.status);
                    console.log('res.ok', res.ok);
                    return res.json();
                })
                .then(
                    (result) => {
                        console.log("fetch FetchGet= ", result);
                        //result.map(st => console.log(st.FullName));
                        //console.log('result[0].FullName=', result[0].FullName);
                    },
                    (error) => {
                        console.log("err post=", error);
                    });
        }
    }
    const getPlaceDetails = (place_id, storeName) => {
        SetReceipt({ ...receipt, store: { name: storeName } })

        let api = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${myGoogleKey}`;
        let corsAnywhere = `https://cors-anywhere.herokuapp.com/`;
        fetch(corsAnywhere + api, {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json; charset=UTF-8' })
        })
            .then(res => { return res.json() })
            .then((result) => {
                console.log("fetch FetchGet= ", result);
                let storeLatLon = result.results[0].geometry.location;
                console.log(storeLatLon);
                //setLatLon(storeLatLon)
                setSearch({
                    ...search,
                    lat: storeLatLon.lat,
                    lng: storeLatLon.lng
                });
                SetReceipt({ ...receipt, store: { name: storeName, lat: storeLatLon.lat, lon: storeLatLon.lng } })

            },
                (error) => {
                    console.log("err post=", error);
                });
    }


    return (
        <div>
            <div onSubmit={(e) => handleSubmit(e)}>
                <div >
                    <FCGooglePlacesSearch color="white" 
                    getPlaceDetails={getPlaceDetails}
                    //handleLocation={(locationEvent) => handleLocation(locationEvent)}
                     />
                    <FCGoogleMap />
                </div>
                <div style={{
                    //width: "300px",
                    height: "250px",
                    margin: "10px",
                }}
                >
                </div>
                <div >
                    <FCTags />
                </div>
                <div >
                    <FCSlider />
                </div>
                <button type="submit" >Search</button>
            </div>
        </div>
    );
}

export default FCSearch;