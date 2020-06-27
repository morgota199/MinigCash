import React, {useContext, useEffect, useState} from "react";
import {BalanceContext} from "../../context/auth.context";
import {useHttp} from "../../hooks/http.hook";

export const EarningsForecast = ({name}) => {
    const balance= useContext(BalanceContext);
    const times = [1, 30.4167, 91.2501, 182.5, 365, 730];

    const [tables, setTables] = useState([0, 0, 0, 0, 0, 0]),
        [power, setPower] = useState(null)

    const { request } = useHttp();

    useEffect(() => {setPower(JSON.parse(localStorage.getItem("miningData")).filter(m => m.name === name)[0].power);
    },[JSON.parse(localStorage.getItem("miningData")).filter(m => m.name === name)[0].power])


    useEffect( () => {
        (
            async () => {
                switch (name) {
                    case "USD":
                        setTables(times.map(t => (((balance.balance.GHS * 0.012) * t) * power) / 100));
                        break;
                    case "Bitcoin":
                        const bitcoin = await request('https://api.coincap.io/v2/rates/bitcoin');
                        if (bitcoin.data && bitcoin.data.rateUsd) setTables(times.map(t => (((+bitcoin.data.rateUsd * (balance.balance.GHS * 0.012)) * t) * power) / 100));
                        break;
                    case "Litecoin":
                        const litecoin = await request('https://api.coincap.io/v2/rates/litecoin');
                        if (litecoin.data && litecoin.data.rateUsd) setTables(times.map(t => (((+litecoin.data.rateUsd * (balance.balance.GHS * 0.012)) * t) * power) / 100));
                        break;
                    case "Ethereum":
                        const ethereum = await request('https://api.coincap.io/v2/rates/ethereum');
                        if (ethereum.data && ethereum.data.rateUsd) setTables(times.map(t => (((+ethereum.data.rateUsd * (balance.balance.GHS * 0.012)) * t) * power) / 100));
                        break;
                    default:
                        break;
                }
            }
        )()
    }, [power]);

    return (
        <div id={name + "earnings"} className="modal">
            <div className="modal-content">
                <h4>{name}</h4>
                <h6>Прогноз зароботка</h6>
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
                                    default:
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
            <div className="modal-footer">
                <p className="modal-close waves-effect waves-green btn-flat">Ok</p>
            </div>
        </div>
    )
}