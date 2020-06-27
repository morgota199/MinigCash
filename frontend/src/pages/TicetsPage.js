import React from "react";
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import {TicetsAllContent} from "../components/user/item_user/content/ticetsContent/TicetsAllContent";
import {TicetsNewContent} from "../components/user/item_user/content/ticetsContent/TicetsNewContent";

import "../style/TicetsPage.css";
import back from "../image/rupixen-com-Q59HmzK38eQ-unsplash.png";

export const TicetsPage = () => {
    return (
        <div className="ticet-container" style={
            {
                background: `url(${back})`,
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }
        }>
            <div className="logo">
                <h4>Тикет</h4>
            </div>
            <div className="logo">
                <span>Задайте свой вопрос, и мы ответим вам в ближайшее время</span>
            </div>
            <ul className="pay-selector">
                <li><NavLink to='/ticets/all'><button className="btn">Все</button></NavLink></li>
                <li><NavLink to='/ticets/new'><button className="btn">Новый</button></NavLink></li>
            </ul>
            <Switch>
                <Route path='/ticets/all' component={TicetsAllContent}/>
                <Route path='/ticets/new' component={TicetsNewContent}/>
                <Redirect to="/ticets/all"/>
            </Switch>
        </div>
    )
};