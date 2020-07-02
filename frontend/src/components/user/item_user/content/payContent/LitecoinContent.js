import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../../../../../hooks/http.hook";
import {AuthContext} from "../../../../../context/auth.context";
import {useMessage} from "../../../../../hooks/message.hook";
import ipapi from "ipapi.co";
import path from "../../../../../path.config";

export const LitecoinContent = ({ props }) => {
    const { request } = useHttp(),
        message = useMessage();

    const auth = useContext(AuthContext);

    const [USD, setUsd] = useState(null),
        [GHS, setGHS] = useState(0),
        [form, setForm] = useState({number: null, LTC: 0});

    const changeHandler = event => {
        form.LTC = +form.LTC;

        setForm({...form, [event.target.name] : event.target.value });
    };

    const sendHandler = async () => {
        if(!props) {
            if (+(form.LTC * USD).toFixed(2) >= 5) {
                const data = await request(
                    path.payment + "/litecoin",
                    "POST",
                    {
                        number: `${form.number}`,
                        money: +form.LTC,
                        ghs: +(form.LTC * USD).toFixed(2)
                    },
                    {"Authorization": `Bearer ${auth.token}`}
                );

                return message(data.message);
            }

            return message("Минимальное пополнение Gh/s: 5");
        } else {
            if(form.LTC > 0) {
                const location = async ip => {
                    const data = await request(
                        path.payout + "/litecoin",
                        "POST",
                        {
                            number: `${form.number}`,
                            money: +form.LTC,
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
            const data = await request('https://api.coincap.io/v2/rates/litecoin');

            setUsd(data.data.rateUsd);
        })();
    }, [request]);

    useEffect(() => {
        if(USD){
            setGHS(form.LTC * USD);
        }
    }, [form, USD]);

    if(!props) {
        return (
            <div className='row-pay'>
                <div className="row">
                    <form className="row-item col s12">
                        <div className="row-item-cont">
                            <div className="row-block">
                                <span className="helper-text">Litecoin кoшелек</span>
                                <div className="input-field col s12 in-val">
                                    <input id="text-in"
                                           type="text"
                                           className="validate"
                                           name='number'
                                           placeholder="LRiHfG6xrMMwkV95FuNcMCuk1AmQRnmiLS"
                                           onChange={changeHandler}
                                    />
                                </div>
                            </div>
                            <div className="row-block">
                                <span className="helper-text">Отправляем сумму LTC</span>
                                <div className="input-field col s12 in-val">
                                    <input id="text-in"
                                           name="LTC"
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
                            <span className="helper-text">Litecoin кoшелек</span>
                            <div className="input-field col s12 in-val">
                                <input id="text-in"
                                       type="text"
                                       className="validate"
                                       name="number"
                                       placeholder="LRiHfG6xrMMwkV95FuNcMCuk1AmQRnmiLS"
                                       onChange={changeHandler}
                                />
                            </div>
                        </div>
                        <div className="row-block">
                            <span className="helper-text">Вывести сумму LTC</span>
                            <div className="input-field col s12 in-val">
                                <input id="text-in"
                                       type="number"
                                       className="validate"
                                       name="LTC"
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