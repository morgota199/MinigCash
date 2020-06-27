import React, {useContext, useState} from "react";
import {AuthContext, RefUserPayContext} from "../../context/auth.context";
import {AllReferralsItem} from "./RefItem/AllReferralsItem";
import {BannersItem} from "./RefItem/BannersItem";
import {NavLink, Route, Switch} from "react-router-dom";
import {RefUserPayItem} from "./RefItem/RefUserPayItem";

//ссылка `http://localhost:3000/&ref=${auth.userId}`

import "../../style/RefItem.css";

export const RefItem = () => {
    const {userId} = useContext(AuthContext);

    const [link] = useState(`http://localhost:3000/auth/&ref=${userId}`),
        [payUser, setPayUser] = useState({});

    return(
        <RefUserPayContext.Provider value={{
            referral: payUser, setReferral: setPayUser, payUser
        }}>
        <div className="ref-page">
            <ul className="pay-selector">
                <li><NavLink to="/user/ref/my-ref"><button className="btn">Ваши рефералы</button></NavLink></li>
                <li><NavLink to="/user/ref/banners"><button className="btn">Банеры</button></NavLink></li>
            </ul>
            <Switch>
                <Route path="/user/ref/my-ref" render={() => <AllReferralsItem link={link} />} exact/>
                <Route path="/user/ref/banners" render={() => <BannersItem link={link} />}/>
                <Route path="/user/ref/my-ref/:id" render={() => <RefUserPayItem />}/>
            </Switch>
        </div>
        </RefUserPayContext.Provider>
    );
};