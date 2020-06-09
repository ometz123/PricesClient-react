import React, { createContext, useState } from 'react';

export const TagsContext = createContext();

const TagsContextProvider = (props) => {
    const [tags, setTags] = useState([
        { Tag_title: 'The Shawshank Redemption', Tag_id: 1994 }
    ])
    const fetchTags = () => {
        //console.log("start fetch tags!");
        let api = `https://localhost:44377/api/tags`;
        fetch(api)
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    console.log("fetch FetchGet= ", result);
                    setTags(result);
                },
                (error) => {
                    console.log("err post=", error);
                });
    }
    return (
        <TagsContext.Provider value={{
            tags,
            SetTags: setTags,
            FetchTags: fetchTags
        }}>
            {props.children}
        </TagsContext.Provider>
    );
}
export default TagsContextProvider;