import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function FCDescriptions(props) {
    const classes = useStyles();
    const [value/*, setValue*/] = React.useState();

    // const handleChange = (event) => {
    //     setValue(event.target.value);
    // };

    return (
        <div className={classes.root} noValidate autoComplete="off">
            <TextField
                id="outlined-multiline-static"
                label="Description:"
                multiline
                rows="4"
                value={value}
                //defaultValue="Default Value"
                variant="outlined"
                //color="white"
                inputProps={{
                    style: { color: props.color?props.color:null }
                }

                }
                InputLabelProps={{
                    style: { color: props.color?props.color:null }
                }}
            />
        </div>
    );
}