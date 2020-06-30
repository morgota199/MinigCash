import {AuthContext, BalanceContext} from "../../../../../context/auth.context";
import React, {useContext, useEffect, useState} from "react";
import {useMessage} from "../../../../../hooks/message.hook";
import {useHttp} from "../../../../../hooks/http.hook";
import ipapi from "ipapi.co";
import {storage} from "../../../../../storage.config";

export const PayeerContent = ({ props }) => {
    const { request, error, clearError } = useHttp(),
        balance     = useContext(BalanceContext),
        message     = useMessage(),
        auth        = useContext(AuthContext);

    const [form, setForm] = useState({
        number : null,
        USD: 0
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        form.USD = Number(form.USD);

        setForm({...form, [event.target.name] : event.target.value });
    };

    const sendHandler = async () => {
        if(!props){
            if(form.USD >= 5){
                const data = await request(
                    '/user/profile/pay-in/payeer',
                    "POST",
                    {
                        ...form,
                        ghs: form.USD
                    },
                    { token: auth.token }
                );

                if(data && data.money){
                    balance.setBalance(data.money);
                    localStorage.setItem(storage.balance, JSON.stringify(data.money));
                }

                return message(data.message);
            }

            return message("Минимальное пополнение Gh/s: 5");
        } else {
            if(form.USD > 0.5) {
                const location = async ip => {
                    const data = await request(
                        '/user/pay-out/payeer',
                        "POST",
                        {
                            ...form,
                            IP: ip
                        },
                        {token: auth.token}
                    );

                    message(data.message);
                };

                ipapi.location(location, '', '', 'ip');
            } else {
                message("Данная сумма не доступна");
            }
        }
    };

    if(!props){
        return (
            <div className='row-pay'>
                <div className="row">
                    <form className="row-item col s12">
                        <div className="row-item-cont">
                            <div className="row-block">
                                <span className="helper-text">Payeer кoшелек</span>
                                <div className="input-field col s12 in-val">
                                    <input id="text-in"
                                           type="text"
                                           className="validate"
                                           name="number"
                                           placeholder="P0000000000"
                                           onChange={changeHandler}/>

                                </div>
                            </div>
                            <div className="row-block">
                                <span className="helper-text">Отправляем сумму USD</span>
                                <div className="input-field col s12 in-val">
                                    <input
                                        id="text-in"
                                        type="number"
                                        name='USD'
                                        className="validate"
                                        placeholder="0"
                                        onChange={changeHandler}
                                    />
                                </div>
                            </div>
                            <div className="row-block">
                                <span>Получаем сумму Gh/s</span>
                                <div className="col s12 in-val">
                                    <input id="text-in" type="number" value={form.USD} defaultValue={0} className="validate" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="pay-btn">
                    <button className="btn" onClick={sendHandler}>Пополнить</button>
                </div>
            </div>
        );
    }

    return (
        <div className='row-pay'>
            <div className="row">
                <form className="row-item col s12">
                    <div className="row-item-cont">
                        <div className="row-block">
                            <span className="helper-text">Payeer кoшелек</span>
                            <div className="input-field col s12 in-val">
                                <input id="text-in"
                                       type="text"
                                       className="validate"
                                       name="number"
                                       placeholder="P0000000000"
                                       onChange={changeHandler}/>
                            </div>
                        </div>
                        <div className="row-block">
                            <span className="helper-text">Вывести сумму USD</span>
                            <div className="input-field col s12 in-val">
                                <input id="text-in"
                                       type="number"
                                       className="validate"
                                       name="USD"
                                       placeholder="0"
                                       onChange={changeHandler}/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="pay-btn">
                <button className="btn" onClick={sendHandler}>Вывести</button>
            </div>
        </div>
    );
};