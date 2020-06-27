import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext, RefContext} from "../context/auth.context";
import {useModal} from "../hooks/modals.hook";
import path from "../path.config";

import "../style/AuthPage.css"
import back from "../image/dmitry-demidko-OG3A-ilG8AY-unsplash.png"

const Modal = () => {
    const {request} = useHttp(),
        message = useMessage();

    const [recovery, setRecovery] = useState(null),
        [state, setState] = useState(0),
        [code, setCode] = useState(null),
        [oneNewPassword, setOneNewPassword] = useState(null),
        [twoNewPassword, setTwoNewPassword] = useState(null);

    const codeHandler = async () => {
        if(state === 0){
            setState(1);
            await request("/auth/password-recovery-code", "POST", {recovery});
        } else if(state === 1){
            if(oneNewPassword !== twoNewPassword) return message("Пароли не совпадают");


            const data = await request('/auth/select-recovery-password', "POST", {code, recovery, one: oneNewPassword});
            setState(0);
            setRecovery(null);
            setOneNewPassword(null);
            setTwoNewPassword(null);

            if(data && data.message){
                message(data.message);
            }
        }
    }

    const changeHandler = event => {
        if(event.target.name === "recovery") setRecovery(event.target.value);
        if(event.target.name === "code")     setCode(event.target.value);
        if(event.target.name === "one")      setOneNewPassword(event.target.value);
        if(event.target.name === "two")      setTwoNewPassword(event.target.value);
    }

    const stopStateHandler = () => setState(0);

    return state === 0 ?
        (
            <div id="auth-modal" className="modal bottom-sheet">
                <div className="modal-content">
                    <h4>Восстановление пароля</h4>
                    <p>Введите Email или Login</p>
                    <input type="text" value={recovery} name="recovery" onChange={changeHandler}/>
                </div>
                <div className="modal-footer">
                    <button className='btn modal-close' onClick={stopStateHandler}>Отмена</button>
                    <p className="waves-effect waves-green btn-flat" onClick={codeHandler}>Получить код восстановления</p>
                </div>
            </div>
        )
        :
        (
            <div id="auth-modal" className="modal bottom-sheet">
                <div className="modal-content">
                    <h4>Восстановление пароля</h4>
                    <input type="text"     name="code" placeholder='Введите код подтверждения' onChange={changeHandler} value={code}/>
                    <input type="password" name="one"  placeholder="Новы пароль"               onChange={changeHandler} value={oneNewPassword}/>
                    <input type="password" name="two"  placeholder="Повторите пароль"          onChange={changeHandler} value={twoNewPassword}/>
                </div>
                <div className="modal-footer">
                    <button className='btn modal-close' onClick={stopStateHandler}>Отмена</button>
                    <p className="waves-effect waves-green btn-flat modal-close" onClick={codeHandler}>Восстановить доступ</p>
                </div>
            </div>
        )
}

export const AuthPage = () => {
    const {loading, error, request, clearError} = useHttp(),
        message                                 = useMessage(),
        modal                                   = useModal();

    const auth                                  = useContext(AuthContext),
        ref                                     = useContext(RefContext);

    const [form, setForm] = useState({
        username: '',
        email   : '',
        password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
        modal(document.querySelector('#auth-modal'), {});
    }, [modal]);

    const changeHandler = event => {
        setForm({...form, [event.target.name] : event.target.value});
    };

    const registerHandler = async () => {
        try{
            const data = await request(
                path.register,
                "POST",
                {...form, ref});

            message(data.message);
        } catch (e) {}
    };

    const loginHandler = async () => {
        try{
            const data = await request(path.login, "POST", {...form});

            message(data.message);

            await auth.login(
                data.access_token,
                data.user._id,
                data.user.username,
                data.user.is_admin
            );

            if(data.forRef){
                ref.loginRef(data.forRef);
            }
        } catch (e) {}
    };


    return (
        <div className="auth-container" style={
            {
                background: `url(${back})`,
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }
        }>
            <h2>Войти</h2>
            <div className="card auth-card">
                <div className="card-content black-text">
                    <span className="card-title">Авторизация</span>

                    <div className="input-field black-text">
                        <input type="text" name='username' onChange={changeHandler}/>
                        <label>Имя</label>
                    </div>
                    <div className="input-field black-text">
                        <input type="text" name='email' onChange={changeHandler}/>
                        <label>Email</label>
                    </div>
                    <div className="input-field black-text">
                        <input type="password" name='password' onChange={changeHandler}/>
                        <label>Пароль</label>
                    </div>
                    <a style={{cursor: "pointer"}} className="modal-trigger" href="#auth-modal">Забыл пароль</a>
                </div>
                <div className="card-action">
                    <button className='btn auth-btn' onClick={loginHandler} disabled={loading}><p>Авторизация</p></button>
                    <button className='btn register-btn' onClick={registerHandler} disabled={loading}><p>Регистрация</p></button>
                </div>
            </div>
            <Modal />
        </div>
    );
};