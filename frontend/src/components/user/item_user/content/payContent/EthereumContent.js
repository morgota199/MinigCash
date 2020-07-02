import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../../../../../hooks/http.hook";
import {AuthContext} from "../../../../../context/auth.context";
import {useMessage} from "../../../../../hooks/message.hook";
import ipapi from "ipapi.co";
import path from "../../../../../path.config";

export const EthereumContent = ({ props }) => {
    const { request } = useHttp(),
        message = useMessage();

    const auth = useContext(AuthContext);

    const [USD, setUsd] = useState(null),
        [GHS, setGHS] = useState(0),
        [form, setForm] = useState({number: null, ETC: 0});

    const changeHandler = event => {
        form.ETC = +form.ETC;

        setForm({...form, [event.target.name] : event.target.value });
    };

    const sendHandler = async () => {
        if(!props) {
            if (+(form.ETC * USD).toFixed(2) >= 5) {
                const data = await request(
                    path.payment + "/ethereum",
                    "POST",
                    {
                        number: `${form.number}`,
                        money: +form.ETC,
                        ghs: +(form.ETC * USD).toFixed(2)
                    },
                    {"Authorization": `Bearer ${auth.token}`}
                );

                return message(data.message);
            }

            return message("Минимальное пополнение Gh/s: 5");
        } else {
            if(form.ETC > 0) {
                const location = async ip => {
                    const data = await request(
                        path.payout + '/ethereum',
                        "POST",
                        {
                            number: `${form.number}`,
                            money: +form.ETC,
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
            const data = await request('https://api.coincap.io/v2/rates/ethereum');

            setUsd(data.data.rateUsd);
        })();
    }, [request]);

    useEffect(() => {
        if(USD){
            setGHS(form.ETC * USD);
        }
    }, [form, USD]);

    if(!props){
        return (
            <div className='row-pay'>
                <div className="row">
                    <form className="row-item col s12">
                        <div className="row-item-cont">
                            <div className="row-block">
                                <span className="helper-text">Ethereum кoшелек</span>
                                <div className="input-field col s12 in-val">
                                    <input id="text-in"
                                           type="text"
                                           className="validate"
                                           name="number"
                                           placeholder="0x493c4afb73b490e988650b9758e7736c72af748f"
                                           onChange={changeHandler}
                                    />
                                </div>
                            </div>
                            <div className="row-block">
                                <span className="helper-text">Отправляем сумму ETC</span>
                                <div className="input-field col s12 in-val">
                                    <input id="text-in"
                                           name="ETC"
                                           type="number"
                                           className="validate"
                                           placeholder="0"
                                           onChange={changeHandler}
                                    />
                                </div>
                            </div>
                            <div className="row-block">
                                <span className="helper-text">Получаем сумму Gh/s</span>
                                <div className="input-field col s12 in-val">
                                    <input id="text-in"
                                           type="number"
                                           className="validate"
                                           value={ GHS.toFixed(2) }
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
                            <span className="helper-text">Ethereum кoшелек</span>
                            <div className="input-field col s12 in-val">
                                <input id="text-in"
                                       type="text"
                                       className="validate"
                                       name="number"
                                       placeholder="0x493c4afb73b490e988650b9758e7736c72af748f"
                                       onChange={changeHandler}
                                />
                            </div>
                        </div>
                        <div className="row-block">
                            <span className="helper-text">Вывести сумму ETC</span>
                            <div className="input-field col s12 in-val">
                                <input id="text-in"
                                       type="number"
                                       className="validate"
                                       name="ETC"
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