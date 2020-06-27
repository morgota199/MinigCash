import React, {useEffect, useState} from "react";
import {useMessage} from "../../../../../hooks/message.hook";
import copy from "copy-to-clipboard";

export const Item = (props) => {
    const message = useMessage();

    const [color, setColor] = useState("white");

    const copyHandler = () => {
        copy(props.theme);
        message("Скопированно в буфер обмена");
    };

    useEffect(() => {
        switch (props.state) {
            case "В обработке":return setColor("red");
            case "Обработано": return setColor("green");
            default: break;
        }
    },[props.state]);

    return (
        <tr>
            <td data-label="Тема" className="theme" onClick={copyHandler}>
                <p>{props.theme}</p>
            </td>
            <td data-label="Вопрос" className="question" onClick={copyHandler}>
                <p dangerouslySetInnerHTML={{ __html: props.question }} style={{textAlign: "left"}}/>
            </td>
            <td data-label="Ответ" className="answer">
                <p dangerouslySetInnerHTML={{ __html: props.answer }} style={{textAlign: "left"}}/>
            </td>
            <td data-label="Статус" className="state">
                <p style={{background: color, borderRadius: "10px", padding: "3px"}}>{props.state}</p>
            </td>
            <td data-label="Дата" className="date">
                <p>{props.date}</p>
            </td>
        </tr>
    )
};