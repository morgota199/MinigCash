import React, {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";

import "../style/CalculatePage.css";
import back from "../image/dmitry-demidko-OG3A-ilG8AY-unsplash.png";

export const CalculatePage = () => {
    const times = [1, 30.4167, 91.2501, 182.5, 365, 730];

    const [tables, setTables] = useState([0, 0, 0, 0, 0, 0]),
        [currency, setCurrency] = useState('USD'),
        [col, setCol] = useState(0);

    const { request } = useHttp();

    useEffect( () => {
        if(col >= 0) {
            (
                async () => {
                    switch (currency) {
                        case "USD":
                            setTables(times.map(t => (col * 0.012) * t));
                            break;
                        case "Bitcoin":
                            const bitcoin = await request('https://api.coincap.io/v2/rates/bitcoin');
                            if (bitcoin.data && bitcoin.data.rateUsd) setTables(times.map(t => (+bitcoin.data.rateUsd * (col * 0.012)) * t));
                            break;
                        case "Litecoin":
                            const litecoin = await request('https://api.coincap.io/v2/rates/litecoin');
                            if (litecoin.data && litecoin.data.rateUsd) setTables(times.map(t => (+litecoin.data.rateUsd * ((col * 0.012)) * t)));
                            break;
                        case "Ethereum":
                            const ethereum = await request('https://api.coincap.io/v2/rates/ethereum');
                            if (ethereum.data && ethereum.data.rateUsd) setTables(times.map(t => (+ethereum.data.rateUsd * (col * 0.012)) * t));
                            break;
                        default:
                            break;
                    }
                }
            )()
        }
    }, [col, currency]);

    const changeHandler = e => {
        setCol(e.target.value);
    };

    const currencyHandler = e => {
        setCurrency(e.target.name);
    };

    return (
        <div className="calculate" style={
            {
                background: `url(${back})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "cover"
            }
        }>
            <div className="calculate-wrapper">
                <h1>Расчитать суму зароботка</h1>
                <div className="input-field col s6">
                    <input id="last_name" type="number" className="validate" onChange={changeHandler}/>
                    <label htmlFor="last_name">Сумма инвестиций $</label>
                </div>
                <div className="selector-current">
                    <ul className="pay-selector">
                        <li><button className="btn" name="USD"      onClick={currencyHandler}>USD</button></li>
                        <li><button className="btn" name="Bitcoin"  onClick={currencyHandler}>Bitcoin</button></li>
                        <li><button className="btn" name="Litecoin" onClick={currencyHandler}>Litecoin</button></li>
                        <li><button className="btn" name="Ethereum" onClick={currencyHandler}>Ethereum</button></li>
                    </ul>
                </div>
                <div className="calculate-block">
                    <div className="calculate-tables">
                        {
                            tables.map(
                                (t, i) => {
                                    let time = ''
                                    switch (i) {
                                        case 0:
                                            time = '1 день'
                                            break;
                                        case 1:
                                            time = '1 месяц'
                                            break;
                                        case 2:
                                            time = '3 месяца'
                                            break;
                                        case 3:
                                            time = '6 месяцев'
                                            break;
                                        case 4:
                                            time = '1 год'
                                            break;
                                        case 5:
                                            time = '2 года'
                                            break;
                                    }
                                    return(
                                        <div className="calculate-th" key={i}>
                                            <div className="time">
                                                <p>{time}</p>
                                            </div>
                                            <div className="cell">
                                                <p>{t.toFixed(12)}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};