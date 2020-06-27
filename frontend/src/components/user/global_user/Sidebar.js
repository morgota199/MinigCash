import {BalanceUser} from "./BalanceUser";
import {MenuUser} from "./MenuUser";
import React from "react";
import "../../../style/Sidebar.css"

export const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <div className="sidebar">
                <BalanceUser />
                <MenuUser />
            </div>
        </div>
    )
}