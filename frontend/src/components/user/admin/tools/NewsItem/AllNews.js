import React, {useContext, useEffect} from "react";
import {NewsItem} from "./NewsItem";
import {useCollapsible} from "../../../../../hooks/collapsible.hook";
import {AllNewsContext} from "../../../../../context/auth.context";
import {usePagination} from "../../../../../hooks/pagination.hook";

import "../../../../../style/NewsToolsContent.css"

export const AllNews = ({props}) => {
    const {allNews} = useContext(AllNewsContext);

    const {init, count, selector, pagePagination} = usePagination(),
        collapsible = useCollapsible();

    useEffect(() => {
        collapsible(document.querySelector(".collapsible"), {});
    }, [collapsible, props, init]);

    useEffect(() => {init(allNews)}, [allNews, init]);


    return(
        <div className="page-news">
            <ul className="collapsible">
                {
                    pagePagination.length !== 0 ?
                        pagePagination[count].map(news => {
                                return(
                                    <NewsItem
                                        key={news._id}
                                        props={news}/>
                                )
                            }
                        ): <li className="no-news"><b>Нет новостей</b></li>}</ul>
            {selector()}
        </div>
    )
};

