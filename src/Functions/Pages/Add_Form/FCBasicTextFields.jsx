import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            //width: '25ch',
        },
    },
}));

export default function BasicTextFields(props) {
    const classes = useStyles();

    return (
        <div className={classes.root} noValidate autoComplete="off">
            <TextField
                id="standard-basic-Dollar"
                label="$ Discount"
                //color="primary"
                variant="outlined"
                InputLabelProps={{
                    style: { color: props.color ? props.color : null },
                }}
                InputProps={{
                    style: {
                        color: props.color ? props.color : null
                    },
                    //disableUnderline: "true",
                    minimum: "0", max: "10", step: "1"

                }}
                type="number"

            />
            <br />
            <TextField
                id="standard-basic-percent"
                label="% Discount"
                variant="outlined"
                color="primary"
                InputLabelProps={{
                    style: { color: props.color ? props.color : null }
                }}
                InputProps={{
                    style: {
                        color: props.color ? props.color : null},
                }}
                type="number"
            />
        </div>
    );
}
