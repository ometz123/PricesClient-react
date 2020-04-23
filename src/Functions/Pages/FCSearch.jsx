import React from 'react';
import FCGooglePlacesSearch from './Add_Form/FCGooglePlacesSearch';
import FCTags from './Add_Form/FCTags';
import FCGoogleMap from './Add_Form/FCGoogleMap';
import FCSlider from '../eXtra/FCSlider';

function FCSearch(props) {
    return (
        <div>         
            <form> 
            <div>
                {/* <FCGooglePlacesSearch color="white" /> */}FCGooglePlacesSearch
            </div>
            <br />
            <div>
                <FCTags />
            </div>
            <br />
            <div 
            style={{width:"300px",height:"250px", backgroundColor:"grey"}}
            >
                { <FCGoogleMap /> }FCGoogleMap
            </div>
            <div>
                <FCSlider/>
            </div>
            <button type="submit">search</button>
            </form>  
        </div>
    );
}

export default FCSearch;