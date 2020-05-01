import React, { useState } from 'react';
import { /*Switch, Route, Link,*/ withRouter } from 'react-router-dom';
import FCBottomNavigation from './Bars/FCBottomNavigation';
import FCLogIn from './Pages/FCLogIn';
import '../Styles/mysass.scss';
import FCTopBar from './Bars/FCTopBar';

function FCPrices(props) {
    const [loggedIn/*, setLoggedIn*/] = useState(true)
    if (loggedIn) {
        return (
            <div
                style={{
                    textAlign: "-webkit-center",//מיישר את התוכן
                    // position: "fixed",
                    // top: "0px",
                     width: "100%"
                }}>
                <FCTopBar />
                {/* <FCBottomNavigation/> */}
            </div>
        );
    } else
        return (
            <div style={{ textAlign: "-webkit-center" }}>
                <FCLogIn />
            </div>
        );
}

export default withRouter(FCPrices);