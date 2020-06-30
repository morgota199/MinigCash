import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../../../../../hooks/http.hook";
import {AuthContext} from "../../../../../context/auth.context";
import {Item} from "./subTicetsAllContent";
import {usePagination} from "../../../../../hooks/pagination.hook";
import path from "../../../../../path.config";

export const TicetsAllContent = () => {
    const { token } = useContext(AuthContext);

    const { request } = useHttp(),
        {init, count, pagePagination, selector} = usePagination();

    const [ticet, setTicet] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await request(path.ticket_user, "GET", null, {"Authorization": `Bearer ${token}`});

                if(data){
                    const ticketData = data.map((i, n) => {
                        return {id: n, ...i}
                    });

                    setTicet(ticketData.reverse());
                }
            } catch (e) {
                console.log("Нет ответа");
            }
        })();
    }, [request, token, init]);

    useEffect(() => {
        init(ticet)
    }, [ticet, init]);

    return(
        <div className="table-box">
            <div className="table-wrap">
                <table>
                    <thead>
                    <tr>
                        <th><p>Тема</p></th>
                        <th><p>Вопрос</p></th>
                        <th><p>Ответ</p></th>
                        <th><p>Статус</p></th>
                        <th><p>Дата</p></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        pagePagination.length !== 0 ? pagePagination[count].map(p => {
                                return (
                                    <Item
                                        key={p.id}
                                        theme={p.theme}
                                        question={p.question ? p.question.replace(/\n/g, "<br>") : p.question}
                                        answer={p.answer ? p.answer.replace(/\n/g, "<br>") : p.answer}
                                        state={p.state}
                                        date={p.date.replace("T", " ").split(".")[0]}
                                    />
                                )
                            }
                        ) : <tr><td className="no-news"><b>Нет тикетов</b></td></tr>
                    }
                    </tbody>
                </table>
            </div>
            {selector()}
        </div>
    );
};