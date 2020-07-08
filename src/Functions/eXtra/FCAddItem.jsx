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
import FCCard from './FCCard';
import FCApiCard from './FCApiCard';
import { IconButton, InputAdornment, OutlinedInput, InputLabel, Avatar } from '@material-ui/core';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import FCBarcode from './FCBarcode';
import { green, white } from '@material-ui/core/colors';

export default function FCAddItem(props) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const [tempBarcode, SetTempBarcode] = useState("");
    const filter = createFilterOptions();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const { receipt, SetReceipt } = useContext(ReceiptContext);
    const { tags, FetchTags, categories, FetchCategories, subCategories, FetchSubCategories } = useContext(ListsContext)
    const [itemsFromApi, SetItemsFromApi] = useState(null);
    const [selectedItemFromApi, setSelectedItemFromApi] = useState(null);
    const [apiMenu, SetApiMenu] = useState(false);
    const [useApiData, setUseApiData] = useState(false);
    const [url, setUrl] = useState("");
    const [tempItem, setTempItem] = useState({
        id: "",
        category: { id: 0, title: "" },
        subCategory: { id: 0, title: "" },
        itemName: "",
        barcode: "",
        image: { preview: "", raw: "", base64: "" },
        discoundDollar: 0,
        discountPercent: 0,
        tags: [],
        itemDescription: "",
        price: "",
        Id_type:"UserUser"
    })
    const handleClickOpen = () => {
        setOpen(true);
        setTempItem({
            id: "",
            category: { id: 0, title: "" },
            subCategory: { id: 0, title: "" },
            itemName: "",
            barcode: "",
            image: { preview: "", raw: "", base64: "" },
            discoundDollar: 0,
            discountPercent: 0,
            tags: [],
            itemDescription: "",
            price: "",
            Id_type:"UserUser"
        });

    };
    const handleClose = () => {
        console.log(tempItem);

        if (tempItem.price !== '') {
            for (let i = 0; i < tempItem.tags.length; i++) {
                if (tempItem.tags[i].inputValue !== undefined) {
                    tempItem.tags[i] = { title: tempItem.tags[i].inputValue }
                }
            }
            SetReceipt({ ...receipt, items: [...receipt.items, tempItem] });
        }
        setOpen(false);
        setUseApiData(false);
        setTempItem({
            id: "",
            category: { id: 0, title: "" },
            subCategory: { id: 0, title: "" },
            itemName: "",
            barcode: "",
            image: { preview: "", raw: "", base64: "" },
            discoundDollar: 0,
            discountPercent: 0,
            tags: [],
            itemDescription: "",
            price: ""
        })
        SetApiMenu(false);
    };
    const handleCancel = () => {
        setOpen(false);
        setUseApiData(false);
    }
    //#region  handleItemEvents
    useEffect(() => {
        console.log("From useEffect: ", tempItem.category)
    }, [tempItem])
    const handleCategoryChange = (category) => {
        console.log(1, category);

        if (category) {
            if (category.Category_id) {
                console.log("old: ", category);
                setTempItem({ ...tempItem, category: category });
            } else if (category.inputValue) {
                console.log("new: ", category);
                //let newCategory = { title: "" };
                //newCategory = { title: category.inputValue };
                //setTempItem({ ...tempItem, category: newCategory });
                setTempItem({ ...tempItem, category: { title: category.inputValue.trim() } });
            } else if (typeof category === "string") {
                console.log("new from api: ", category.trim());
                //let newCategory = { title: "" };
                let newCategory = { title: category.trim() };
                setTempItem({ ...tempItem, category: newCategory });
            }
        } else {
            console.log("clear: ", category);
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
    const handleItemImage = (imageSrc, base64) => {
        console.log(imageSrc);
        setTempItem({
            ...tempItem, image: {
                preview: tempItem.Id_type === "src" ? imageSrc : URL.createObjectURL(imageSrc),
                raw: imageSrc,
                base64: base64
            }
        })
        //base64 === "src" ? setUseApiData(true) : setUseApiData(false)
        setUrl(imageSrc);
        if (false) {

            if (base64 !== "src") {
                setUseApiData(false)
                setTempItem({
                    ...tempItem, image: {
                        preview: URL.createObjectURL(imageSrc),
                        raw: imageSrc,
                        base64: base64
                    }
                });
            } else {//image is src
                setUseApiData(true);
                setTempItem({
                    ...tempItem, image: {
                        preview: imageSrc,
                        raw: imageSrc,
                        base64: base64
                    }
                })
                setUrl(imageSrc);
            }
        }

    }
    const handleItemNameChange = (itemName) => {
        setTempItem({ ...tempItem, itemName: itemName });
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
        setSelectedItemFromApi({ ...selectedItemFromApi, description: description })
    }
    const handleTagsChange = (tags) => {
        console.log("tags: ", tags);
        setTempItem({ ...tempItem, tags: tags });
    }
    const handleBarcode = (barcode) => {
        //let bamba = `7290000066318`;
        //setUseApiData(false)
        //#region baltoro
        // const baltoro = {
        //     "code": "OK",
        //     "total": 1,
        //     "offset": 0,
        //     "items": [
        //         {
        //             "ean": "0844930088659",
        //             "title": "Gregory Mountain Products Men's Baltoro 75 Backpack, Shadow Black, Large",
        //             "description": "Know that feeling when it starts to get cold, you reach into your pack to pull out a puffy, and then you remember you left it at home because it didn't fit? No fun. Gregory's Baltoro 75 Backpack has over 4,500 cubic inches of gear-toting capacity to fit all the puffies, fleeces, and longjohns you need, so you can be seriously prepared on weekend backpacking trips or pack more efficiently for three or four-day excursions. Even when the pack is fully loaded, the hyper-adjustable Response AFS suspension provi...",
        //             "upc": "844930088659",
        //             "brand": "Gregory",
        //             "model": "GM75106",
        //             "color": "Shadow Black",
        //             "size": "Large",
        //             "dimension": "30.7 X 16.9 X 11.8 inches",
        //             "weight": "5.1 Pounds",
        //             "category": "Sporting Goods > Outdoor Recreation > Camping & Hiking > Tent Accessories",
        //             "lowest_recorded_price": 59.99,
        //             "highest_recorded_price": 319.95,
        //             "images": [
        //                 "https://s7ondemand1.scene7.com/is/image/MoosejawMB/10271395x1064295_zm?$product1000$",
        //                 "http://summitsports.scene7.com/is/image/SummitSports/422078_422078?$MAX$",
        //                 "http://images10.newegg.com/ProductImageCompressAll200/A04V_1_20150129182925241.jpg",
        //                 "http://www.sunnysports.com/image/product/large/GRGB75NLRBK.jpg",
        //                 "https://static.campmor.com/wcsstore/Campmor/static/images/items/main/P1269shw.jpg",
        //                 "http://www.ems.com/dw/image/v2/AAQU_PRD/on/demandware.static/-/Sites-vestis-master-catalog/default/dw0cffb4bc/product/images/1304/269/1304269/1304269_001_main.jpg",
        //                 "http://cdn1.ebags.com/is/image/im9/287679_5_1?resmode=4&op_usm=1,1,1,&qlt=95,1&hei=1000&wid=1000",
        //                 "http://images.jet.com/md5/49672992a9bc3ab2ccad1bc964388aa0.500"
        //             ],
        //             "offers": [
        //                 {
        //                     "merchant": "Moosejaw",
        //                     "domain": "moosejaw.com",
        //                     "title": "Gregory Men's Baltoro 75L Pack",
        //                     "currency": "",
        //                     "list_price": 319.95,
        //                     "price": 239.99,
        //                     "shipping": "",
        //                     "condition": "New",
        //                     "availability": "",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=w2v233x2w213b4b4w2&tid=1&seq=1592656618&plt=956443576ffa0419c326cf1460aea23d",
        //                     "updated_t": 1573350121
        //                 },
        //                 {
        //                     "merchant": "Skis.com",
        //                     "domain": "skis.com",
        //                     "title": "Gregory Baltoro 75 Backpack 2016",
        //                     "currency": "",
        //                     "list_price": 319,
        //                     "price": 249.97,
        //                     "shipping": "4.95",
        //                     "condition": "New",
        //                     "availability": "",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=u2t223x2z203a494z2&tid=1&seq=1592656618&plt=9468d224e24460cac370d6dbfeaf77e7",
        //                     "updated_t": 1545980956
        //                 },
        //                 {
        //                     "merchant": "Newegg.com",
        //                     "domain": "newegg.com",
        //                     "title": "Gregory Men's Baltoro 75 Large Pack",
        //                     "currency": "",
        //                     "list_price": "",
        //                     "price": 319,
        //                     "shipping": "Free Shipping",
        //                     "condition": "New",
        //                     "availability": "Out of Stock",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=v2p2z2w23343f4a4r2&tid=1&seq=1592656618&plt=b39a1430d3fef09f4aee946c21a8f6e1",
        //                     "updated_t": 1479145912
        //                 },
        //                 {
        //                     "merchant": "Sunny Sports",
        //                     "domain": "sunnysports.com",
        //                     "title": "Gregory Baltoro 75 Pack - 2015 Model Shadow Black Large",
        //                     "currency": "",
        //                     "list_price": "",
        //                     "price": 319,
        //                     "shipping": "",
        //                     "condition": "New",
        //                     "availability": "",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=u2q243y2v2z274c4r2&tid=1&seq=1592656618&plt=e01d886acd82871d4a9f826a6bdfe47f",
        //                     "updated_t": 1449653939
        //                 },
        //                 {
        //                     "merchant": "Campmor",
        //                     "domain": "campmor.com",
        //                     "title": "Gregory Baltoro 75 Pack",
        //                     "currency": "",
        //                     "list_price": 319,
        //                     "price": 199.96,
        //                     "shipping": "Free Shipping",
        //                     "condition": "New",
        //                     "availability": "",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=u2q2y2t20363a444q2&tid=1&seq=1592656618&plt=6d2ff4dd3ab27838578ce029d231d33a",
        //                     "updated_t": 1521172867
        //                 },
        //                 {
        //                     "merchant": "Eastern Mountain Sports",
        //                     "domain": "ems.com",
        //                     "title": "Gregory Baltoro 75 Backpack",
        //                     "currency": "",
        //                     "list_price": "",
        //                     "price": 319.95,
        //                     "shipping": "",
        //                     "condition": "New",
        //                     "availability": "",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=u2u223v2v223b474w2&tid=1&seq=1592656618&plt=9ad97d2014840ca4ac46c976778ec78a",
        //                     "updated_t": 1503176026
        //                 },
        //                 {
        //                     "merchant": "eBags",
        //                     "domain": "ebags.com",
        //                     "title": "Gregory Men's Baltoro 75 Large Pack Shadow Black - Gregory Backpacking Packs",
        //                     "currency": "",
        //                     "list_price": 319.95,
        //                     "price": 238.99,
        //                     "shipping": "Free Shipping",
        //                     "condition": "New",
        //                     "availability": "",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=u2s253y243y274c4t2&tid=1&seq=1592656618&plt=25053eb3ede6137ee5e9f94a56015e55",
        //                     "updated_t": 1523073424
        //                 },
        //                 {
        //                     "merchant": "Summit Sports Sites",
        //                     "domain": "summitsports.com",
        //                     "title": "Gregory Baltoro 75 Backpack 2017",
        //                     "currency": "",
        //                     "list_price": 319,
        //                     "price": 249.97,
        //                     "shipping": "4.95",
        //                     "condition": "New",
        //                     "availability": "",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=v2w243t22363f444q2&tid=1&seq=1592656618&plt=28fa2187f4094f000505eca2f99aefae",
        //                     "updated_t": 1539340904
        //                 },
        //                 {
        //                     "merchant": "Jet.com",
        //                     "domain": "jet.com",
        //                     "title": "Gregory Men's Baltoro 75L Pack",
        //                     "currency": "",
        //                     "list_price": "",
        //                     "price": 219.97,
        //                     "shipping": "",
        //                     "condition": "New",
        //                     "availability": "",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=w2s233y2y253c454r2&tid=1&seq=1592656618&plt=815803dd5373f2a2039015b797751550",
        //                     "updated_t": 1536545388
        //                 }
        //             ],
        //             "asin": "B00N5ADV94",
        //             "elid": "163672093452"
        //         },
        //         {
        //             "ean": "0844930088650",
        //             "title": "Gregory Mountain Products Men's Baltoro 75 Backpack, Shadow Black, Large",
        //             "description": "Know that feeling when it starts to get cold, you reach into your pack to pull out a puffy, and then you remember you left it at home because it didn't fit? No fun. Gregory's Baltoro 75 Backpack has over 4,500 cubic inches of gear-toting capacity to fit all the puffies, fleeces, and longjohns you need, so you can be seriously prepared on weekend backpacking trips or pack more efficiently for three or four-day excursions. Even when the pack is fully loaded, the hyper-adjustable Response AFS suspension provi...",
        //             "upc": "844930088659",
        //             "brand": "Gregory",
        //             "model": "GM75106",
        //             "color": "Shadow Black",
        //             "size": "Large",
        //             "dimension": "30.7 X 16.9 X 11.8 inches",
        //             "weight": "5.1 Pounds",
        //             "category": "Sporting Goods > Outdoor Recreation > Camping & Hiking > Tent Accessories",
        //             "lowest_recorded_price": 59.99,
        //             "highest_recorded_price": 319.95,
        //             "images": [
        //                 "https://s7ondemand1.scene7.com/is/image/MoosejawMB/10271395x1064295_zm?$product1000$",
        //                 "http://summitsports.scene7.com/is/image/SummitSports/422078_422078?$MAX$",
        //                 "http://images10.newegg.com/ProductImageCompressAll200/A04V_1_20150129182925241.jpg",
        //                 "http://www.sunnysports.com/image/product/large/GRGB75NLRBK.jpg",
        //                 "https://static.campmor.com/wcsstore/Campmor/static/images/items/main/P1269shw.jpg",
        //                 "http://www.ems.com/dw/image/v2/AAQU_PRD/on/demandware.static/-/Sites-vestis-master-catalog/default/dw0cffb4bc/product/images/1304/269/1304269/1304269_001_main.jpg",
        //                 "http://cdn1.ebags.com/is/image/im9/287679_5_1?resmode=4&op_usm=1,1,1,&qlt=95,1&hei=1000&wid=1000",
        //                 "http://images.jet.com/md5/49672992a9bc3ab2ccad1bc964388aa0.500"
        //             ],
        //             "offers": [
        //                 {
        //                     "merchant": "Moosejaw",
        //                     "domain": "moosejaw.com",
        //                     "title": "Gregory Men's Baltoro 75L Pack",
        //                     "currency": "",
        //                     "list_price": 319.95,
        //                     "price": 239.99,
        //                     "shipping": "",
        //                     "condition": "New",
        //                     "availability": "",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=w2v233x2w213b4b4w2&tid=1&seq=1592656618&plt=956443576ffa0419c326cf1460aea23d",
        //                     "updated_t": 1573350121
        //                 },
        //                 {
        //                     "merchant": "Skis.com",
        //                     "domain": "skis.com",
        //                     "title": "Gregory Baltoro 75 Backpack 2016",
        //                     "currency": "",
        //                     "list_price": 319,
        //                     "price": 249.97,
        //                     "shipping": "4.95",
        //                     "condition": "New",
        //                     "availability": "",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=u2t223x2z203a494z2&tid=1&seq=1592656618&plt=9468d224e24460cac370d6dbfeaf77e7",
        //                     "updated_t": 1545980956
        //                 },
        //                 {
        //                     "merchant": "Newegg.com",
        //                     "domain": "newegg.com",
        //                     "title": "Gregory Men's Baltoro 75 Large Pack",
        //                     "currency": "",
        //                     "list_price": "",
        //                     "price": 319,
        //                     "shipping": "Free Shipping",
        //                     "condition": "New",
        //                     "availability": "Out of Stock",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=v2p2z2w23343f4a4r2&tid=1&seq=1592656618&plt=b39a1430d3fef09f4aee946c21a8f6e1",
        //                     "updated_t": 1479145912
        //                 },
        //                 {
        //                     "merchant": "Sunny Sports",
        //                     "domain": "sunnysports.com",
        //                     "title": "Gregory Baltoro 75 Pack - 2015 Model Shadow Black Large",
        //                     "currency": "",
        //                     "list_price": "",
        //                     "price": 319,
        //                     "shipping": "",
        //                     "condition": "New",
        //                     "availability": "",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=u2q243y2v2z274c4r2&tid=1&seq=1592656618&plt=e01d886acd82871d4a9f826a6bdfe47f",
        //                     "updated_t": 1449653939
        //                 },
        //                 {
        //                     "merchant": "Campmor",
        //                     "domain": "campmor.com",
        //                     "title": "Gregory Baltoro 75 Pack",
        //                     "currency": "",
        //                     "list_price": 319,
        //                     "price": 199.96,
        //                     "shipping": "Free Shipping",
        //                     "condition": "New",
        //                     "availability": "",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=u2q2y2t20363a444q2&tid=1&seq=1592656618&plt=6d2ff4dd3ab27838578ce029d231d33a",
        //                     "updated_t": 1521172867
        //                 },
        //                 {
        //                     "merchant": "Eastern Mountain Sports",
        //                     "domain": "ems.com",
        //                     "title": "Gregory Baltoro 75 Backpack",
        //                     "currency": "",
        //                     "list_price": "",
        //                     "price": 319.95,
        //                     "shipping": "",
        //                     "condition": "New",
        //                     "availability": "",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=u2u223v2v223b474w2&tid=1&seq=1592656618&plt=9ad97d2014840ca4ac46c976778ec78a",
        //                     "updated_t": 1503176026
        //                 },
        //                 {
        //                     "merchant": "eBags",
        //                     "domain": "ebags.com",
        //                     "title": "Gregory Men's Baltoro 75 Large Pack Shadow Black - Gregory Backpacking Packs",
        //                     "currency": "",
        //                     "list_price": 319.95,
        //                     "price": 238.99,
        //                     "shipping": "Free Shipping",
        //                     "condition": "New",
        //                     "availability": "",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=u2s253y243y274c4t2&tid=1&seq=1592656618&plt=25053eb3ede6137ee5e9f94a56015e55",
        //                     "updated_t": 1523073424
        //                 },
        //                 {
        //                     "merchant": "Summit Sports Sites",
        //                     "domain": "summitsports.com",
        //                     "title": "Gregory Baltoro 75 Backpack 2017",
        //                     "currency": "",
        //                     "list_price": 319,
        //                     "price": 249.97,
        //                     "shipping": "4.95",
        //                     "condition": "New",
        //                     "availability": "",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=v2w243t22363f444q2&tid=1&seq=1592656618&plt=28fa2187f4094f000505eca2f99aefae",
        //                     "updated_t": 1539340904
        //                 },
        //                 {
        //                     "merchant": "Jet.com",
        //                     "domain": "jet.com",
        //                     "title": "Gregory Men's Baltoro 75L Pack",
        //                     "currency": "",
        //                     "list_price": "",
        //                     "price": 219.97,
        //                     "shipping": "",
        //                     "condition": "New",
        //                     "availability": "",
        //                     "link": "https://www.upcitemdb.com/norob/alink/?id=w2s233y2y253c454r2&tid=1&seq=1592656618&plt=815803dd5373f2a2039015b797751550",
        //                     "updated_t": 1536545388
        //                 }
        //             ],
        //             "asin": "B00N5ADV94",
        //             "elid": "163672093452"
        //         }
        //     ]
        // }
        //#endregion
        //console.log(baltoro);
        console.log(barcode);

        //SetApiMenu(true)
        // SetItemsFromApi(baltoro.items.map(item => {
        //     return <FCApiCard item={item} key={item.ean} addItem={useItemFromApi} />
        // }))

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
                    if (result.code === "OK") {
                        if (result.total > 0) {
                            SetApiMenu(true);
                            SetItemsFromApi(result.items.map(item => {
                                return <FCApiCard item={item} key={item.ean} addItem={useItemFromApi} />
                            }))
                        } else { alert(`Sorry, the system doesn't know this item.\nPlease upload it manually :)`) }
                    }
                    else { alert(result.message ? `Sorry, Server says: "${result.message}"` : `Sorry, something went wrong`) }
                },
                (error) => {
                    console.log("err post=", error);
                });

        //#endregion
        console.log("End fetch");
    }
    //#endregion


    const useItemFromApi = (item, src) => {
        console.log(item,src);
        
        setUseApiData(true);
        SetApiMenu(false);
        setSelectedItemFromApi(item);
        let category = categories.find(o => o.Category_title === item.category.split(">")[0].trim());
        let subCategory = subCategories.find(o => o.SubCategory_title === item.category.split(">")[1].trim());
        setTempItem({
            ...tempItem,
            itemName: item.title,
            image: {...tempItem.image, preview: src },
            category: category ? category : { title: item.category.split(">")[0].trim() },
            subCategory: subCategory ? subCategory : { title: item.category.split(">")[1].trim() },
            itemDescription: item.description,
            Id_type:"src"
        })
    }
    useEffect(() => {
        //window.scrollTo(0, 0)
        FetchTags();
        FetchCategories();
        FetchSubCategories();
    }, [])
    useEffect(() => {
        console.log(tempItem);
    }, [tempItem])
    return (
        <div>
            <Chip
                label={"Add Item"}
                variant="outlined"
                color={"primary"}
                style={{ float: "none" }}
                onClick={handleClickOpen}
                avatar={<Avatar style={{ backgroundColor: "inherit", color: green[500] }}><AddCircleOutlineRounded /></Avatar>}
            />
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
                        <div style={{ float: "left" }} >
                            <FCBarcode
                                onBarcodeChange={e => SetTempBarcode(e.target.value)}
                                onIconClick={() => { handleBarcode(tempBarcode) }}
                            />
                            <Dialog
                                fullScreen={fullScreen}
                                open={apiMenu}
                                onClose={handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <div style={{ textAlign: "-webkit-center" }}>
                                    <DialogTitle id="responsive-dialog-title">{"Is this your Item?"}</DialogTitle>
                                    <DialogContent>
                                        {itemsFromApi}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button autoFocus onClick={handleClose} color="primary">
                                            Exit
                                    </Button>
                                    </DialogActions>
                                </div>
                            </Dialog>
                        </div>
                        <div style={{ float: "left" }} >
                            {useApiData ?
                                <img
                                    src={tempItem.image.preview}
                                    style={{ maxWidth: 250, maxHeight: 250 }}
                                    alt={"Item Image"}
                                /> :
                                <FCImage
                                    parent={"Item"}
                                    onItemImageChange={(image, base64) => handleItemImage(image, base64)}
                                />}
                        </div>
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
                                disabled={useApiData}
                                //value={useApiData ? selectedItemFromApi.category.split(">")[0].trim(): ""}
                                onChange={(e, category) => handleCategoryChange(category)}
                                getOptionLabel={(option) => option.Category_title}
                                //getOptionLabel={(option) => useApiData ? selectedItemFromApi.category.split(">")[0].trim() : option.Category_title}
                                renderInput={(params) => <TextField {...params} label={useApiData ? selectedItemFromApi.category.split(">")[0] : "Category"} variant="outlined" />}
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
                                    //console.log("filteredSC: ", filtered);

                                    return filtered;
                                }}
                                disabled={useApiData}
                                getOptionLabel={(option) => option.Sub_category_title}
                                renderInput={(list) => <TextField {...list} label={useApiData ? selectedItemFromApi.category.split(">")[1] : "Sub Category"} variant="outlined" />}
                            />
                        </div>
                        <br style={{ clear: "both" }} /><br style={{ clear: "both" }} />
                        <div style={{ float: "left" }}>
                            <TextField
                                label={useApiData ? selectedItemFromApi.title : "Item Name"}
                                //value={useApiData ? selectedItemFromApi.title : ""}
                                disabled={useApiData}
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
                        <div style={{ float: "left" }}>
                            <TextField
                                id="standard-basic-Dollar"
                                label="$ Discount"
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
                                value={useApiData ? selectedItemFromApi.description : undefined}
                                //color="white"
                                inputProps={{
                                    style: { color: props.color ? props.color : null }
                                }

                                }
                                InputLabelProps={{
                                    style: { color: props.color ? props.color : null }
                                }}
                            //style={{ maxWidth: 400 }}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleCancel} color="primary">
                            Cancel
                         </Button>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Add
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}

