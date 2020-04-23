import React from 'react';
import FCCard from '../eXtra/FCCard';

export default function FCExplore(props) {

    let list= props.filteredList.map(el=>{
        return <FCCard details={el} key={el.id}/>
    })
    
    return (
        <div>
            {list}
        </div>
    );
}

