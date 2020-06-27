import React, {useContext, useEffect, useState} from "react";
import {AllNews} from "./NewsItem/AllNews";
import {RedactNews} from "./NewsItem/RedactNews";
import {AllNewsContext, AuthContext} from "../../../../context/auth.context";
import {useHttp} from "../../../../hooks/http.hook";

import "../../../../style/NewsToolsContent.css"

export const NewsToolsContent = () => {
    const {token} = useContext(AuthContext);

    const {request} = useHttp();

    const [allNews, setAllNews] = useState(JSON.parse(localStorage.getItem("NewsData")) || []),
        [redactNews, setRedactNews] = useState({_id: 0, title: "default1", text: "default1"}),
        [pages, setPages]             = useState(<AllNews props={allNews}/>);

    const componentHandler = (event) => {
        setRedactNews({title: "default1", text: "default1"});

        if(event.target.innerHTML === "Все посты") return setPages(<AllNews props={allNews}/>);

        return setPages(<RedactNews props={{title: "default1", text: "default1", newPost: true}}/>)
    };

    useEffect(() => {
        setAllNews(all => {return all.map(a => {return a._id === redactNews._id ? redactNews : a})});
    }, [redactNews, setAllNews]);

    useEffect(() => {
        (async () => {
            const data = await request("/get-news-admin", "POST", null, {token});

            if(data) setAllNews(data.reverse());
        })()

    }, [request, token]);

    useEffect(() => {
        localStorage.setItem("NewsData", JSON.stringify(allNews));
    }, [allNews]);

    return (
        <AllNewsContext.Provider value={{
            allNews, setAllNews, redactNews, setRedactNews, pages, setPages
        }}>
            <div className="admin-news-page">
                <ul className="pay-selector news-selector">
                    <li onClick={componentHandler}><button className="btn">Все посты</button></li>
                    <li onClick={componentHandler}><button className="btn">Новый пост</button></li>
                </ul>
                {
                    pages
                }
            </div>
        </AllNewsContext.Provider>
    );
};