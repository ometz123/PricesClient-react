import React, { useState } from 'react';
import { /*Switch, Route, Link,*/ withRouter } from 'react-router-dom';
import FCBottomNavigation from './Bars/FCBottomNavigation';
import FCLogIn from './Pages/FCLogIn';

function FCPrices(props) {
    const [loggedIn/*, setLoggedIn*/] = useState(true)
    if (loggedIn) {
        return (
            <div>
                <FCBottomNavigation />
            </div>
        );
    } else
        return (
            <div>
                <FCLogIn />
            </div>
        );
}

export default withRouter(FCPrices);