import React, { useContext, useEffect } from 'react';
import FCCard from '../eXtra/FCCard';
import { SearchContext } from '../../Contexts/SearchContext';
import { UserContext } from '../../Contexts/UserContext';
import { useState } from 'react';

export default function FCExplore(props) {
    // let list = props.filteredList.map(el => {
    //     return <FCCard details={el} key={el.id} />
    // })
    const [exploreItems, setExploreItems] = useState("...Loading");
    const { search } = useContext(SearchContext);
    const { user, setUserLocation } = useContext(UserContext)
    let Search = {
        User: {
            User_rank: user.rank,
            Lon: null,
            Lat: null,
        },
        Distance_radius: 100,
        Max_price: 1000,

    }
    const getItems = () => {
        Search.User.Lat = user.userLocation.latitude;
        Search.User.Lon = user.userLocation.longitude;
        //let api = `https://localhost:44377/api/items/GetItemsForSearch`;
        let api = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/items/GetItemsForSearch`;

        //http://proj.ruppin.ac.il/bgroup4/prod/server
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
                    console.log("Explore fetch= ", result);
                    setExploreItems(result.map(item => {
                        return <FCCard item={item} key={item.Item_id} />

                    }))
                },
                (error) => {
                    console.log("err post=", error);
                });


        if (false) {
            api = `https://localhost:44377/api/items`;
            fetch(api, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    // 'Accept':'*/*',
                    // 'Accept-Encoding':'gzip, deflate, br',
                    // 'Connection':'keep-alive',
                })
                //, mode: `no-cors`,
            })
                .then(res => {
                    console.log('res=', res);
                    console.log('res.status', res.status);
                    console.log('res.ok', res.ok);
                    return res.json()
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

    useEffect(() => {
        const a = async () => { await setUserLocation(); };
        a().
            then(() => {
                if (user.userLocation) {
                    getItems();
                }
            });

    }, [user.userLocation ? user.userLocation.latitude : []])
    if (user.userLocation) {
        return (
            <div>
                {exploreItems}
            </div>
        );
    } else {
        return (
            <div>
                in order to use this feature, you have to enable location access
            </div>
        );
    }

}

