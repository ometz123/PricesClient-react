import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}$`;
}

export default function FCSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState([20, 30]);
  const [distance, setDistance] = React.useState([20]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
const handleDistance=(e, newdistance)=>{
    setDistance(newdistance)
}
  return (
    <div className={classes.root}>
        <Typography id="range-slider" gutterBottom>
        Distance
      </Typography>
      <Slider
      value={distance}
      onChange={handleDistance}
      />
      <Typography id="range-slider" gutterBottom>
        Price range
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
