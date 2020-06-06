import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import FCGooglePlacesSearch from './FCGooglePlacesSearch';
import TextField from '@material-ui/core/TextField';
import { ReceiptContext } from '../../../Contexts/ReceiptContext';
import FCGoogleMap from './FCGoogleMap';
import { SearchContext } from '../../../Contexts/SearchContext';
//import { SearchContext } from '../../../Contexts/SearchContext';

export default function FCStoreDetails() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const [latLon, setLatLon] = useState(null);
    const myGoogleKey = `AIzaSyC47_J_bDoU4euesrr-ChlFjRpas0HzLQM`;
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { receipt, SetReceipt } = useContext(ReceiptContext);
    const { search, setSearch } = useContext(SearchContext);
    //const [storeName1, setStoreName1] = useState();

    const getPlaceDetails = (place_id, storeName) => {
        SetReceipt({ ...receipt, store: { name: storeName } })

        let api = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${myGoogleKey}`;
        let corsAnywhere = `https://cors-anywhere.herokuapp.com/`;
        fetch(corsAnywhere + api, {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json; charset=UTF-8' })
        })
            .then(res => { return res.json() })
            .then((result) => {
                console.log("fetch FetchGet= ", result);
                let storeLatLon = result.results[0].geometry.location;
                console.log(storeLatLon);
                //setLatLon(storeLatLon)
                setSearch({
                    ...search,
                    lat: storeLatLon.lat,
                    lng: storeLatLon.lng
                });
                SetReceipt({ ...receipt, store: { name: storeName, lat: storeLatLon.lat, lon: storeLatLon.lng } })

            },
                (error) => {
                    console.log("err post=", error);
                });
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleStoreNameChange = (storeName) => {
        SetReceipt({
            ...receipt, store: {
                name: storeName
            }
        })

    }
    // useEffect(() => {
    //     // navigator.geolocation.getCurrentPosition((position) => {
    //     //     //console.log(position);
    //     //     //console.log("Latitude is :", position.coords.latitude);
    //     //     //console.log("Longitude is :", position.coords.longitude);
    //     //     SetNewSearch({ ...search, userLocation: position ? position.coords : null });
    //     // });
    // })
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                <StorefrontOutlinedIcon htmlColor="yellow" />Store <AnnouncementOutlinedIcon htmlColor="red" style={{ float: "none" }} />
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Store Details"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Google Places
                    </DialogContentText>
                    <FCGooglePlacesSearch
                        getPlaceDetails={getPlaceDetails}
                    />
                    <DialogContentText>
                        or insert manually:
                    </DialogContentText>
                    <TextField
                        label="Store Name"
                        value={receipt.store.name}
                        onChange={e => handleStoreNameChange(e.target.value)}
                        variant="outlined"
                        InputProps={{ style: { width: "400px" } }} />
                    <FCGoogleMap />
                </DialogContent>
                <DialogActions>
                    {/* <Button autoFocus onClick={handleClose} color="primary">
                        Disagree
                    </Button> */}
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
