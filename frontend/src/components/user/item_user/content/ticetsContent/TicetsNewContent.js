import React, {useContext, useEffect, useState} from "react";
import {useMessage} from "../../../../../hooks/message.hook";
import {useHttp} from "../../../../../hooks/http.hook";
import {AuthContext} from "../../../../../context/auth.context";
import path from "../../../../../path.config";

export const TicetsNewContent = () => {
    const { token } = useContext(AuthContext);

    const { request } = useHttp(),
        message = useMessage();

    const [form, setForm] = useState(JSON.parse(localStorage.getItem("NewTicetData")) || {
        theme: '',
        question: ''
    });

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    };

    useEffect(() => {
        localStorage.setItem("NewTicetData", JSON.stringify(form));
    }, [form]);


    const submitHandler = async () => {
        try {
            const data = await request(path.ticket, "POST", {theme: form.theme, question: form.question},  {"Authorization": `Bearer ${token}`});

            if(data && data.message) {
                message(data.message);

                localStorage.removeItem("NewTicetData");
                setForm({
                    theme: '',
                    question: ''
                });

                return window.location.href = "/ticets/all"
            }
        } catch (e) {}
    };

    return(
        <div className="ticets-new">
            <div className="row-block">
                <span className="helper-text">Тема</span>
                <div className="input-field col s6 in-val">
                    <input id="last_name" type="text" className="validate" name="theme" value={form.theme} onChange={changeHandler}/>
                </div>
            </div>
            <div className="row-block">
                <span className="helper-text">Ваш вопрос</span>
                <div className="input-field col s12 in-val">
                    <textarea id="textarea1" className="materialize-textarea" name="question" value={form.question} onChange={changeHandler}/>
                </div>
            </div>
            <div className="pay-btn">
                <button className="btn" type="submit" name="action" onClick={submitHandler}>Отправить
                    <i className="material-icons right">send</i>
                </button>
            </div>
        </div>
    )
};