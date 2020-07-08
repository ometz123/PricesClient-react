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
import { UserContext } from '../../Contexts/UserContext';
import { SearchContext } from '../../Contexts/SearchContext';
import { useEffect } from 'react';

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
    const { receipt, SetReceipt } = useContext(ReceiptContext);
    const { user } = useContext(UserContext);
    const { search } = useContext(SearchContext);
    let local = true;
    let http = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/`;
    if (local) {
        http = `https://localhost:44377/api/`;
    }

    const handleSubmit = (event) => {
        console.log("receipt: ", receipt);

        if (window.confirm("ready to share your prices?")) {
            console.log("receipt: ", receipt);
            //let api = `https://localhost:44377/api/receipts`
            let api = http + `receipts`;
            let Receipt = {
                Date: receipt.date,
                User_id: user.userId,
                Receipt_Description: receipt.receiptDescription,
                Discount_dollar: receipt.discoundDollar,
                Discount_percent: receipt.discountPercent,
                Items: [],
                Store: {
                    Store_name: receipt.store.name,
                    Lat: search.lat,
                    Lon: search.lng
                },
                Receipt_image: receipt.image.base64
            }
            for (let i = 0; i < receipt.items.length; i++) {
                Receipt.Items[i] = {
                    Item_title: receipt.items[i].itemName,
                    Category: {
                        Category_title: receipt.items[i].category.title,
                        Category_id: receipt.items[i].category.id
                    },
                    Sub_category: {
                        Sub_category_title: receipt.items[i].subCategory.title,
                        Sub_category_id: receipt.items[i].subCategory.id
                    },
                    Price: receipt.items[i].price,
                    Discount_dollar: receipt.items[i].discoundDollar,
                    Discount_percent: receipt.items[i].discountPercent,
                    Item_Description: receipt.items[i].itemDescription,
                    tags: [],
                    //Item_image: receipt.items[i].image.base64==="src"?receipt.items[i].image.preview:receipt.items[i].image.base64,
                    Item_image: receipt.items[i].Id_type==="src"?receipt.items[i].image.preview:receipt.items[i].image.base64,
                    Barcode: receipt.items[i].barcode,
                    Id_type: receipt.items[i].Id_type//to check where details are from: upcitemdb or original
                }
                for (let j = 0; j < receipt.items[i].tags.length; j++) {
                    if (receipt.items[i].tags[j].id == undefined) {
                        Receipt.Items[i].tags[j] = {
                            //Tag_id: receipt.items[i].tags[j].id,
                            Tag_title: receipt.items[i].tags[j].title
                        }
                    } else {
                        Receipt.Items[i].tags[j] = {
                            Tag_id: receipt.items[i].tags[j].id,
                            //Tag_title: receipt.items[i].tags[j].title
                        }
                    }
                }

            }
            console.log(Receipt);

            if (true) {
                fetch(api, {
                    method: 'POST',
                    body: JSON.stringify(Receipt),
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                    })
                }).then(res => {
                    return res.json();
                })
                    .then(
                        (result) => {
                            console.log("fetch FetchGet= ", result);
                            alert("Thanks for sharing the prices! \nA senior user will verify the correctness of the data")
                        },
                        (error) => {
                            console.log("err post=", error);
                            alert("Error sharing the prices. \nPlease try again later")
                        });
            };
        }

    }
    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <div>
            <div className={classes.table} >
                <div >
                    <div style={{ float: 'left', width: "250px", }}>
                        <FCImage parent={"Receipt"} key={"item"} />
                    </div>
                    <div style={{ float: 'right', width: "250px", }} >
                        <FCDatePicker
                            title={"Receipt Date"}
                            onDateChange={(e) => SetReceipt({ ...receipt, date: e })}
                        />
                        {/* <AnnouncementOutlinedIcon htmlColor="red" /> */}
                        <FCDiscount color={"white"} />
                    </div>
                </div>
                <br style={{ clear: "both" }} />
                <div >
                    <div style={{ /*height: "100px",*/ width: "250px", float: 'left' }}>
                        <FCStoreDetails />
                        {receipt.store.name}
                        <br />
                        <div >
                            <FCDescriptions color={"white"} />
                        </div>

                    </div>
                    <div style={{ float: 'right' }}>
                        <FCAddItem />
                        <FCList />
                    </div>
                </div>
                <br style={{ clear: "both" }} />
                <div>

                    <div style={{ float: "left" }}>
                        <AnnouncementOutlinedIcon color="secondary" /> required
                </div>
                    {/* <br style={{ clear: "both" }} /> */}
                    <div style={{/* clear: "both",*/ float: "right" }}>
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

                </div>
                
            </div>
        </div >
    );
}

//export default withRouter(FCAdd);
export default FCAdd;