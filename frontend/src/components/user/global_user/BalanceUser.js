import React, { useEffect, useState} from "react";

import "../../../style/BalanceUser.css";
import bitcoinImage from "../../../image/btc-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment_95084.png";
import ghsImage from "../../../image/ctr-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment_95094.png";
import ethereumImage from "../../../image/Path 3.png";
import litecoinImage from "../../../image/ltc-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment_95207.png";
import usdImage from "../../../image/start-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment_95235.png";

export const BalanceUser = () => {
    const [localBalance, setLocalBalance] = useState(JSON.parse(localStorage.getItem('balanceData')));

    useEffect(() => {
        if(localStorage.getItem('balanceData') !== localBalance) setLocalBalance(JSON.parse(localStorage.getItem('balanceData')));
    }, [localStorage.getItem('balanceData')]);

    return (
        <div className="balance">
            <div className="balance-item">
                <div className='val'>
                    <span><img src={ghsImage} alt="ghs"/>GHS</span>
                </div>
                <div className="num">
                    <p>{(localBalance.GHS).toFixed(12)}</p>
                </div>
            </div>
            <div className="balance-item">
                <div className="val">
                    <span><img src={bitcoinImage} alt="bitcoin"/>Bitcoin</span>
                </div>
                <div className="num">
                    <p>{(localBalance.BITCOIN).toFixed(12)}</p>
                </div>
            </div>
            <div className="balance-item">
                <div className="val">
                    <span><img src={ethereumImage} alt="ethereum"/>Etherium</span>
                </div>
                <div className="num">
                    <p>{(localBalance.ETHEREUM).toFixed(12)}</p>
                </div>
            </div>
            <div className="balance-item">
                <div className="val">
                    <span><img src={litecoinImage} alt="litecoin"/>Litecoin</span>
                </div>
                <div className="num">
                    <p>{(localBalance.LITECOIN).toFixed(12)}</p>
                </div>
            </div>
            <div className="balance-item">
                <div className="val">
                    <span><img src={usdImage} alt="usd"/>USD</span>
                </div>
                <div className="num">
                    <p>{(localBalance.USD).toFixed(12)}</p>
                </div>
            </div>
            <div className="balance-item">
                <div className="val">
                    <span>Партнеры</span>
                </div>
                <div className="num">
                    <p>{(localBalance.REF_MONEY).toFixed(12)}</p>
                </div>
            </div>
        </div>
    );
};