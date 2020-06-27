import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/auth.context";
import {useMessage} from "../../../hooks/message.hook";
import {useHttp} from "../../../hooks/http.hook";

import "../../../style/SelectPasswordItem.css"

export const SelectPasswordItem = () => {
    const { request, error, clearError } = useHttp(),
        auth                             = useContext(AuthContext),
        message                          = useMessage();

    const [form, setForm] = useState({
        oldPassword: '',
        newPasswordOne: '',
        newPasswordTwo: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        setForm({...form, [event.target.name] : event.target.value});
    };

    const selectPasswordHandler = async () => {
        if(form.newPasswordOne !== form.newPasswordTwo){
            return message('Новые пароли не совпадают')
        }

        if(form.oldPassword === form.newPasswordOne){
            return message("Старый и новые не могут совпадать");
        }

        const data = await request(
            "/user/profile/select-password",
            "POST",
            {
                oldPassword: form.oldPassword,
                newPassword: form.newPasswordOne
            },
            {
                token: auth.token
            });
        setForm({
            oldPassword: '',
            newPasswordOne: '',
            newPasswordTwo: ''
        });
        return message(data.message);
    };

    return (
        <div className="select-pass-container">
            <div className="logo">
                <h4>Смена пароля</h4>
            </div>
            <div className="row-item old-pass">
                <div className="row-block">
                    <span className="helper-text">Старый пароль</span>
                    <div className="input-field in-val">
                        <input value={form.oldPassword} id="oldPassword" name="oldPassword" type="password" className="validate" onChange={changeHandler}/>
                    </div>
                </div>
            </div>
            <div className="row-item">
                <div className="row-block">
                    <span className="helper-text">Новый пароль</span>
                    <div className="input-field in-val">
                        <input value={form.newPasswordOne} id="newPassword" name="newPasswordOne" type="password" className="validate" onChange={changeHandler}/>
                    </div>
                </div>
            </div>
            <div className="row-item">
                <div className="row-block">
                    <span className="helper-text">Повторите новый пароль</span>
                    <div className="input-field in-val">
                        <input value={form.newPasswordTwo} id="newPasswordTwo" name="newPasswordTwo" type="password" className="validate" onChange={changeHandler}/>
                    </div>
                </div>
            </div>
            <div className="insert">
                <button className="waves-effect waves-light btn" onClick={selectPasswordHandler}>Применить изменения</button>
            </div>
        </div>
    );
};