import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { SearchContext } from '../../Contexts/SearchContext';

const useStyles = makeStyles({
  root: {
    //width: 300,
    margin: "0px 10%",
  },
});

function valuetext(value) {
  return `${value}$`;
}

export default function FCSlider(props) {
  const classes = useStyles();
  //const [range, setValue] = React.useState([20, 30]);
  //const [distance, setDistance] = React.useState([20]);
  const { search, setSearch } = React.useContext(SearchContext);

  const handlePriceRangeChange = (event, newValue) => {
    setSearch({
      ...search,
      minPrice: newValue[0],
      maxPrice: newValue[1]
    });

    //setValue(newValue);
    //props.handlePriceRange(newValue);
  };
  const handleDistanceChange = (e, newdistance) => {
    //setDistance(newdistance);
    setSearch({
      ...search, distance: newdistance
    });


    //props.handleDistance(newdistance);
  }
  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Maximum Distance {search.distance} km.

      </Typography>
      <Slider
        value={search.distance}
        onChange={handleDistanceChange}
      />
      <Typography id="range-slider" gutterBottom>
        Price range {search.minPrice}- {search.maxPrice} $
      </Typography>
      <Slider
        value={[search.minPrice,search.maxPrice]}

        onChange={handlePriceRangeChange}
        //valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
