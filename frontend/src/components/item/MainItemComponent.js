import React, {useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import path from "../../path.config"

import '../../style/MainItemComponent.css'

export const MainItemComponent = () => {
    const {request} = useHttp();

    const [payIn, setPayIn] = useState([]),
        [payOut, setPayOut] = useState([])

    useEffect(() => {
        (async () => {
            const data = await request(path.transaction);

            if(data && data.payment && data.payouts) {
                setPayIn(data.payment);
                setPayOut(data.payouts);
            }
        })()
    }, [request])



    return (
        <div className="main-pay-block">
            <div className="main-pay-container">
                <ul className='collection pay-collection-container pay-left-collection'
                    style={
                        {backgroundColor: 'rgba(163, 179, 62, 0.35)'}
                    }>
                    <li className='collection-item'
                     style={
                         {
                             backgroundColor: 'rgba(163, 179, 62, 0.35)',
                             borderTop: "1px solid #707070"
                         }
                     }>Пополнили</li>
                    {
                        payIn.map((i, n) => {
                            let val = '';
                            switch (i.system) {
                                case "Ethereum":
                                    val = "ETC";
                                    break;
                                case "Bitcoin":
                                    val = "BTC";
                                    break;
                                case "Litecoin":
                                    val = "LTC";
                                    break;
                                case "Payeer":
                                    val = "$";
                                    break;
                                case "Qiwi":
                                    val = "RUB";
                                    break;
                            }

                            return(
                                <li key={n} className='collection-item pay-collection'
                                    style={{backgroundColor: 'rgba(163, 179, 62, 0.35)'}
                                    }>
                                    <p>{i.username}</p>
                                    <p>{i.money} {val}</p>
                                </li>
                            )
                        })
                    }
                </ul>
                <ul className='collection pay-collection-container pay-right-collection'
                    style={{backgroundColor: 'rgba(163, 179, 62, 0.35)'}
                    }>
                    <li className='collection-item'
                        style={
                            {
                                backgroundColor: 'rgba(163, 179, 62, 0.35)',
                                borderTop: "1px solid #707070"
                            }
                        }>Вывели</li>
                    {
                        payOut.map((o, n) => {
                            let val = '';
                            switch (o.system) {
                                case "Ethereum":
                                    val = "ETC";
                                    break;
                                case "Bitcoin":
                                    val = "BTC";
                                    break;
                                case "Litecoin":
                                    val = "LTC";
                                    break;
                                case "Payeer":
                                    val = "$";
                                    break;
                                case "Qiwi":
                                    val = "RUB";
                            }
                            return(
                                <li key={n} className='collection-item pay-collection'
                                    style={{backgroundColor: 'rgba(163, 179, 62, 0.35)'}
                                    }>
                                    <p>{o.username}</p>
                                    <p>{o.money} {val}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}