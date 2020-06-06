import React, { createContext, useState } from 'react';
export const ReceiptContext = createContext();

const ReceiptContextProvider = (props) => {
    const [receipt, setReceipt] = useState({
        image: { preview: "", raw: "" },
        date: new Date(),
        discoundDollar: "",
        discountPercent: "",
        store: { name: "", lat: "", lon: "" },
        items: [],//[{ name: "omer", id: 1 }, { name: "tzafrir", id: 2 }],
        receiptDescription: "",
    })
    const [item, setItem] = useState({
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
        price:""
    })
    const [tag, setTag] = useState({ id: 0, title: "" })

    return (
        <ReceiptContext.Provider value={{
            receipt,
            item,
            tag,
            SetReceipt: setReceipt,
            SetItem: setItem,
            SetTag: setTag
        }}>
            {props.children}
        </ReceiptContext.Provider>
    );
}
export default ReceiptContextProvider;
