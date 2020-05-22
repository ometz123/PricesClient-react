import React, { useContext, /*useState*/ } from 'react';
import FCGooglePlacesSearch from './Add_Form/FCGooglePlacesSearch';
import FCTags from './Add_Form/FCTags';
import FCGoogleMap from './Add_Form/FCGoogleMap';
import FCSlider from '../eXtra/FCSlider';
import { SearchContext } from '../../Contexts/SearchContext';

function FCSearch(props) {
    // const [userLocation, setUserLocation] = useState(null);
    const { search, setSearch } = useContext(SearchContext);

    let e = `ChIJS6e0YxpqHBURkJoXT0m2wTY`;
    const myGoogleKey = `AIzaSyC47_J_bDoU4euesrr-ChlFjRpas0HzLQM`;
    let url1 = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${e}&key=${myGoogleKey}`;
    let url2 = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/items/GetItemsForSearch`;
    let url3 = `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJVZUCaRpqHBURvnGwaPyrvD8&key=${myGoogleKey}`;
    let url4 = `https://api.randomuser.me/`;
    let url5 = `https://maps.googleapis.com/maps/api/place/details/json?key=${myGoogleKey}&place_id=${e}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("search(FCSearch): ", search);
        console.log("random user start");
        await fetch(`https://api.randomuser.me/`)
            .then(res => res.json())
            .then(
                res => console.log(res),
                err => console.log(err)
            );
        if (false) {
            console.log('fetch items: ');

            fetch(url5, {
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
    const handlePriceRange = (e) => {

        //SetNewSearch({...search, priceRange: e})
        setSearch({
            ...search, minPrice: e[0],
            maxPrice: e[1]
        })
    }
    const handleDistance = (e) => {
        setSearch({
            ...search, distance: e[0]
        })
    }
    const handleTags = (e) => {
        setSearch({
            ...search, tags: e
        })
    }
    const handleLocation = (e) => {
        setSearch({
            ...search, placeId: e ? e.place_id : null
        })
    }


    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div >
                    {/* <FCGooglePlacesSearch color="white" handleLocation={(locationEvent) => handleLocation(locationEvent)} /> */}
                    <FCGoogleMap handleLocation={(locationEvent) => handleLocation(locationEvent)} search={search} />
                </div>
                <div
                    style={{
                        //width: "300px",
                        height: "250px",
                        margin: "10px",
                    }}
                >
                </div>
                <div >
                    <FCTags handleTags={(tagsEvent) => handleTags(tagsEvent)} />
                </div>
                <div >
                    <FCSlider handlePriceRange={(priceEvent) => handlePriceRange(priceEvent)} handleDistance={(DistanceEvent) => handleDistance(DistanceEvent)} />
                </div>
                <button type="submit" >search</button>
            </form>
        </div>
    );
}

export default FCSearch;