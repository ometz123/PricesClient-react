import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import { useState } from "react";
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    //margin: theme.spacing(1)
  },
  // withoutLabel: {
  //   marginTop: theme.spacing(3)
  // },
  textField: {
    width: "25ch"
  },
  iconButtonText: {
    backgroundColor: "rgb(64, 128, 255)",// "#3f51b5",
    color: "white",
    borderRadius: '22%',
    marginRight: "-9"
  }
}));

export default function FCBarcode(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    //amount: "",
    barcode: "",
    //weight: "",
    //weightRange: "",
    //showPassword: false
  });

  const handleChange = prop => event => {//prop is sent threw the onclick, event is default
    setValues({ ...values, [prop]: event.target.value });//values[prop]=event.target.value
    props.onBarcodeChange(event);
  };

  return (
    <div className={classes.root}>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-barcode">
          Barcode <FormHelperText>UPC, ISBN or EAN</FormHelperText>
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-barcode"
          type={"number"}

          value={values.barcode}
          onChange={handleChange("barcode")}
          endAdornment={
            <InputAdornment position="end" variant="filled">
              <IconButton
                className={values.barcode ? classes.iconButtonText : classes.iconButton}
                disabled={!values.barcode}
                //aria-label="toggle password visibility"
                onClick={() => props.onIconClick(values.barcode)}
                edge="end"
                style={{ marginRight: "-10px" }}
              //color="primary"
              >
                <SearchTwoToneIcon />
              </IconButton>
            </InputAdornment>
          }
          label={"Barcode"}
        />
        {/* <FormHelperText></FormHelperText> */}
      </FormControl>
    </div>
  );
}
