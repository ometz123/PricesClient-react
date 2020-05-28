import React, { useContext, useEffect } from 'react';
import FCCard from '../eXtra/FCCard';
import { SearchContext } from '../../Contexts/SearchContext';

export default function FCExplore(props) {

    let list = props.filteredList.map(el => {
        return <FCCard details={el} key={el.id} />
    })
    const { search } = useContext(SearchContext);
    //let search = 'omer'
    const getItems = () => {
        let api = `https://localhost:44377/api/items/GetItemsForSearch`;
        //let api = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/items/GetItemsForSearch`;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        fetch(api+"?search=omer", {
            method: 'GetItemsForSearch',
            //body: JSON.stringify(search),
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
    useEffect(() => {
        //getItems();
    }, [])
    return (
        <div>
            {list}
        </div>
    );
}

