import React, {useContext} from "react";
import {AuthContext} from "../context/auth.context";
import {NavLink} from "react-router-dom";

import "../style/TariffsPage.css";
import back from "../image/dmitry-demidko-OG3A-ilG8AY-unsplash.png";

const Tariff = (prop) => {
    const {isAuth} = useContext(AuthContext);
    return(
        <li className="tariff">
            <div className="tariff-logo">
                <h2>{prop.percent}%</h2>
                <p>в день</p>
            </div>
            <div className="tariff-info">
                <p>Сумма инвестиций</p>
                <div className="tariff-line">
                    <span>Min</span>
                    <span>{prop.min}</span>
                </div>
                <div className="tariff-line">
                    <span>Max</span>
                    <span>{prop.max}</span>
                </div>
                {isAuth ? <NavLink to="/replenish" className='btn invest-btn'><p>Инвестировать</p></NavLink> : null}
            </div>
        </li>
    )
};

export const TariffsPage = () => {
    const tariffsData = [
        { id: 1, percent: 1.2, min: 5, max: 149 },
        { id: 2, percent: 1.5, min: 150, max: 499 },
        { id: 3, percent: 1.7, min: 500, max: 1499 },
        { id: 4, percent: 2, min: 1500, max: 2999 },
        { id: 5, percent: 2.5, min: 3000, max: '\u221E' }
    ];


    return (
        <div className="tariffs-wrapper" style={
            {
                background: `url(${back})`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }
        }>
            <div className="tariffs-container">
                <div className="tariffs-logo">
                    <h1 className="tariffs-title">Тарифные планы</h1>
                    <p><span>Тарифы MiningCash одни из самых выгодных для облачного майнинга</span></p>
                </div>
                <ul className="tariffs">
                    {
                        tariffsData.map(t => <Tariff key={t.id} percent={t.percent} min={t.min} max={t.max}/>)
                    }
                </ul>
            </div>
        </div>
    )
};