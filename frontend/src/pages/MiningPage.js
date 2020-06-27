import React from "react";
import {MiningContext} from "../context/auth.context";
import {useMining} from "../hooks/mining.hook";
import {MiningItem} from "../components/item/MiningItem";

import "../style/MiningPage.css";
import back from "../image/rupixen-com-Q59HmzK38eQ-unsplash.png";

export const MiningPage = () => {
    const { mining, setMining, removeMining } = useMining();

    return (
        <MiningContext.Provider value={{
            mining, setMining, removeMining
        }}>
            <div className="mining-container" style={
                {
                    background: `url(${back})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                }
            }>
                <div className="mining-box">
                    {
                        mining.map(m => {
                            return (
                                <MiningItem
                                    key={m.id}
                                    name={m.name}
                                    balance={m.balance}
                                    power={m.power}
                                />)
                        })
                    }
                </div>
            </div>
        </MiningContext.Provider>
    );
};