import React, { useContext, useState/*,useEffect*/ } from 'react';
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
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
//import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
//import FCTags from '../Pages/Add_Form/FCTags';
import Chip from '@material-ui/core/Chip';
//import FCDescriptions from '../Pages/Add_Form/FCDescriptions';
import { ReceiptContext } from '../../Contexts/ReceiptContext';
import FCImage from '../Pages/Add_Form/FCImage';
import { ListsContext } from '../../Contexts/ListsContext';
import { useEffect } from 'react';

export default function FCAddItem(props) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const filter = createFilterOptions();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const { receipt, SetReceipt } = useContext(ReceiptContext);
    const {tags,FetchTags,categories,FetchCategories,subCategories,FetchSubCategories} = useContext(ListsContext)
    const [tempItem, setTempItem] = useState({
        id: "",
        category: { id: 0, title: "" },
        subCategory: { id: 0, title: "" },
        itemName: "",
        barcode: "",
        image: { preview: "", raw: "" },
        discoundDollar: 0,
        discountPercent: 0,
        tags: [],
        itemDescription: "",
        price: ""
    })
    const handleClickOpen = () => {
        setOpen(true);
        setTempItem({ ...tempItem, id: new Date().valueOf() });

    };
    const handleClose = () => {
        if (tempItem.price !== '') {
            for (let i = 0; i < tempItem.tags.length; i++) {
                if (tempItem.tags[i].inputValue !== undefined) {
                    tempItem.tags[i] = { title: tempItem.tags[i].inputValue }
                }
            }
            SetReceipt({ ...receipt, items: [...receipt.items, tempItem] });
        }
        setOpen(false);
    };
    const handleCategoryChange = (category) => {
        console.log("category: ",category);
        
        if (category) {
            let newCategory = { title: "" };
            newCategory = { title: category.inputValue };
            setTempItem({ ...tempItem, category: newCategory });
        } else {
            setTempItem({ ...tempItem, category: category });
        }
    }
    const handleSubCategoryChange = (subCategory) => {
        if (subCategory) {
            let newSubCategory = { title: "" };
            newSubCategory = { title: subCategory.inputValue };
            setTempItem({ ...tempItem, subCategory: newSubCategory });
        } else {
            setTempItem({ ...tempItem, subCategory: subCategory });
        }
    }
    const handleItemImage = (e) => {
        setTempItem({
            ...tempItem, image: {
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            }
        });
    }
    const handleItemNameChange = (itemName) => {
        setTempItem({ ...tempItem, itemName: itemName });
    }
    const handleBarcode = (barcode) => {
        //let bamba = `7290000066318`;
        let corsAnywhere = `https://cors-anywhere.herokuapp.com/`;
        let api = 'https://api.upcitemdb.com/prod/trial/lookup?upc=';
        //let request = new Request('https://api.upcitemdb.com/prod/trial/lookup?upc=7290000066318');
        //let randomUser = new Request(`https://api.randomuser.me/?results=5`);
        //let params = [`UPC`, `ISBN`, `EAN`];
        console.log("Start fetch");
        setTempItem({ ...tempItem, barcode: barcode });

        //#region 
        fetch(corsAnywhere + api + barcode, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
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

        //#endregion
        console.log("End fetch");

    }
    const handleItemPriceChange = (itemPrice) => {
        setTempItem({ ...tempItem, price: itemPrice });
    }
    const handleItemDollarDiscountChange = (dollar) => {
        setTempItem({ ...tempItem, discoundDollar: dollar });
    }
    const handleItemPercentDiscountChange = (percent) => {
        setTempItem({ ...tempItem, discountPercent: percent });
    }
    const handleItemDescriptionChange = (description) => {
        setTempItem({ ...tempItem, itemDescription: description });
    }
    const handleTagsChange = (tags) => {
        console.log("tags: ", tags);
        setTempItem({ ...tempItem, tags: tags });
    }
    useEffect(()=>{
        FetchTags();
        FetchCategories();
        FetchSubCategories();
    },[])

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                <AddCircleOutlineRounded htmlColor="green" /> Add Item
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Add Item"}</DialogTitle>
                <div>
                    <DialogContent>
                        <DialogContentText>
                            Item Details
                    </DialogContentText>
                        <FCImage parent={"Item"} onItemImageChange={(e) => handleItemImage(e)} />
                        <div style={{ float: "left", width: "300px" /*maxWidth: 300*/ }}>
                            <Autocomplete
                                id="combo-box-category"
                                options={categories}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);
                                    // Suggest the creation of a new value
                                    if (params.inputValue !== '') {
                                        filtered.push({
                                            inputValue: params.inputValue,
                                            Category_title: `New Category: "${params.inputValue}"`,
                                        });
                                    }
                                    console.log("filteredC: ", filtered);
                                    return filtered;
                                }}
                                onChange={(e, category) => handleCategoryChange(category)}
                                getOptionLabel={(option) => option.Category_title}
                                renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                            />
                        </div>
                        <div style={{ float: "left", width: "300px" /*maxWidth: 300*/ }}>
                            <Autocomplete
                                id="combo-box-sub-category"
                                options={subCategories}
                                onChange={(e, category) => handleSubCategoryChange(category)}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);
                                    // Suggest the creation of a new value
                                    if (params.inputValue !== '') {
                                        filtered.push({
                                            inputValue: params.inputValue,
                                            Sub_category_title: `New Sub Category: "${params.inputValue}"`,
                                        });
                                    }
                                    console.log("filteredSC: ",filtered);
                                    
                                    return filtered;
                                }}
                                getOptionLabel={(option) => option.Sub_category_title}
                                renderInput={(list) => <TextField {...list} label="Sub Category" variant="outlined" />}
                            />
                        </div>
                        <br style={{ clear: "both" }} /><br style={{ clear: "both" }} />
                        <div style={{ float: "left" }}>
                            <TextField
                                label="Item Name"
                                onChange={e => handleItemNameChange(e.target.value)}
                                variant="outlined"
                                InputProps={{ style: { width: "400px" } }} />
                            <TextField
                                label="Item Price"
                                onChange={e => handleItemPriceChange(e.target.value)}
                                variant="outlined"
                                InputProps={{ style: { width: "400px" } }}
                                type="number" />
                        </div>
                        <br style={{ clear: "both" }} /><br style={{ clear: "both" }} />
                        <div style={{ float: "left" }} >
                            <TextField
                                label="BarCode"
                                onChange={e => handleBarcode(e.target.value)}
                                type="number"
                                variant="outlined"
                            />
                        </div>
                        <div style={{ float: "left" }}>
                            {/* <FCItemDiscount
                                handleItemDiscountChange={handleItemDiscountChange}
                            /> */}
                            <TextField
                                id="standard-basic-Dollar"
                                label="$ Discount"
                                //color="primary"
                                //value={receipt.discoundDollar}
                                onChange={(e) => handleItemDollarDiscountChange(e.target.value)}
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: props.color ? props.color : null },
                                }}
                                InputProps={{
                                    style: {
                                        color: props.color ? props.color : null
                                    },
                                    //disableUnderline: "true",
                                    minimum: "0", max: "10", step: "1"
                                }}
                                type="number"
                            />
                            <br />
                            <TextField
                                id="standard-basic-percent"
                                label="% Discount"
                                variant="outlined"
                                //value={receipt.discountPercent}
                                onChange={(e) => handleItemPercentDiscountChange(e.target.value)}
                                color="primary"
                                InputLabelProps={{
                                    style: { color: props.color ? props.color : null }
                                }}
                                InputProps={{
                                    style: {
                                        color: props.color ? props.color : null
                                    },
                                }}
                                type="number"
                            />
                        </div>
                        <div>
                            <Autocomplete
                                multiple
                                id="fixed-tags-demo"
                                options={tags}
                                getOptionLabel={(option) => option.Tag_title}
                                onChange={(e, tags) => handleTagsChange(tags)}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);
                                    // Suggest the creation of a new value
                                    if (params.inputValue !== '') {
                                        filtered.push({
                                            inputValue: params.inputValue,
                                            Tag_title: `New Tag: "${params.inputValue}"`,
                                        });
                                    }
                                    //console.log("filtered: ", filtered);
                                    return filtered;
                                }}
                                //defaultValue={[top100Films[6], top100Films[13]]}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            label={option.Tag_title}
                                            {...getTagProps({ index })}
                                        //disabled={index === 0}
                                        />
                                    ))
                                }
                                style={{ maxWidth: 400 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Tags" variant="outlined" placeholder="Tags" />
                                )}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Description:"
                                multiline
                                rows="4"
                                //value={receipt.receiptDescription}
                                onChange={e => handleItemDescriptionChange(e.target.value)}
                                //defaultValue="Default Value"
                                variant="outlined"
                                //color="white"
                                inputProps={{
                                    style: { color: props.color ? props.color : null }
                                }

                                }
                                InputLabelProps={{
                                    style: { color: props.color ? props.color : null }
                                }}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        {/* <Button autoFocus onClick={handleClose} color="primary">
                            Disagree
                         </Button> */}
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Add
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}

