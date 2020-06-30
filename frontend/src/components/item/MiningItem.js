import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/auth.context";
import {useHttp} from "../../hooks/http.hook";
import {useModal} from "../../hooks/modals.hook";
import {EarningsForecast} from "../modal/EarningsForecast";
import {Modal} from "../modal/Modal";
import path from "../../path.config";

import "../../style/MiningItem.css"
import ethereumImage from "../../image/Path 3.png";
import litecoinImage from "../../image/ltc-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment_95207.png";
import bitcoinImage  from "../../image/btc-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment_95084.png";
import usdImage      from "../../image/start-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment_95235.png";
import {storage} from "../../storage.config";

export const MiningItem = (props) => {
    const {token} = useContext(AuthContext);

    const {request} = useHttp(),
        modalOne = useModal(),
        modalTwo = useModal();

    const [power, setPower] = useState(props.power),
        [maxPower, setMaxPower] = useState(100 -
            JSON.parse(localStorage.getItem(storage.mining))
                .filter(storage => storage.name !== props.name)
                .map(mining => mining.power)
                .reduce((a, b) => a + b)
        );

    useEffect(() => {
        modalOne(document.querySelector(`#${props.name}`), {});
        modalTwo(document.querySelector(`#${props.name + "earnings"}`), {});
    }, [])

    useEffect(() => {
        setMaxPower(100 -
            JSON.parse(localStorage.getItem(storage.mining))
                .filter(stor => stor.name !== props.name)
                .map(mining => mining.power)
                .reduce((a, b) => a + b)
        );
    }, [localStorage.getItem(storage.mining), props.name, setMaxPower]);

    const changeHandler = event => {
        if(+(event.target.value) <= maxPower){
            setPower(+(event.target.value));

            localStorage.setItem(storage.mining,
                JSON.stringify(
                    JSON.parse(
                        localStorage.getItem(storage.mining)
                    )
                        .map(storage => {
                            if(storage.name === props.name){
                                storage.power = +(event.target.value);
                            }
                            return storage;
                        })
                )
            );
        }
    };

    const saveHandler = async () => {
        try{
            await request(path.power, "PUT", {name: props.name, value: power}, {"Authorization": `Bearer ${token}`});
        } catch (e) {}
    };

    return (
        <div className='mining-block' >
            <div className="left-container">
                <div className="balance-container">
                    <span>
                        { props.name === "Ethereum" ? <img src={ethereumImage} alt="ethereum"/> : null }
                        { props.name === "Litecoin" ? <img src={litecoinImage} alt="litecoin"/> : null }
                        { props.name === "Bitcoin"  ? <img src={bitcoinImage}  alt="bitcoin" /> : null }
                        { props.name === "USD"      ? <img src={usdImage}      alt="usd"/>      : null }
                        { props.name }</span>
                    <div className="balance-image">
                        <span>Баланс: <span>{ props.balance.toFixed(12) }</span></span>
                    </div>
                </div>
                <a className="modal-trigger" href={`#${props.name + "earnings"}`}>Прогноз зароботка</a>
                <div className="range-container">
                    <input
                        className='range'
                        value={ power }
                        type="range"
                        min="0"
                        max="100"
                        onChange={changeHandler}
                        onMouseUp={saveHandler}
                    />
                    <span>{ power }%</span>
                </div>
                <div className="mining-btn">
                    <a className="modal-trigger btn" href={`#${props.name}`}>Обменять Gh/s</a>
                    <a className="btn" href={props.name === "USD" ? "/user/pay/payeer" : "/user/pay/" + props.name.toLowerCase()}>Вывести средства</a>
                </div>
            </div>
            <Modal name={props.name} balance={props.balance}/>
            <EarningsForecast name={props.name}/>
        </div>
    );
};
