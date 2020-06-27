import {Route, Switch} from "react-router-dom";
import {RefItem} from "../components/item/RefItem";
import React from "react";
import {SelectPasswordItem} from "../components/user/item_user/SelectPasswordItem";
import {PayItem} from "../components/user/item_user/PayItem";
import {AdminItem} from "../components/user/admin/AdminItem";

import "../style/UserPage.css";
import back from "../image/rupixen-com-Q59HmzK38eQ-unsplash.png";

export const UserPage = () => {
    return (
            <div className="user-container" style={
                {
                    background: `url(${back})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                }
            }>
                <Switch>
                    <Route path='/user/select-password' component={SelectPasswordItem} />
                    <Route path='/user/pay'             component={PayItem} />
                    <Route path='/user/ref'             component={RefItem} />
                    <Route path='/user/admin'           component={AdminItem} />
                </Switch>
            </div>
    )
};