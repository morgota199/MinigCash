import React, {useContext, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/auth.context";
import {useSidenav} from "../../hooks/sidenav.hook";

import '../../style/NavBar.css'

const Logo = () => {
    return (
        <div className="logo-wrapper sidenav-trigger" data-target="slide-out">
            <div className="logo-box">
                <div className="mining">
                    <p>MINING</p>
                </div>
                <div className="cash">
                    <p>CASH</p>
                </div>
            </div>
        </div>
    )
}

export const NavBarOffAuth = () => {
    const sidenav = useSidenav()
    const [hiddenSidenav, setHiddenSidenav] = useState(true)

    useEffect(() => {
        const lis =  () => window.innerWidth < 1050 ? setHiddenSidenav(true) : setHiddenSidenav(false)

        window.addEventListener("mousemove",lis)

        return () => window.removeEventListener("mousemove", lis)
    }, [])

    useEffect(() => {
        if(hiddenSidenav){
            sidenav(document.getElementById("slide-out"), {edge: "left", draggable: true})
        } else {
            sidenav(document.getElementById("slide-out"), {edge: "left", draggable: true}).destroy()
        }
    }, [hiddenSidenav])



    return (
        <nav>
            <div className="nav-wrapper nav-box">
                <Logo />
                <ul id="nav-mobile" className="right hide-on-med-and-down nav-selector">
                    <li><NavLink to="/"          activeClassName='active'>Главная</NavLink></li>
                    <li><NavLink to="/calculate" activeClassName='active'>Калькулятор</NavLink></li>
                    <li><NavLink to="/trafic"    activeClassName='active'>Тарифы</NavLink></li>
                    <li><NavLink to="/news"      activeClassName='active'>Новости</NavLink></li>
                    <li><NavLink to="/auth" className='btn nav-login' activeClassName='active'>Войти</NavLink></li>
                </ul>
                <ul id="slide-out" className="sidenav mobile-sidenav">
                    <li><NavLink to="/"          className="sidenav-close" activeClassName='active'>Главная</NavLink></li>
                    <li><NavLink to="/calculate" className="sidenav-close" activeClassName='active'>Калькулятор</NavLink></li>
                    <li><NavLink to="/trafic"    className="sidenav-close" activeClassName='active'>Тарифы</NavLink></li>
                    <li><NavLink to="/news"      className="sidenav-close" activeClassName='active'>Новости</NavLink></li>
                    <li><NavLink to="/auth"      className='btn nav-login sidenav-close' activeClassName='active'>Войти</NavLink></li>
                </ul>
            </div>
        </nav>
    )
};

export const NavBarOnAuth = () => {
    const {admin, userName} = useContext(AuthContext);
    const sidenav = useSidenav()
    const [hiddenSidenav, setHiddenSidenav] = useState(true)

    useEffect(() => {
        const lis =  () => window.innerWidth < 1050 ? setHiddenSidenav(true) : setHiddenSidenav(false)

        window.addEventListener("mousemove",lis)

        return () => window.removeEventListener("mousemove", lis)
    }, [])

    useEffect(() => {
        if(hiddenSidenav) sidenav(document.getElementById("slide-out"), {edge: "left", draggable: true})
        else sidenav(document.getElementById("slide-out"), {edge: "left", draggable: true}).destroy()
    }, [hiddenSidenav])

    if(admin){
        return (
            <nav>
                <div className="nav-wrapper">
                    <Logo/>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/"                                  activeClassName='active'>Главная</NavLink></li>
                        <li><NavLink to="/calculate"                         activeClassName='active'>Калькулятор</NavLink></li>
                        <li><NavLink to="/trafic"                            activeClassName='active'>Тарифы</NavLink></li>
                        <li><NavLink to="/replenish"                         activeClassName='active'>Пополнить</NavLink></li>
                        <li><NavLink to="/mining"                            activeClassName='active'>Майнинг</NavLink></li>
                        <li><NavLink to="/news"                              activeClassName='active'>Новости</NavLink></li>
                        <li><NavLink to="/user/admin/news-tools"             activeClassName='active'>Админ</NavLink></li>
                        <li><NavLink to="/mining" className="nav-login btn"  activeClassName='active'>{userName}</NavLink></li>
                    </ul>
                    <ul id="slide-out" className="sidenav mobile-sidenav">
                        <li><NavLink to="/"                       className="sidenav-close" activeClassName='active'>Главная</NavLink></li>
                        <li><NavLink to="/calculate"              className="sidenav-close" activeClassName='active'>Калькулятор</NavLink></li>
                        <li><NavLink to="/trafic"                 className="sidenav-close" activeClassName='active'>Тарифы</NavLink></li>
                        <li><NavLink to="/replenish"              className="sidenav-close" activeClassName='active'>Пополнить</NavLink></li>
                        <li><NavLink to="/mining"                 className="sidenav-close" activeClassName='active'>Майнинг</NavLink></li>
                        <li><NavLink to="/news"                   className="sidenav-close" activeClassName='active'>Новости</NavLink></li>
                        <li><NavLink to="/user/admin/news-tools"  className="sidenav-close" activeClassName='active'>Админ</NavLink></li>
                        <li><NavLink to="/mining"                 className="sidenav-close nav-login btn" activeClassName='active'>{userName}</NavLink></li>
                    </ul>
                </div>
            </nav>
        )
    }

    return (
        <nav>
            <div className="nav-wrapper">
                <Logo/>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/"            activeClassName='active'>Главная</NavLink></li>
                    <li><NavLink to="/calculate"   activeClassName='active'>Калькулятор</NavLink></li>
                    <li><NavLink to="/trafic"      activeClassName='active'>Тарифы</NavLink></li>
                    <li><NavLink to="/replenish"   activeClassName='active'>Пополнить</NavLink></li>
                    <li><NavLink to="/mining"      activeClassName='active'>Майнинг</NavLink></li>
                    <li><NavLink to="/news"        activeClassName='active'>Новости</NavLink></li>
                    <li><NavLink to="/ticets/all"  activeClassName='active'>Тикет</NavLink></li>
                    <li><NavLink to="/mining"      activeClassName='active'>{userName}</NavLink></li>
                </ul>
                <ul id="slide-out" className="sidenav mobile-sidenav">
                    <li><NavLink to="/"            className="sidenav-close" activeClassName='active'>Главная</NavLink></li>
                    <li><NavLink to="/calculate"   className="sidenav-close" activeClassName='active'>Калькулятор</NavLink></li>
                    <li><NavLink to="/trafic"      className="sidenav-close" activeClassName='active'>Тарифы</NavLink></li>
                    <li><NavLink to="/replenish"   className="sidenav-close" activeClassName='active'>Пополнить</NavLink></li>
                    <li><NavLink to="/mining"      className="sidenav-close" activeClassName='active'>Майнинг</NavLink></li>
                    <li><NavLink to="/news"        className="sidenav-close" activeClassName='active'>Новости</NavLink></li>
                    <li><NavLink to="/ticets/all"  className="sidenav-close" activeClassName='active'>Тикет</NavLink></li>
                    <li><NavLink to="/mining"      className="sidenav-close" activeClassName='active'>{userName}</NavLink></li>
                </ul>
            </div>
        </nav>
    )
};

