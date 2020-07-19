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
import { Chip, Avatar } from '@material-ui/core';
import { green, yellow } from '@material-ui/core/colors';
import StorefrontTwoToneIcon from '@material-ui/icons/StorefrontTwoTone';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { GoogleApiWrapper } from 'google-maps-react';
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

    return (
        <div >
            <Chip
                label={"Store"}
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
                avatar={<Avatar style={{ backgroundColor: "inherit" }}><StorefrontIcon style={{ color: yellow[500], float: "none" }} /></Avatar>}
            />
            <AnnouncementOutlinedIcon color="secondary" />
            {/* <StorefrontOutlinedIcon htmlColor="yellow" />Store <AnnouncementOutlinedIcon htmlColor="red" style={{ float: "none" }} /> */}
            {/* </Button> */}
            <div style={{ textAlign: "-webkit-center", color: "black" }}>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <div style={{ textAlign: "-webkit-center" }}>

                        <DialogTitle id="responsive-dialog-title">{"Store Details"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Google Places</DialogContentText>
                            <FCGooglePlacesSearch getPlaceDetails={getPlaceDetails} />
                            <DialogContentText>or insert manually:</DialogContentText>
                            <TextField
                            style={{width: "-webkit-fill-available"}}
                                label="Store Name"
                                value={receipt.store.name}
                                onChange={e => handleStoreNameChange(e.target.value)}
                                variant="outlined"
                                //InputProps={{ style: { width: "-webkit-fill-available" } }}
                            />
                            <div /*style={{ width: "90%" }}*/>
                                {/* <FCGoogleMap parent={"FCStoreDetails"} /> */}
                            </div>
                            <div style={{
                                //width: "300px",
                                height: "250px",
                                margin: "10px",
                            }}
                            >
                                <FCGoogleMap parent={"FCStoreDetails"} />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            {/* <Button autoFocus onClick={handleClose} color="primary">
                        Disagree
                    </Button> */}
                            <Button onClick={handleClose} color="primary" autoFocus>
                                Done
                    </Button>
                        </DialogActions>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}
