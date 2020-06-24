import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import { Chip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    margin: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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

export default function FCCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [color, SetColor] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleLike = () => {
    console.log(props.item.Item_id);
    SetColor(!color);
  }
  return (
    <Card className={classes.card} >
      <CardHeader
        avatar={props.compare ?
          <FCCheckBox2Compare></FCCheckBox2Compare> : null
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={props.item.Item_title}
        subheader={props.item.Price + "$"}
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
