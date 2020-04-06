import React, { useState } from "react";
import { DatePicker } from "@material-ui/pickers";
//import lightBlue from "@material-ui/core/colors/lightBlue";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { purple } from '@material-ui/core/colors';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
//#region Commented out Styles 

// const materialTheme = createMuiTheme({
//     overrides: {
//         MuiPickersToolbar: {
//             toolbar: {
//                 backgroundColor: lightBlue.A200,
//             },
//         },
//         MuiPickersCalendarHeader: {
//             switchHeader: {
//                 // backgroundColor: lightBlue.A200,
//                 // color: "white",
//             },
//         },
//         MuiPickersDay: {
//             day: {
//                 color: lightBlue.A700,
//             },
//             daySelected: {
//                 backgroundColor: lightBlue["400"],
//             },
//             dayDisabled: {
//                 color: lightBlue["100"],
//             },
//             current: {
//                 color: lightBlue["900"],
//             },
//         },
//         MuiPickersModal: {
//             dialogAction: {
//                 color: lightBlue["400"],
//             },
//         },
//     },
// });
//#endregion

const theme = createMuiTheme({
    overrides: {
        palette: {
            primary: {
                // Purple and green play nicely together.
                main: purple[50],
            },
            secondary: {
                // This is green.A700 as hex.
                main: '#11cb5f',
            },
        },
        datePicker: {
            color: '#fff',
            // textColor: palette.alternateTextColor,
            // calendarTextColor: palette.textColor,
            // selectColor: palette.primary2Color,
            // selectTextColor: palette.alternateTextColor,
            // calendarYearBackgroundColor: palette.canvasColor,
            // headerColor: palette.pickerHeaderColor || palette.primary1Color,
        },
    }
});

function BasicDatePicker(props) {
    const [selectedDate, handleDateChange] = useState(new Date());
    //const [selectedDate, handleDateChange] = useState(null);
    return (

        <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <ThemeProvider theme={theme}>
                <DatePicker
                    autoOk
                    label="Receipt Date"
                    //clearable
                    disableFuture
                    //variant="outlined"
                    value={selectedDate}
                    onChange={handleDateChange}
                    margin="normal"
                    InputLabelProps={{
                        style: { color: '#fff' },
                    }}
                    InputProps={{
                        style: {
                            color: '#fff',
                        }
                        //disableUnderline: "true"
                    }}
                />
            </ThemeProvider >
        </MuiPickersUtilsProvider>
    );
}

export default BasicDatePicker;