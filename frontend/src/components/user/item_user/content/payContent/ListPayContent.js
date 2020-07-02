import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../../../context/auth.context";
import {useHttp} from "../../../../../hooks/http.hook";
import {Item} from "./subListPayContent";
import {usePagination} from "../../../../../hooks/pagination.hook";
import path from "../../../../../path.config";

import "../../../../../style/ListPayContent.css"

export const ListPayContent = () => {
    const {token} = useContext(AuthContext);

    const [pay, setPay] = useState([]);

    const {request} = useHttp(),
        {selector, pagePagination, count, init} = usePagination();

    useEffect(() => {
        (async () => {
            try {
                const data = await request(
                    path.payment_user,
                    "GET",
                    null,
                    {"Authorization": `Bearer ${token}`}
                    );

                if (data) {
                    setPay(data.reverse());
                }

            } catch (e) {
                console.log("Нет ответа");
            }
        })();
    }, [request, token, init]);

    useEffect(() => {init(pay)}, [pay, init]);

    return(
        <div className="table-box">
            <div className="table-wrap">
                <table className="striped">
                    <thead>
                    <tr>
                        <th><p>ID заявки</p></th>
                        <th><p>Система</p></th>
                        <th><p>Сумма</p></th>
                        <th><p>Статус</p></th>
                        <th><p>Дата</p></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        pagePagination.length !== 0 ? pagePagination[count].map(p => {
                                return (
                                    <Item
                                        key={p._id}
                                        _id={p._id}
                                        system={p.system}
                                        money={p.money}
                                        confirmation={p.confirmation}
                                        date={p.date.replace("T", " ").split(".")[0]}
                                    />
                                )
                            }
                        ) : <tr style={{colSpan: 5}}><th/><th/><th><b>Нет платежей</b></th><th/><th/></tr>
                    }
                    </tbody>
                </table>
            </div>
            {selector()}
        </div>
    );
};
