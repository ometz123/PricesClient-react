import React from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import LabelBottomNavigation from './LabelBottomNavigation';


function Prices(props) {


    return (
        <div>
            <LabelBottomNavigation/>
        </div>
    );
}

export default withRouter(Prices);