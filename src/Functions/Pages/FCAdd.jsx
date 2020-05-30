import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FCImage from './Add_Form/FCImage';
import { Button, /*FormControl*/ } from '@material-ui/core';
import FCDatePicker from './Add_Form/FCDatePicker';
import '../../Styles/mysass.scss';
// import DateFnsUtils from '@date-io/date-fns';
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
//import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import FCDiscount from './Add_Form/FCReceiptDiscount';
import FCDescriptions from './Add_Form/FCDescriptions';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import FCStoreDetails from './Add_Form/FCStoreDetails';
import FCAddItem from '../eXtra/FCAddItem';
import FCList from '../eXtra/FCList';
import { ReceiptContext } from '../../Contexts/ReceiptContext';
//import FCGooglePlacesSearch from './Add_Form/FCGooglePlacesSearch';

const useStyles = makeStyles((theme) => ({
    table: {
        maxHeight: `300px`,
    },
    demo: {
        color: "white",
        maxHeight: `300px`,
        maxWidth: `300px`,
        overflow: "overlay",
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

function FCAdd(props) {
    const classes = useStyles();
    const { receipt } = useContext(ReceiptContext);

    const handleSubmit = (event) => {
        console.log("receipt: ", receipt);
        let api = `https://localhost:44377/api/receipts`;

        fetch(api ,{
            method: 'POST',
            body: JSON.stringify(receipt),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        }).then(res => {
            return res.json();
        })
        .then(
            (result) => {
                console.log("fetch FetchGet= ", result);
            },
            (error) => {
                console.log("err post=", error);
            });
    };

    return (
        <div>
            <div className={classes.table} >
                <div >
                    <div style={{ float: 'left', width: "250px", }}>
                        <FCImage />
                    </div>
                    <div style={{ float: 'right', width: "250px", }} >
                        <FCDatePicker />
                        <AnnouncementOutlinedIcon htmlColor="red" />
                    </div>
                </div>
                <br style={{ clear: "both" }} />
                <div >
                    <div
                        style={{ height: "100px", width: "250px", float: 'left' }}>
                        <FCStoreDetails />
                        {/* <FCGooglePlacesSearch/> */}
                    </div>
                    <div style={{ float: 'right', width: "250px", }} >
                        <FCDiscount color={"white"} />
                    </div>
                </div>
                <br style={{ clear: "both" }} />
                <div>
                    <div style={{ float: 'left', width: "250px", }}>
                        <FCAddItem />
                    </div>
                    <div style={{ float: 'right' }}>
                        <FCList />
                    </div>
                </div>
                <div >
                    <FCDescriptions color={"white"} />
                </div>

                <div >
                    <Button
                        //type="submit"
                        //fullWidth
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                    //className={classes.submit}
                    >
                        <CheckCircleOutlineIcon />
                    </Button>

                </div>
                <div style={{ float: "left" }}>
                    <AnnouncementOutlinedIcon htmlColor="red" /> required
                </div>
            </div>
            <br />
        </div >
    );
}

//export default withRouter(FCAdd);
export default FCAdd;