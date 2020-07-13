import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FCCheckBox2Compare from './FCCheckBox2Compare'
import { useState } from 'react';
import { Chip, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    margin: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"

  },
  mediaReceipt: {
    //height: 0,
    //paddingTop: '56.25%', // 16:9
    //boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    //width: "100%",
    //height: "auto"
  },
  receipt: {
    //padding: "100% 0px",
    //width:"100%",
    //backgroundSize: "100% 100%",
    //overflow: "unset",
    //boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const MyCheckbox = withStyles({
  root: {
    color: "#fcaf17",//green[400],
    '&$checked': {
      color: "#fcaf17"//green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export default function FCCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [color, setColor] = useState(false);
  const [check, setCheck] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleLike = () => {
    console.log(props.item.Item_id);
    setColor(!color);
  }
  const handleCheck = (checked) => {
    props.hadleCompareList(checked, props.item)
    setCheck(!check);
  }
  //useEffect(() => {
  //console.log(props.item);
  //}, [props.check])
  let priceTitle = () => {
    let defauldPrice = props.item.Price + "$";
    if (props.item.Discount_dollar > 0 || props.item.Discount_percent > 0) {
      return <><span style={{ textDecorationLine: "line-through" }}>{defauldPrice}</span>&#160;&nbsp;&nbsp;&nbsp;{`${((props.item.Price - props.item.Discount_dollar) * (1 - props.item.Discount_percent / 100))}$`}</>;
    } else {
      return defauldPrice;
    }
  }
  return (
    <Card className={classes.card} >
      <CardHeader
        //avatar={props.compare ? <FCCheckBox2Compare onChange={(check) => props.hadleCompareList(check,props.item)}></FCCheckBox2Compare> : null}
        avatar={props.compare &&
          <FormControlLabel
            control={
              <MyCheckbox
                onChange={(event) => handleCheck(event.target.checked)}
                //value={check}
                checked={check}
              />
            }
            label="Compare"
          />
        }

        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={props.item.Item_title}
        subheader={priceTitle()}
      //subheader={"After discounts: " + ((props.item.Price - props.item.Discount_dollar) * (1 - props.item.Discount_percent / 100)) + "$"}
      />
      <CardMedia
        className={classes.media}
        image={props.item.Item_image}
      />
      <CardContent>
        {props.item.Tags.map(tag => {
          return <Chip label={tag.Tag_title} variant="outlined" key={tag.Tag_id} />
        })}
        {/* <Typography variant="body2" color="textSecondary" component="p">

          {props.item.Tags.map(tag => {
            return <Chip label={tag.Tag_title} variant="outlined" key={tag.Tag_id} />
          })}
        </Typography> */}

      </CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        {props.item.Item_Description}
      </Typography>
      <CardActions disableSpacing>
        <IconButton
          onClick={handleLike}
          aria-label="add to favorites"
          color={color ? 'secondary' : 'default'}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          onClick={() => setShowReceipt(true)}
          aria-label="Show Receipt"
          color={color ? 'secondary' : 'default'}
        >
          <ReceiptIcon />
        </IconButton>
        <Dialog
          open={showReceipt}
          className={classes.receipt}
          onClose={() => setShowReceipt(false)}
        >
          <DialogTitle id="alert-dialog-title">{"Receipt"}</DialogTitle>
          <img
            style={{
              //maxInlineSize: "-webkit-fill-available"
              //maxWidth: "-webkit-fill-available",
            }}
            src={props.item.Receipt_image}
            alt="receipt image" />
          {/* <DialogContent style={{ overflow: "unset" }}>
            <DialogContentText>{props.item.Receipt_description}</DialogContentText>
            <CardMedia
              className={classes.mediaReceipt}
              image={props.item.Receipt_image}
            />
           
          </DialogContent> */}
          <DialogActions>
            <Button onClick={() => setShowReceipt(false)} color="primary" autoFocus>
              Close
          </Button>
          </DialogActions>

        </Dialog>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {props.item.Store_name}
          </Typography>
          <Typography>
            {Number((props.item.Distance).toFixed(2))} km
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
