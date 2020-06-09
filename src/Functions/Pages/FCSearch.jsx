import React, { useContext, /*useState*/ } from 'react';
import FCGooglePlacesSearch from './Add_Form/FCGooglePlacesSearch';
import FCTags from './Add_Form/FCTags';
import FCGoogleMap from './Add_Form/FCGoogleMap';
import FCSlider from '../eXtra/FCSlider';
import { SearchContext } from '../../Contexts/SearchContext';
import { ReceiptContext } from '../../Contexts/ReceiptContext';
import Button from '@material-ui/core/Button';
import { UserContext } from '../../Contexts/UserContext';

function FCSearch(props) {
    // const [userLocation, setUserLocation] = useState(null);
    const { search, setSearch } = useContext(SearchContext);
    const { user } = useContext(UserContext)
    const { receipt, SetReceipt } = useContext(ReceiptContext);
    const myGoogleKey = `AIzaSyC47_J_bDoU4euesrr-ChlFjRpas0HzLQM`;


    const handleSubmit = (e) => {
        let api = `https://localhost:44377/api/items/GetItemsForSearch`;
        console.log("search(FCSearch): ", search);

        //let url2 = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/items/GetItemsForSearch`;

        if (true) {
            console.log('fetch items: ');
            let Search = {
                User: {
                    User_rank: user.rank,
                    Lon: search.lng,
                    Lat: search.lat,
                },
                Distance_radius: search.distance,
                Max_price: search.maxPrice,
                Min_price:search.minPrice,
                Title_Words: search.text,
                Tags: search.tags

            }
            console.log(Search);

            fetch(api, {
                method: 'POST',
                body: JSON.stringify(Search),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            }
            )
                .then(res => {
                    return res.json();
                })
                .then(
                    (result) => {
                        console.log("fetch FetchGet= ", result);
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
            <div>
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
                {/* <input
                    type="button"
                    onClick={() => { console.log(search) }}
                    value="Search"
                /> */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => { handleSubmit() }}
                >
                    Search
                </Button>
            </div>
        </div>
    );
}

export default FCSearch;