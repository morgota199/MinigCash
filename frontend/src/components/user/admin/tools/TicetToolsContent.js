import React, {useContext, useEffect, useState} from "react";
import {AuthContext, TicetContext} from "../../../../context/auth.context";
import {useHttp} from "../../../../hooks/http.hook";
import {TicetItem} from "./TicetItem/TicetItem";
import {usePagination} from "../../../../hooks/pagination.hook";

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
                    const data = await request("/all-ticet-admin", "POST", null, {token}),
                        ticetData = data.ticet.map((i, n) => {
                            return {id: n, ...i}
                        });

                    setTicet(ticetData);
                } catch (e) {
                    console.log("Нет ответа");
                }
            }
        )();
    }, [request, token]);

    useEffect(() => init(ticet, 2), [ticet, init]);

    return(
        <TicetContext.Provider value={{
            ticet, setTicet
        }}>
            <ul className="carousel-slider">
                {
                    pagePagination.length !== 0 ? pagePagination[count].map(i => {
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
                        }
                    ) : <li><p>Нет тикетов</p></li>
                }
            </ul>
            {selector()}
        </TicetContext.Provider>
    );
};