import {Sidebar} from "./Sidebar";
import React from "react";
import {Route, Switch} from "react-router-dom";
import {MiningPage} from "../../../pages/MiningPage";
import {TicetsPage} from "../../../pages/TicetsPage";
import {UserPage} from "../../../pages/UserPage";
import "../../../style/Adaptive.css"

export const Adaptive = () => {
    return (
        <div className="adaptive-content">
            <Sidebar/>
            <Switch>
                <Route path="/mining" component={MiningPage}/>
                <Route path="/ticets" component={TicetsPage}/>
                <Route path="/:id" component={UserPage}/>
            </Switch>
        </div>
    )
}