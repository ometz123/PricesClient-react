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

export default function FCSlider(props) {
  const classes = useStyles();
  const [range, setValue] = React.useState([20, 30]);
  const [distance, setDistance] = React.useState([20]);

  const handlePriceRangeChange = (event, newValue) => {
    setValue(newValue);
    props.handlePriceRange(newValue);
  };
const handleDistanceChange=(e, newdistance)=>{
    setDistance(newdistance);
    props.handleDistance(newdistance);
}
  return (
    <div className={classes.root}>
        <Typography id="range-slider" gutterBottom>
        Maximum Distance {distance} km.
      </Typography>
      <Slider
      value={distance}
      onChange={handleDistanceChange}
      />
      <Typography id="range-slider" gutterBottom>
        Price range {range[0]}-{range[1]}
      </Typography>
      <Slider
        value={range}
        onChange={handlePriceRangeChange}
        //valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
