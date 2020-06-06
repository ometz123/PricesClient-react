import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
//import FormGroup from '@material-ui/core/FormGroup';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { ReceiptContext } from '../../Contexts/ReceiptContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    //backgroundColor: theme.palette.background.paper,
    color: "white",
    //secondaryColor:"white",
    maxHeight: `300px`,
    maxWidth: `300px`,
    overflow: "overlay",
    // secondary: {
    //   //color: 'white',
    // },
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));



export default function InteractiveList(props) {
  const classes = useStyles();
  const { receipt, SetReceipt } = useContext(ReceiptContext);

  const removeItem = (e, itemId) => {
    let items = receipt.items;
    let pos = items.map((item) => { return item.id; }).indexOf(itemId);
    console.log(pos);
    items.splice(pos, 1);

    SetReceipt({ ...receipt, items: items });

    // for (let i = 0; i < items.length; i++) {
    //   if (items[i].id === itemId) {
    //     items.splice(i, 1);
    //     SetReceipt({ ...receipt, items: items });
    //     break;
    //   }
    // }

    //SetReceipt({ ...receipt, items: receipt.items.splice(itemId, 1) });

  }
  let list = receipt.items.map((item) => {
    return (
      <div key={(item.id).toString()}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              {item.image.preview?<img src={item.image.preview} style={{maxHeight:50,maxWidth:50}}/>:<FolderIcon />}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.itemName ? item.itemName : "Error Name"}
            secondary={item.price}
          />
          <ListItemSecondaryAction
            onClick={(e) => { removeItem(e, item.id) }}>
            <IconButton edge="end" aria-label="delete">
              <DeleteOutlineIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    )
  })

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xl={12} >
          <Typography variant="h6" className={classes.title}>
            Items Added
          </Typography>
          <div className={classes.demo}>
            <List dense>
              {list}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
