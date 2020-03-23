import React from 'react';
import FCCard from './FCCard';
function Explore(props) {
    let list= props.filteredList.map(el=>{
        return <FCCard details={el} key={el.id}/>
    })
    return (
        <div>
            {list}
        </div>
    );
}

export default Explore;