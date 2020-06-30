import React, {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {NewsItemComponent} from "../components/item/NewsItemComponent";
import {useCollapsible} from "../hooks/collapsible.hook";
import {usePagination} from "../hooks/pagination.hook";

import "../style/NewsPage.css";
import back from "../image/dmitry-demidko-OG3A-ilG8AY-unsplash.png";
import path from "../path.config"

export const NewsPage = () => {
    const collapsible = useCollapsible();

    const {request} = useHttp(),
        {init, count, pagePagination, selector} = usePagination();

    const [news, setNews] = useState([]);

    useEffect(() => {
        collapsible(document.querySelector(".collapsible"), {});
        (async () => {
            try {
                const data = await request(path.news, "GET", null, {});

                if (data) {
                    const rev = data.reverse();

                    setNews(rev);
                }
            } catch (e) {
                console.log("Нет ответа");
            }
        })();
    }, [collapsible, request, setNews, init]);

    useEffect(() => {init(news)}, [news, init]);

    return (
        <div className="page-news" style={
            {
                background: `url(${back})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "cover"
            }
        }>
            <div className="news-wrapper">
                <h1>Новости</h1>
                <ul className="collapsible">
                    {
                        pagePagination.length !== 0 ? pagePagination[count].map(p => {
                                return (
                                    <NewsItemComponent
                                        key={p._id}
                                        props={p}
                                    />
                                )
                            }
                        ) : <li className="no-news"><b>Нет новостей</b></li>}
                </ul>
                {selector()}
            </div>
        </div>
    )
};