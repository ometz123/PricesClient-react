import React, { useEffect, /*useContext*/ }/*, { Children }*/ from 'react';
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
//import FCGoogleMap from './FCGoogleMap';
//import { SearchContext } from '../../../Contexts/SearchContext';

export default function FCStoreDetails() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    //const { search, SetNewSearch } = useContext(SearchContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        // navigator.geolocation.getCurrentPosition((position) => {
        //     //console.log(position);
        //     //console.log("Latitude is :", position.coords.latitude);
        //     //console.log("Longitude is :", position.coords.longitude);
        //     SetNewSearch({ ...search, userLocation: position ? position.coords : null });
        // });
    })
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
                <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Store Details
                    </DialogContentText>
                    <FCGooglePlacesSearch />
                    {/* <FCGoogleMap /> */}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
