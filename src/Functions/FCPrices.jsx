import React, {/*useState,*/useContext, useEffect } from 'react';
import { /*Switch, Route, Link,*/ withRouter } from 'react-router-dom';
//import FCBottomNavigation from './Bars/FCBottomNavigation';
import FCLogIn from './Pages/FCLogIn';
import '../Styles/mysass.scss';
import FCTopBar from './Bars/FCTopBar';
//import Stam from '../Functions/stam';
import { UserContext } from '../Contexts/UserContext';
import { TagsContext } from '../Contexts/TagsContext';
//import { useEffect } from 'react';

function FCPrices(props) {
    const { user, setUserLocation } = useContext(UserContext);
    const { tags, FetchTags } = useContext(TagsContext);
    //const [loggedIn/*, setLoggedIn*/] = useState(false)
    //useEffect(setUserLocation, []);
    useEffect(()=>{ FetchTags() }, []);
    if (user.loggedIn) {
        //FetchTags();
        return (
            <div
                style={{
                    textAlign: "-webkit-center",//מיישר את התוכן
                    // position: "fixed",
                    // top: "0px",
                    width: "100%"
                }}>
                <FCTopBar />
            </div>
        );
    } else
        return (
            <div style={{ textAlign: "-webkit-center" }}>
                {/* <Stam/>  */}
                <FCLogIn />
            </div>
        );
}

export default withRouter(FCPrices);