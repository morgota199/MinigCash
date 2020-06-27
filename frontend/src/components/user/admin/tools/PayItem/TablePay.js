import React, {useContext, useEffect, useState} from "react";
import {PagePayContext, TablePayContext} from "../../../../../context/auth.context";
import {useMessage} from "../../../../../hooks/message.hook";
import copy from "copy-to-clipboard";
import {PayItem} from "../../../../modal/PayItem";
import {useModal} from "../../../../../hooks/modals.hook";

import "../../../../../style/ListPayContent.css"

export const TablePay = ({props}) => {
    const {pagePay, setPagePay} = useContext(PagePayContext),
        message = useMessage(),
        modal = useModal();

    const [color, setColor] = useState("white"),
        [stateProps, setStateProps] = useState(props);

    const copyHandler = () => {
        copy(props._id);
        message("Скопированно в буфер обмена");
    };

    useEffect(() => {
        modal(document.getElementById(`${props._id}`))
    }, [])

    useEffect(() => {
        switch (stateProps.confirmation) {
            case "Отклонено":
                return setColor("grey");
            case "В обработке":
                return setColor("red");
            case "Подтверждено":
                return setColor("green");
            default: break;
        }

        setPagePay(pagePay.map(p => {
                if (p._id === stateProps._id) {
                    return stateProps
                }
                return p;
            }
        ));
    }, [setColor, setPagePay, pagePay, stateProps.confirmation, stateProps]);

    return (
        <TablePayContext.Provider value={{
            allPay: stateProps, setAllPay: setStateProps
        }}>
            <tr>
                <td data-label="ID заявки" onClick={copyHandler}>
                    <p>{stateProps._id}</p>
                </td>
                <td data-label="Система">
                    <p>{stateProps.system}</p>
                </td>
                <td data-label="Сумма">
                    <p>{stateProps.money}</p>
                </td>
                <td data-label="Статус">
                    <p style={{background: color, borderRadius: "10px", padding: "3px"}}>
                        <a className="modal-trigger" href={`#${props._id}`}>
                            {stateProps.confirmation}
                        </a>
                    </p>
                </td>
                <td data-label="Дата">
                    <p>{stateProps.date.replace("T", " ").split(".")[0]}</p>
                </td>
                <PayItem props={stateProps}/>
            </tr>
        </TablePayContext.Provider>
    );
};