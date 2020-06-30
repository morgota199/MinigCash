import React, {useContext, useEffect, useState} from "react";
import {AuthContext, TicetContext} from "../../../../../context/auth.context";
import {useHttp} from "../../../../../hooks/http.hook";
import {useMessage} from "../../../../../hooks/message.hook";
import path from "../../../../../path.config";

export const TicetItem = (props) => {
    const { token, userName } = useContext(AuthContext),
        {ticet, setTicet} = useContext(TicetContext);

    const { request } = useHttp(),
        message = useMessage();


    const [answer, setAnswer] = useState(""),
        [screenMy, setScreenMy] = useState("none"),
        [color, setColor] = useState("white");

    const changeHandler = event => {
        setAnswer(event.target.value);
    };

    const redactHandler = () => {
        if(screenMy === "none"){
            setScreenMy("flex");
        } else {
            setScreenMy("none");
        }
    };

    const removeHandler = async () => {
        const data = await request(`${path.ticket}/${props.id}`, "DELETE", null, {"Authorization": `Bearer ${token}`});

        message(data.message);

        setTicet(ticet.filter(i => props.id !== i.id));
        localStorage.setItem('TicetsAdminData', JSON.stringify(ticet));
    };

    const sendHandler = async () => {
        try {
            const data = await request(`${path.ticket}/${props.id}`, "PUT", {
                    username: userName,
                    email: props.email,
                    question: props.question,
                    theme: props.theme,
                    answer: answer,
                    state: props.state,
                    date: props.date
                }, {"Authorization": `Bearer ${token}`}),
                newTicetData = await request(path.ticket, "GET");

            const ticetData = newTicetData.map(i => {return {id: i._id, ...i}});

            if(screenMy === "flex") setScreenMy("none");

            localStorage.setItem("TicetsAdminData", JSON.stringify(ticetData));
            setTicet(ticetData);

            setAnswer(null);

            return message(data.message);
        } catch (e) {
            console.log(e.message)
        }
    };

    useEffect(() => {
        if(props.state === "Обработано"){
            setColor("rgba(173, 255, 47, 0.7)");
        } else {
            setColor("rgba(240, 128, 128, 0.7)");
        }
    }, [props.state]);


    if (!props.answer){
        return (
            <li className="ticets-tools-item" style={{background: color}}>
                <div className="ticets-all-admin" >
                    <div className="logo-user">
                        <div className='name'>
                            <p>Логин: <span><b>{props.userName}</b></span></p>
                            <p>Email: <span><b>{props.email}</b></span></p>
                        </div>
                        <div className="remove" onClick={removeHandler}>
                            <i className="material-icons" style={{cursor: "pointer"}} >clear</i>
                        </div>
                    </div>
                    <div className="theme">
                        <p>Тема: <span><b>{props.theme}</b></span></p>
                    </div>
                    <div className="question">
                        <p>Вопрос: <span><b>{props.question}</b></span></p>
                    </div>
                    <div className="answer">
                        <div className="redact">
                            <div className="input-container  input-field">
                                <textarea id={`answer-field_${props.id}`} type="text" className="materialize-textarea" onChange={changeHandler}/>
                                <label htmlFor={`answer-field_${props.id}`}>Ответ</label>
                            </div>
                            <div className="icon-container">
                                <i className="material-icons icon" onClick={sendHandler}>send</i>
                            </div>
                        </div>
                    </div>
                    <div className="data-and-state">
                        <div className="state">
                            <p>Состояние: <span><b>{props.state}</b></span></p>
                        </div>
                        <div className="date">
                            <p>Дата: <span><b>{props.date.replace("T", " ").split(".")[0]}</b></span></p>
                        </div>
                    </div>
                </div>
            </li>
        )
    }

    return (
        <li className="ticets-tools-item" style={{background: color}}>
            <div className="ticets-all-admin" >
                <div className="logo-user">
                    <div className="name">
                        <p>Логин: <span><b>{props.userName}</b></span></p>
                        <p>Email: <span><b>{props.email}</b></span></p>
                    </div>
                    <div className="remove" onClick={removeHandler}>
                        <i className="material-icons" style={{cursor: "pointer"}}>clear</i>
                    </div>
                </div>
                <div className="theme">
                    <p>Тема: <span><b>{props.theme}</b></span></p>
                </div>
                <div className="question">
                    <p>Вопрос: <span><b>{props.question}</b></span></p>
                </div>
                <div className="answer answer-yes">
                    <div className="text-answer">
                        <span>Ответ: <b dangerouslySetInnerHTML={{__html: props.answer.replace(/\n/g, "<br>")}}/></span>
                        <i className="material-icons create" onClick={redactHandler}>create</i>
                    </div>
                    <div className="redact">
                        <div className="input-container input-field" style={{display: screenMy}}>
                            <textarea id={`answer-field_${props.id}`} type="text" className="materialize-textarea" onChange={changeHandler}/>
                            <label htmlFor={`answer-field_${props.id}`}>Ответ</label>
                        </div>
                        <div className="icon-container" style={{display: screenMy}}>
                            <i className="material-icons icon" onClick={sendHandler}>send</i>
                        </div>
                    </div>
                </div>
                <div className="data-and-state">
                    <div className="state">
                        <p>Состояние: <span><b>{props.state}</b></span></p>
                    </div>
                    <div className="date">
                        <p>Дата: <span><b>{props.date.replace("T", " ").split(".")[0]}</b></span></p>
                    </div>
                </div>
            </div>
        </li>
    )
};