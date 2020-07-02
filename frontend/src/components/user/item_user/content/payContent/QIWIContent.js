import {AuthContext} from "../../../../../context/auth.context";
import React, {useContext, useEffect, useState} from "react";
import {useMessage} from "../../../../../hooks/message.hook";
import {useHttp} from "../../../../../hooks/http.hook";
import ipapi from "ipapi.co";
import path from "../../../../../path.config";

export const QIWIContent = (props) => {
    const { request, error, clearError } = useHttp(),
        auth        = useContext(AuthContext),
        message     = useMessage();

    const [rub, setRub] = useState({
        rub : null
    });

    const [form, setForm] = useState({
        number : null,
        RUB: 0
    });

    const changeHandler = event => {
        form.number = Number(form.number);
        form.RUB = Number(form.RUB);

        setForm({...form, [event.target.name] : event.target.value });
    };

    const sendHandler = async () => {
        if(!props.props){
            if((form.RUB / rub).toFixed(2) >= 5){
                const data = await request(
                    path.payment + "/qiwi",
                    "POST",
                    {
                        number: `${form.number}`,
                        money: +form.RUB,
                        ghs: +(form.RUB / rub).toFixed(2)
                    },
                    {"Authorization": `Bearer ${auth.token}`}
                );

                return message(data.message);
            }

            return message("Минимальное пополнение Gh/s: 5");
        } else {
            if(form.RUB > 0) {
                const location = async ip => {
                    const data = await request(
                        path.payout + "/qiwi",
                        "POST",
                        {
                            number: `${form.number}`,
                            money: +form.RUB,
                            IP: ip,
                            exchange: +rub
                        },
                        {"Authorization": `Bearer ${auth.token}`}
                    );

                    message(data.message);
                };

                ipapi.location(location, '', '', 'ip');
            } else {
                message("Данная сумма не доступна");
            }
        }
    };

    useEffect(() => {
        (async () => {
            const coors = await fetch('https://api.exchangeratesapi.io/latest?symbols=USD,RUB');
            const coorsData = await coors.json();

            setRub(coorsData.rates.RUB);
        })();
    }, []);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    if(!props.props){
        return (
            <div className='row-pay'>
                <div className="row">
                    <form className="row-item col s12">
                        <div className="row-item-cont">
                            <div className="row-block">
                                <span className="helper-text">QIWI кoшелек</span>
                                <div className="input-field col s12 in-val">
                                    <input
                                        id="text-in"
                                        type="number"
                                        className="validate"
                                        name='number'
                                        placeholder="380639999999"
                                        onChange={changeHandler}
                                    />
                                </div>
                            </div>
                            <div className="row-block">
                                <span className="helper-text">Отправляем сумму RUB</span>
                                <div className="input-field col s12 in-val">
                                    <input
                                        id="text-in"
                                        type="number"
                                        className="validate"
                                        name="RUB"
                                        placeholder="0"
                                        onChange={changeHandler}
                                    />
                                </div>
                            </div>
                            <div className="row-block">
                                <span className="helper-text">Получаем сумму GH/s</span>
                                <div className="input-field col s12 in-val">
                                    <input
                                        id="text-in"
                                        type="number"
                                        className="validate"
                                        value={(form.RUB / rub).toFixed(2)}
                                    />
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
                            <span className="helper-text">QIWI кoшелек</span>
                            <div className="input-field col s12 in-val">
                                <input id="text-in"
                                       type="text"
                                       className="validate"
                                       name="number"
                                       placeholder="380639999999"
                                       onChange={changeHandler}
                                />
                            </div>
                        </div>
                        <div className="row-block">
                            <span className="helper-text">Вывести сумму RUB</span>
                            <div className="input-field col s12 in-val">
                                <input
                                    id="text-in"
                                    type="number"
                                    className="validate" name="RUB"
                                    placeholder="0"
                                    onChange={changeHandler}
                                />
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