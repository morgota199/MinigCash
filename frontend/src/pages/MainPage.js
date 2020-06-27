import React, {useContext} from "react";
import {MainItemComponent} from "../components/item/MainItemComponent";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../context/auth.context";

import '../style/MainPage.css'
import back from '../image/dmitry-demidko-OG3A-ilG8AY-unsplash.png'

export const MainPage = () => {
    const {isAuth} = useContext(AuthContext)

    return (
        <div className="main-container" style={
            {
                background: `url(${back})`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }
        }>
            <div className="logo">
                <h1>MiningCash</h1>
            </div>
            <div className="content-wrapper">
                <div className="left-block">
                    <div className="content">
                        <h3>Заработок в интернете - это просто</h3>
                        <div className="text">
                            <p>Инвестиции в облачный майнинг на нашем ресурсе являются наиболее разумным шагом в сохранении и приумножении ваших криптовалютных сбережений.<br/>
                                Если в двух словах – это упрощенный майнинг Bitcoin, Litecoin и Ethereum, освобождающий вас от:   затрат на электричество, круглосуточный контроль, программное обеспечение и других расходов, связанных с классическим майнингом.</p>
                        </div>
                        {
                            !isAuth ? <NavLink to="/auth" className='btn main-login' activeClassName='active'><p>Зарегистрироваться</p></NavLink> : null
                        }
                    </div>
                </div>
                <MainItemComponent />
            </div>
        </div>
    )
};