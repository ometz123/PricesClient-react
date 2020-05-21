import React, { useContext, /*useState*/ } from 'react';
import FCGooglePlacesSearch from './Add_Form/FCGooglePlacesSearch';
import FCTags from './Add_Form/FCTags';
import FCGoogleMap from './Add_Form/FCGoogleMap';
import FCSlider from '../eXtra/FCSlider';
import { SearchContext } from '../../Contexts/SearchContext';

function FCSearch(props) {
    // const [userLocation, setUserLocation] = useState(null);
    const { search, setSearch } = useContext(SearchContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(search);
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
                    <FCGooglePlacesSearch color="white" handleLocation={(locationEvent) => handleLocation(locationEvent)} />
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