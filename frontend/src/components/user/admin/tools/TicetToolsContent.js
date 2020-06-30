import React, {useContext, useEffect, useState} from "react";
import {AuthContext, TicetContext} from "../../../../context/auth.context";
import {useHttp} from "../../../../hooks/http.hook";
import {TicetItem} from "./TicetItem/TicetItem";
import {usePagination} from "../../../../hooks/pagination.hook";
import path from "../../../../path.config";

import "../../../../style/TicetToolsContent.css";

export const TicetToolsContent = () => {
    const { token } = useContext(AuthContext);

    const { selector, count, init, pagePagination } = usePagination();

    const { request } = useHttp();

    const [ticet, setTicet] = useState([]);

    useEffect(() => {
        (
            async () => {
                try {
                    const data = await request(path.ticket, "GET"),
                        ticetData = data.map(i => {
                            return {id: i._id, ...i}
                        });

                    setTicet(ticetData);
                } catch (e) {
                    console.log("Нет ответа");
                }
            }
        )();
    }, [request, token]);

    useEffect(() => {
        init(ticet, 2)
    }, [ticet, init]);

    return(
        <TicetContext.Provider value={{
            ticet, setTicet
        }}>
            <ul className="carousel-slider">
                {
                    pagePagination.length !== 0 ? (pagePagination[count] ? pagePagination[count].map(i => {
                            return (
                                <TicetItem
                                    key={i.id}
                                    id={i.id}
                                    userName={i.userName}
                                    email={i.email}
                                    theme={i.theme}
                                    question={i.question}
                                    answer={i.answer}
                                    state={i.state}
                                    date={i.date}
                                />
                            )
                        })
                    : pagePagination[count-1].map(i => {
                            return (
                                <TicetItem
                                    key={i.id}
                                    id={i.id}
                                    userName={i.userName}
                                    email={i.email}
                                    theme={i.theme}
                                    question={i.question}
                                    answer={i.answer}
                                    state={i.state}
                                    date={i.date}
                                />
                            )
                        })) : <li><p style={{textAlign: "center"}}>Нет тикетов</p></li>
                }
            </ul>
            {selector()}
        </TicetContext.Provider>
    );
};