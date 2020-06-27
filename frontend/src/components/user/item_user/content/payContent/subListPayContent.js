import React, {useEffect, useState} from "react";
import {useMessage} from "../../../../../hooks/message.hook";
import copy from 'copy-to-clipboard';

import "../../../../../style/ListPayContent.css"

export const Item = (props) => {
    const message = useMessage();

    const [color, setColor] = useState("white");

    const copyHandler = () => {
        copy(props._id);
        message("Скопированно в буфер обмена");
    };

    useEffect(() => {
        switch (props.confirmation) {
            case "Отклонено": return setColor("grey");
            case "В обработке": return setColor("red");
            case "Подтверждено": return setColor("green");
            default: break;
        }
    }, [props.confirmation]);

    return (
        <tr>
            <td className="id-pay" data-label="ID заявки" onClick={copyHandler}>
                <p>{props._id}</p>
            </td>
            <td data-label="Система" className="system">
                <p>{props.system}</p>
            </td>
            <td data-label="Сумма" className="money">
                <p>{props.money}</p>
            </td>
            <td data-label="Статус" className="state">
                <p style={{background: color, borderRadius: "10px", padding: "3px"}}>{props.confirmation}</p>
            </td>
            <td data-label="Дата" className="date">
                <p>{props.date}</p>
            </td>
        </tr>
    )
};