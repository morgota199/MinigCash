import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../../../../../hooks/http.hook";
import {AuthContext} from "../../../../../context/auth.context";
import {useMessage} from "../../../../../hooks/message.hook";
import ipapi from "ipapi.co";
import path from "../../../../../path.config";

export const BitcoinContent = ({ props }) => {
    const { request } = useHttp(),
        message = useMessage();

    const auth = useContext(AuthContext);

    const [USD, setUsd] = useState(null),
        [GHS, setGHS] = useState(0),
        [form, setForm] = useState({number: null, BTC: 0});

    const changeHandler = event => {
        form.BTC = +form.BTC;

        setForm({...form, [event.target.name] : event.target.value });
    };

    const sendHandler = async () => {
        if(!props) {
            if (+(form.BTC * USD).toFixed(2) >= 5) {
                const data = await request(
                    path.payment + '/bitcoin',
                    "POST",
                    {
                        number: `${form.number}`,
                        money: +form.BTC,
                        ghs: +(form.BTC * USD).toFixed(2)
                    },
                    {"Authorization": `Bearer ${auth.token}`}
                );

                return message(data.message);
            }

            return message("Минимальное пополнение Gh/s: 5");
        } else {
            if(form.BTC > 0) {
                const location = async ip => {
                    const data = await request(
                        path.payout + '/bitcoin',
                        "POST",
                        {
                            number: `${form.number}`,
                            money: +form.BTC,
                            IP: ip,
                            exchange: 1
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
            const data = await request('https://api.coincap.io/v2/rates/bitcoin');
            setUsd(data.data.rateUsd);
        })();
    }, [request]);

    useEffect(() => {
        if(USD){
            setGHS(form.BTC * USD);
        }
    }, [form, USD]);

    if(!props) {
        return (
            <div className='row-pay'>
                <div className="row">
                    <form className="row-item col s12">
                        <div className="row-item-cont">
                            <div className="row-block">
                                <span className="helper-text">Bitcoin кoшелек</span>
                                <div className="input-field col s12 in-val">
                                    <input id="text-in"
                                           type="text"
                                           className="validate"
                                           name="number"
                                           placeholder="3Kse9Kt6uvdr93vMjzvrLTTcKoVUxnDFbC"
                                           onChange={changeHandler}
                                    />
                                </div>
                            </div>
                            <div className="row-block">
                                <span className="helper-text">Отправляем сумму BTC</span>
                                <div className="input-field col s12 in-val">
                                    <input id="text-in"
                                           name="BTC"
                                           type="number"
                                           className="validate"
                                           placeholder="0"
                                           onChange={changeHandler}
                                    />
                                </div>
                            </div>
                            <div className="row-block">
                                <span className="helper-text">Получаем сумму Gh/s:</span>
                                <div className="input-field col s12 in-val">
                                    <input id="text-in"
                                           type="number"
                                           className="validate"
                                           value={GHS.toFixed(2)}
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
                            <span className="helper-text">Bitcoin кoшелек</span>
                            <div className="input-field col s12 in-val">
                                <input id="text-in"
                                       type="text"
                                       className="validate"
                                       name="number"
                                       placeholder="3Kse9Kt6uvdr93vMjzvrLTTcKoVUxnDFbC"
                                       onChange={changeHandler}
                                />
                            </div>
                        </div>
                        <div className="row-block">
                            <span className="helper-text">Вывести сумму BTC</span>
                            <div className="input-field col s12 in-val">
                                <input id="text-in"
                                       type="number"
                                       className="validate"
                                       name="BTC"
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