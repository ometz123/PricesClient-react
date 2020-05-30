import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}
const autocompleteService = { current: null };
const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));
export default function FCGooglePlacesSearch(props) {
  const inDevelop = false;
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);
  const myGoogleKey = `AIzaSyC47_J_bDoU4euesrr-ChlFjRpas0HzLQM`;

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${myGoogleKey}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const handleChange = (event) => {
    //console.log("event:", event);

    setInputValue(event.target.value);
    //console.log("event: ",event.target);

  };
  const handleLocationChange = (e) => {
    //console.log("e[1].place_id: ", e[1].place_id);
    let place_id = e[1].place_id;
    //console.log("e: ", e);
    // const { latLng } = e;
    // const lat = latLng.lat();
    // const lng = latLng.lng();
    if (true) {
      console.log("start fetch from google");
      let api = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${myGoogleKey}`;
      //let corsAnywhere = `https://cors-anywhere.herokuapp.com/`;
      console.log("api: ", api);
      
      fetch(api, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          // 'Accept':'*/*',
          // 'Accept-Encoding':'gzip, deflate, br',
          // 'Connection':'keep-alive',
        })
        //, mode: `no-cors`,
      })
        .then(res => {
          console.log('res=', res);
          console.log('res.status', res.status);
          console.log('res.ok', res.ok);
          return res.json()
        })
        .then(
          (result) => {
            console.log("fetch FetchGet= ", result);
          },
          (error) => {
            console.log("err post=", error);
          });
      console.log("end fetch");

    }
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);
  if (!inDevelop) {
    return (

      <Autocomplete
        id="google-map-demo"
        style={{ width: 300 }}
        onChange={(...e) => handleLocationChange(e)}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search a store/address.."
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        )}
        renderOption={(option) => {
          const matches = option.structured_formatting.main_text_matched_substrings;
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => [match.offset, match.offset + match.length]),
          );

          return (
            <Grid container alignItems="center">
              <Grid item>
                <LocationOnIcon className={classes.icon} />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="textSecondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      />
    );
  }
  else {
    return (
      <div>
        AutoComplete is in developing...
      </div>
    );
  }
}
