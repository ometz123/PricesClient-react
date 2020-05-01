import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import FCMenu from '../Pages/FCMenu';
import { useState } from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
//
import FCSearch from '../Pages/FCSearch';
import { Switch, Route, withRouter } from 'react-router-dom';
import FCExplore from '../Pages/FCExplore';
import '../../Styles/mysass.scss';
import Bamba from '../../Images/Bamba.png';
import Doritos from '../../Images/Doritos.png';
import OreoIceCream from '../../Images/OreoIceCream.png';
import Receipt from '../../Images/Receipt.png';
import AddIcon from '@material-ui/icons/Add';
import FCAdd from '../Pages/FCAdd';
import ExploreIcon from '@material-ui/icons/Explore';
//

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    //position: "fixed",
    //top: "0px",
    //zIndex: 999,
    //width: 500
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function FCTopBar(props) {
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
  const [title, setTitle] = useState("Prices")
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
const handleRoute=(route)=>{
   props.history.push({ pathname: "/"+route })
   handleMobileMenuClose();
}
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={()=>handleRoute("add")}>
        <IconButton aria-label="add new receipt" color="inherit" >
            <AddIcon />
        </IconButton>
        <p>Add Receipt</p>
      </MenuItem>
      <MenuItem onClick={()=>handleRoute("")}>
        <IconButton aria-label="explore items" color="inherit">
            <ExploreIcon />
        </IconButton>
        <p>Explore</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static"
        style={{
          position: "fixed",
            top: "0px",
          width: "100%",
          zIndex: 999,
        }}>
        <Toolbar>
          <FCMenu />
          <Typography className={classes.title} variant="h6" noWrap>
            {title}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onClick={()=>handleRoute("search")}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => handleRoute("add")}
              color="inherit"
            >
              <AddIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => props.history.push({ pathname: "/search" })}
              color="inherit"
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => props.history.push({ pathname: "/" })}
              color="inherit"
            >
              <ExploreIcon />
            </IconButton>
            {/* <IconButton aria-label="Add your's" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <AddBoxIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show new mails" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div 
      style={{
        paddingTop: "65px"
      }}
      >
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
      </div>
    </div>
  );
}
export default withRouter(FCTopBar);