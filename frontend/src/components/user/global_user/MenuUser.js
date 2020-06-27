import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext, BalanceContext, RefContext } from "../../../context/auth.context";

import "../../../style/MenuUser.css";
import miningImage from "../../../image/Path 15.png";
import chatImage from "../../../image/chat-24px.png";
import keyImage from "../../../image/key-silhouette-security-tool-interface-symbol-of-password_icon-icons.com_54503 (1).png";
import exitImage from "../../../image/exit_icon-icons.com_70975.png";
import peopleImage from "../../../image/group-of-people-in-white-a-black-rounded-square_icon-icons.com_70722.png";
import coinImage from "../../../image/coin_currency_dollar_finance_money_payment_wallet_icon_123189.png";
import toolsImage from "../../../image/edit-tools.png";

export const MenuUser = () => {
    const auth   = useContext(AuthContext),
        balance  = useContext(BalanceContext),
        ref      = useContext(RefContext),
        history  = useHistory();

    const logoutHandler = async event => {
        event.preventDefault();

        await ref.logoutRef();
        await auth.logout();
        await balance.offBalance();


        history.push('/auth');
    };

    if(auth.admin){
        return (
            <div className="collection menu-user">
                <NavLink to="/mining" className="collection-item">
                    <img src={miningImage} alt="mining"/>
                    Майнинг
                </NavLink>


                <NavLink to="/user/pay/payeer" className="collection-item">
                    <img src={coinImage} alt="coin"/>
                    Вывод денег
                </NavLink>


                <NavLink to="/user/ref/my-ref" className="collection-item">
                    <img src={peopleImage} alt="people"/>
                    Партнерская система
                </NavLink>


                <NavLink to="/user/admin/news-tools" className="collection-item">
                    <img src={toolsImage} alt="tools"/>
                    Админ панель
                </NavLink>


                <NavLink to="/user/select-password" className="collection-item">
                    <img src={keyImage} alt="key"/>
                    Смена пароля
                </NavLink>


                <NavLink to='/menu' className='collection-item' onClick={logoutHandler}>
                    <img src={exitImage} alt="exit"/>
                    Выход
                </NavLink>


            </div>
        );
    }

    return (
        <div className="collection menu-user">
            <NavLink to="/mining" className="collection-item">
                <img src={miningImage} alt="mining"/>
                Майнинг
            </NavLink>


            <NavLink to="/user/pay/payeer" className="collection-item">
                <img src={coinImage} alt="coin"/>
                Вывод денег
            </NavLink>


            <NavLink to="/user/ref/my-ref" className="collection-item">
                <img src={peopleImage} alt="people"/>
                Партнерская система
            </NavLink>


            <NavLink to="/ticets" className="collection-item">
                <img src={chatImage} alt="chat"/>
                Тикет
            </NavLink>


            <NavLink to="/user/select-password" className="collection-item">
                <img src={keyImage} alt="key"/>
                Смена пароля
            </NavLink>


            <NavLink to='/menu' className='collection-item' onClick={logoutHandler}>
                <img src={exitImage} alt="exit"/>
                Выход
            </NavLink>
        </div>
    );
};