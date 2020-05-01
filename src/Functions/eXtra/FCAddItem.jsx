import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AddCircleOutlineRounded from '@material-ui/icons/AddCircleOutlineRounded';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
//import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import FCDiscount from '../Pages/Add_Form/FCDiscount';
import FCTags from '../Pages/Add_Form/FCTags';
import FCDescriptions from '../Pages/Add_Form/FCDescriptions';

export default function FCAddItem(props) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                <AddCircleOutlineRounded htmlColor="green" /> Add Product
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Add product"}</DialogTitle>
                <form>
                    <DialogContent>
                        <DialogContentText>
                            Product Details
                    </DialogContentText>
                        <div style={{ float: "left", maxWidth: 300 }}>
                            <Autocomplete
                                id="combo-box-category"
                                options={top100Films}
                                getOptionLabel={(option) => option.title}
                                renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                            />
                            <TextField label={"New Category"} style={{ maxWidth: 300, float: "left" }} />
                        </div>
                        <div style={{ float: "left", maxWidth: 300 }}>
                            <Autocomplete
                                id="combo-box-sub-category"
                                options={top100Films}
                                getOptionLabel={(option) => option.title}
                                renderInput={(list) => <TextField {...list} label="Sub Category" variant="outlined" />}
                            />
                            <TextField label="New Sub Category" style={{ maxWidth: 300, float: "left" }} />
                        </div>
                        <br style={{ clear: "both" }} /><br style={{ clear: "both" }} />
                        <div style={{ float: "left" }}>
                            <TextField label="Product Name" variant="outlined"
                                InputProps={{ style: { width: "400px" } }} />
                        </div>
                        <br style={{ clear: "both" }} /><br style={{ clear: "both" }} />
                        <div style={{ float: "left" }} >
                            <TextField label="BarCode" type="number" variant="outlined" />
                        </div>
                        <div style={{ float: "left" }}>
                            <FCDiscount />
                        </div>
                        <div>
                            <FCTags />
                            <FCDescriptions />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Disagree
                         </Button>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },

];