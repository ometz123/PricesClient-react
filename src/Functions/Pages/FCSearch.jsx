import React, { useContext, /*useState*/ } from 'react';
import FCGooglePlacesSearch from './Add_Form/FCGooglePlacesSearch';
import FCTags from './Add_Form/FCTags';
import FCGoogleMap from './Add_Form/FCGoogleMap';
import FCSlider from '../eXtra/FCSlider';
import { SearchContext } from '../../Contexts/SearchContext';
import { ReceiptContext } from '../../Contexts/ReceiptContext';
import Button from '@material-ui/core/Button';
import { UserContext } from '../../Contexts/UserContext';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FCCard from '../eXtra/FCCard';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    show: {
        display: 'block',
        position: 'fixed',
        bottom: '20px',
        right: '30px',
        zIndex: '99',
        //size: '18px',
        border: 'none',
        outline: 'none',
        backgroundColor: 'red',
        color: 'white',
        cursor: 'pointer',
        padding: '15px',
        borderRadius: '4px',
        display: "inline-block",
    },
    hide: {
        display: 'none',
        position: 'fixed',
        bottom: '20px',
        right: '30px',
        zIndex: '99',
        //size: '18px',
        border: 'none',
        outline: 'none',
        backgroundColor: 'red',
        color: 'white',
        cursor: 'pointer',
        padding: '15px',
        borderRadius: '4px',
        display: "inline-block",
    },
}));

function FCSearch(props) {
    const classes = useStyles();

    // const [userLocation, setUserLocation] = useState(null);
    const { search, setSearch } = useContext(SearchContext);
    const { user } = useContext(UserContext);
    let show = false;
    const [resultItems, setResultItems] = useState();
    const { receipt, SetReceipt } = useContext(ReceiptContext);
    const myGoogleKey = `AIzaSyC47_J_bDoU4euesrr-ChlFjRpas0HzLQM`;
    let local = true;
    let http = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/`;
    if (local) {
        http = `https://localhost:44377/api/`;
    }

    const handleSubmit = (e) => {
        let api = http + `items/GetItemsForSearch`;
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
                Min_price: search.minPrice,
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
                        setResultItems(result.map(item => {
                            return <FCCard item={item} key={item.Item_id} compare />

                        }))
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
    window.onscroll = () => {
        if (/*document.body.scrollTop > 20 ||*/ document.documentElement.scrollTop > 20) {
            show = false;
            //console.log("block");
            //mybutton.style.display = "block";
        } else {
            //console.log("none");
            show = true;
            //mybutton.style.display = "none";
        }
    }
    useEffect(() => { window.scrollTo(0, 0) }, [])
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
            {resultItems}
            <button
                className={show ? classes.show : classes.hide}
                onClick={() => window.scrollTo(0, 0)}
            >TOP</button>

        </div>
    );
}

export default FCSearch;