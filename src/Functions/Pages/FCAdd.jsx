import React from 'react';
import FCImage from './Add_Form/FCImage';
import { Button, /*FormControl*/ } from '@material-ui/core';
import FCBasicDatePicker from './Add_Form/FCBasicDatePicker';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import FCBasicTextFields from './Add_Form/FCBasicTextFields';
import FCMultilineTextFields from './Add_Form/FCMultilineTextFields';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ResponsiveDialogStore from '../eXtra/FCResponsiveDialogStore';
import FCResponsiveDialogProduct from '../eXtra/FCResponsiveDialogProduct';

function FCAdd(props) {

    const handleSubmit = (event) => {

        console.log("good");

        event.preventDefault();
    };

    return (
        <div>
            <form onSubmit={handleSubmit} name="receipt" >
                <div >
                    <div style={{ float: 'left', width: "250px", }}>
                        <FCImage />
                    </div>
                    <div style={{ float: 'right', width: "250px", }} >
                        <FCBasicDatePicker /><AnnouncementOutlinedIcon htmlColor="red" />
                    </div>
                </div>
                <br style={{ clear: "both" }} />
                <div >
                    <div
                        style={{ height: "100px", width: "250px", float: 'left' }}>
                        <ResponsiveDialogStore />
                    </div>
                    <div style={{ float: 'right', width: "250px", }} >
                        <FCBasicTextFields />
                    </div>
                </div>
                <br style={{ clear: "both" }} />
                <div>
                    <div style={{ float: 'left', width: "250px", }}>
                        <FCResponsiveDialogProduct />
                    </div>
                    <div>
                        List Item 1
                    </div>
                </div>
                <div>
                    <FCMultilineTextFields />
                </div>

                <div >
                    <Button
                        type="submit"
                        //fullWidth
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
            </form>
            <br />
        </div >
    );
}

//export default withRouter(FCAdd);
export default FCAdd;