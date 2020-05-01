import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ExploreIcon from '@material-ui/icons/Explore';
import SearchIcon from '@material-ui/icons/Search';
import FCSearch from '../Pages/FCSearch';
import { Switch, Route, withRouter } from 'react-router-dom';
import FCExplore from '../Pages/FCExplore';
import '../../Styles/mysass.scss';
import Bamba from '../../Images/Bamba.png';
import Doritos from '../../Images/Doritos.png';
import OreoIceCream from '../../Images/OreoIceCream.png';
import Receipt from '../../Images/Receipt.png';
import FCTopBar from './FCTopBar';
import AddIcon from '@material-ui/icons/Add';
import FCAdd from '../Pages/FCAdd';


const useStyles = makeStyles({
  root: {
    width: 500,
    zIndex: 999,
    display: "block",
  },
});

function FCBottomNavigation(props) {
  let filteredList = [
    {
      id: 1, title: "Bamba", price: 100, discount: 0, image: Bamba, store: "Moshe's Pitzutzia", receipt: Receipt,
      description: {
        top: `Bamba is a baked snack containing 50% peanuts,
                    enriched in vitamins and iron and free of preservatives and food coloring.`,
        middle: `Due to its uniqueness – soft yet crispy, savory yet sweet – Bamba is loved by Israelis of all ages.
                    Bamba is the bestselling snack in Israel, accounting for close to a quarter of the snacks market.`,
        bottom: `90% of Israeli households buy Bamba regularly and every day 1 million bags of Bamba are produced.        
                    Bamba was first produced in 1964 with a cheese flavor and in 1966 the cheese flavor was replaced in favor of peanut butter – 
                    the winning flavor that has made Bamba part of Israeli culture.`,

      }
    },
    {
      title: "Doritos", price: 200, id: 2, image: Doritos, store: "Haim's Pitzutzia", receipt: Receipt,
      description: {
        top: `"Some things simply go best with the guys" At Doritos, we believe that your very best friends are much more than just friends.`,
        middle: `They are the ones who make up the experiences, memories and moments that stay with you for life,
         the ones that leave you hungry for more long after they're gone.
          Because between us, the things you'll remember in life aren't the exams or the math lessons, but that time when you were sitting on the fence,
           eating Sweet 'N Sour Doritos and telling jokes for hours.`,
        bottom: `Or that day in summer when it was soooo hot you all had absolutely no choice but to cut history class
        and go hang out on the beach with a bag of Flaming Hot Doritos. Like a snuggle rug in winter,
         ketchup on fries or a song by Britney at a great party, Doritos is that little extra "crunch"
          that hits the spot every time you meet up with the guys, making each get-together perfect.
           No matter if it's summer or winter, if you're home or out or if the music is the coolest or sucks,
            all you need is a bag of Doritos and your very best friends, and it'll turn into that kind of evening you'll never forget…`,
      }
    },
    {
      title: "Oreo Ice Cream", price: 300, id: 3, image: OreoIceCream, store: "Dani's Pitzutzia", receipt: Receipt,
      description: {
        top: ``,
        middle: ``,
        bottom: ``,
      }
    }];
  const classes = useStyles();
  const [value, setValue] = React.useState('Explore');

  const handleChange = (event, newValue) => {
    setValue(newValue);

  };

  return (
    <div className={"scrollDiv"}>
      {/* <FCTopBar title={value}
        style={{
          position: "fixed",
          top: "0px",
          width: "100%"
        }} /> */}
      <Switch>
        <Route path="/add" >
          <FCAdd />
        </Route>
        <Route path="/search" >
          <FCSearch />
        </Route>
        <Route exact path="/">
          <FCExplore filteredList={filteredList} />
        </Route>
      </Switch>

      <BottomNavigation value={value} onChange={handleChange} className={classes.root}>

        <BottomNavigationAction label="Add" value="Add" icon={<AddIcon />}
          onClick={() => props.history.push({ pathname: "/add" })} />

        <BottomNavigationAction label="Search" value="Search" icon={<SearchIcon />}
          onClick={() => props.history.push({ pathname: "/search" })} />

        <BottomNavigationAction label="Explore" value="Explore" icon={<ExploreIcon />}
          onClick={() => props.history.push({ pathname: "/" })} />

      </BottomNavigation>


    </div >
  );
}
export default withRouter(FCBottomNavigation);