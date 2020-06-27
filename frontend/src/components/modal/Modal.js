import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/auth.context";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";

export const Modal = ({name, balance}) => {
    const {token} = useContext(AuthContext);

    const {request} = useHttp(),
        message = useMessage();

    const [exchangeRates, setExchangeRates] = useState(null),
        [money, setMoney] = useState(0);

    useEffect(() => {
        (
            async () => {
                switch (name) {
                    case "Ethereum":
                        const Ethereum = await request('https://api.coincap.io/v2/rates/ethereum');
                        setExchangeRates(Ethereum.data.rateUsd);
                        break;
                    case "Bitcoin":
                        const Bitcoin = await request('https://api.coincap.io/v2/rates/bitcoin');
                        setExchangeRates(Bitcoin.data.rateUsd);
                        break;
                    case "Litecoin":
                        const Litecoin = await request('https://api.coincap.io/v2/rates/litecoin');
                        setExchangeRates(Litecoin.data.rateUsd);
                        break;
                    case "USD":
                        setExchangeRates(1);
                        break;
                    default:
                        break;
                }
            }
        )();
    },[])

    const changeHandler = event => {
        setMoney(event.target.value);
    }

    const exchangeHandler = async () => {
        if(money > 0 && money <= balance){
            const data = await request("/user/exchange", "POST", {
                system: name,
                money,
                ghs:  (money * exchangeRates) - ((money * exchangeRates) * 0.02)
            }, {token});

            if(data && data.message) message(data.message);
        } else {
            message("Сумма для обмена не доступна");
        }
    }

    return (
        <div id={name} className="bottom-sheet modal">
            <div className="modal-content">
                <h4>Обменять на Gh/s <b>{name}</b></h4>
                <input type="number" onChange={changeHandler}/>
                <p>Вы получите: <b>{(money * exchangeRates) - ((money * exchangeRates) * 0.02)}</b></p>
            </div>
            <div className="modal-footer">
                <button className="modal-close waves-effect waves-green btn-flat">Отмена</button>
                <button className="modal-close waves-effect waves-green btn-flat" onClick={exchangeHandler}>Обменять</button>
            </div>
        </div>
    )
}