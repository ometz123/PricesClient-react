import React, { createContext, useState } from 'react';
export const ReceiptContext = createContext();

const ReceiptContextProvider = (props) => {
    const [receipt, setReceipt] = useState({
        image: {},
        date: new date(),
        discoundDollar: 0,
        discountPercent: 0,
        store: {
            name: "",
            lat: "",
            lon: ""
        },
        items: [],
        receiptDescription: "",
    })
    const [item, setItem] = useState({
        category: {
            id: 0,
            title: ""
        },
        subCategory: {
            id: 0,
            title: ""
        },
        itemName: "",
        barcode: "",
        discoundDollar: 0,
        discountPercent: 0,
        tags: [],
        itemDescription: ""
    })
    const [tag, setTag] = useState({
        id: 0,
        title: ""
    })

    return (
        <ReceiptContext.Provider value={{ receipt, SetNewReceipt: setReceipt }}>
            {props.children}
        </ReceiptContext.Provider>
    );
}
export default ReceiptContextProvider;
