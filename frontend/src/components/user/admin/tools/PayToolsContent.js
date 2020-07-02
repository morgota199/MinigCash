import React, {useContext, useEffect, useState} from "react";
import {AuthContext, PagePayContext} from "../../../../context/auth.context";
import {useHttp} from "../../../../hooks/http.hook";
import {TablePay} from "./PayItem/TablePay";
import {useCollapsible} from "../../../../hooks/collapsible.hook";
import {usePagination} from "../../../../hooks/pagination.hook";
import path from "../../../../path.config";

import "../../../../style/ListPayContent.css"

export const PayToolsContent = () => {
    const {token} = useContext(AuthContext);

    const {init, count, selector, pagePagination} = usePagination(),
        collapsible = useCollapsible(),
        {request} = useHttp();

    const [pay, setPay] = useState([]),
        [onLoad, setOnLoad] = useState(0),
        [approve, setApprove] = useState(0),
        [rejects, setRejects] = useState(0);

    useEffect(() => {
        collapsible(document.querySelector(".collapsible"), {});
        (async () => {
            const payData = await request(path.payment_all_users);

            const rev = payData.reverse();

            setPay(rev);

            init(rev);
        })();
    }, [request, token, collapsible, setPay, init]);

    useEffect(() => {
        let iterOnLoad  = 0,
            iterApprove = 0,
            iterRejects = 0;

        for(let i of pay){
            switch (i.confirmation) {
                case "В обработке":
                    iterOnLoad += 1;
                    setOnLoad(iterOnLoad);
                    break;
                case "Подтверждено":
                    iterApprove += 1;
                    setApprove(iterApprove);
                    break;
                case "Отклонено":
                    iterRejects += 1;
                    setRejects(iterRejects);
                    break;
                default: break;
            }
        }
    }, [setOnLoad, setApprove, setRejects, pay]);

    useEffect(() => {init(pay)}, [pay, init]);

    return (
        <PagePayContext.Provider value={{
            pagePay: pay, setPagePay: setPay
        }}>

            <div className="pay-container">
                {/*НАЧАЛО СТАТИСТИКИ*/}
                <div className="pay-info-static">
                    <div className="on-load">
                        <p>В обработке: <b>{onLoad}</b></p>
                    </div>
                    <div className="approve">
                        <p>Подтверждено: <b>{approve}</b></p>
                    </div>
                    <div className="rejects">
                        <p>Отклонено: <b>{rejects}</b></p>
                    </div>
                    <div className="all-pay">
                        <p>Все: <b>{pay.length}</b></p>
                    </div>
                </div>
                {/*КОНЕЦ СТАТИСТИКИ*/}

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
                                pagePagination.length !== 0 ?
                                    pagePagination[count].map(pays => {
                                            return (
                                                <TablePay
                                                    key={pays._id}
                                                    props={pays}
                                                />
                                            )
                                        }
                                    ) : <tr style={{colSpan: 5}}>
                                        <th/>
                                        <th/>
                                        <th><b>Нет платежей</b></th>
                                        <th/>
                                        <th/>
                                    </tr>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                {selector()}
            </div>
        </PagePayContext.Provider>
    );
};