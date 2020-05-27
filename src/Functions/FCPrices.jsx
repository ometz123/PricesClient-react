import React, {/*useState,*/useContext } from 'react';
import { /*Switch, Route, Link,*/ withRouter } from 'react-router-dom';
//import FCBottomNavigation from './Bars/FCBottomNavigation';
import FCLogIn from './Pages/FCLogIn';
import '../Styles/mysass.scss';
import FCTopBar from './Bars/FCTopBar';
//import Stam from '../Functions/stam';
import { UserContext } from '../Contexts/UserContext';
import { useEffect } from 'react';

function FCPrices(props) {
    const { user, setUserLocation } = useContext(UserContext);
    //const [loggedIn/*, setLoggedIn*/] = useState(false)
    useEffect(()=>{
        setUserLocation();
    },[]);
    if (user.loggedIn) {
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