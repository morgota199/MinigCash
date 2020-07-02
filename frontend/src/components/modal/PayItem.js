import {AuthContext, TablePayContext} from "../../context/auth.context";
import React, {useContext, useEffect, useState} from "react";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import path from "../../path.config";

export const PayItem = ({props}) => {
    const {token} = useContext(AuthContext),
        {allPay, setAllPay}  = useContext(TablePayContext);

    const {request} = useHttp(),
        message = useMessage();

    const [color, setColor] = useState('white');

    useEffect(() => {
        switch (allPay.confirmation) {
            case "Отклонено": return setColor("grey");
            case "В обработке": return setColor("red");
            case "Подтверждено": return setColor("green");
            default: break;
        }
    }, [setColor, allPay.confirmation]);

    const rejectHandler = async () => {
        try {
            const data = await request(
                path.payout_reject.replace("{id}", allPay._id),
                "PUT",
                null,
                {"Authorization": `Bearer ${token}`}
            );

            message(data.message);
            if (data.message === "Отклонено") {
                let newAllPay = allPay;
                newAllPay.confirmation = "Отклонено";
                setAllPay(newAllPay);
            }
        } catch (e) {}
    };

    const approveHandler = async () => {
        try{
            const data = await request(
                path.payout_approve.replace("{id}", allPay._id),
                "PUT",
                null,
                {"Authorization": `Bearer ${token}`}
            );

            message(data.message);

            if(data.message === "Подтверждено"){
                let newAllPay = allPay;
                newAllPay.confirmation = "Подтверждено";
                setAllPay(newAllPay);
            }
        }catch (e) {}
    };

    return(
        <div id={props._id} className="pay-badge-item modal">
            <div className="pay-logo">
                <div className="name">
                    <p>Login: <b>{allPay.userName}</b></p>
                    <p>Email: <b>{allPay.email}</b></p>
                </div>
                <div className="control pay-badge-icons">
                    <i className="material-icons pay-badge-icon-ok" onClick={approveHandler}>check</i>
                    <i className="material-icons pay-badge-icon-ok" onClick={rejectHandler}>clear</i>
                </div>
            </div>
            <div className="pay-other-info">
                <p>Система оплаты: <b>{allPay.system}</b></p>
                <p>Номер кошелька: <b>{allPay.number}</b></p>
                <p>Сумма вывода (в валюте системы оплаты): <b>{allPay.money.toFixed(12)}</b></p>
                <p>IP адрес пользователя: <b>{allPay.ip}</b></p>
                <p>ID заявки: <b>{allPay._id}</b></p>
            </div>
            <div className="data-and-state">
                <p>Cостояние оплаты: <b style={{background: color}}>{allPay.confirmation}</b></p>
                <p>Дата запроса на оплату: <b>{allPay.date.replace("T", " ").split(".")[0]}</b></p>
            </div>
        </div>
    )
};