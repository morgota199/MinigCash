import React from "react";
import {NavLink, Redirect, Route, Switch} from 'react-router-dom';
import {BitcoinContent} from "../components/user/item_user/content/payContent/BitcoinContent";
import {PayeerContent} from "../components/user/item_user/content/payContent/PayeerContent";
import {LitecoinContent} from "../components/user/item_user/content/payContent/LitecoinContent";
import {QIWIContent} from "../components/user/item_user/content/payContent/QIWIContent";
import {EthereumContent} from "../components/user/item_user/content/payContent/EthereumContent";
import {ListPayContent} from "../components/user/item_user/content/payContent/ListPayContent";

import "../style/Pay.css";
import back from "../image/rupixen-com-Q59HmzK38eQ-unsplash.png";


export const ReplenishPage = () => {
    return (
        <div className="pay" style={
            {
                background: `url(${back})`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }
        }>
            <div className='container-pay-selector replenish-pay-container' style={
                {
                    padding: "15px"
                }
            }>
                <ul className="pay-selector">
                    <li><NavLink to='/replenish/payeer'>  <button className="btn">Payeer</button>   </NavLink></li>
                    <li><NavLink to='/replenish/qiwi'>    <button className="btn">QIWI</button>     </NavLink></li>
                    <li><NavLink to='/replenish/bitcion'> <button className="btn">Bitcoin</button>  </NavLink></li>
                    <li><NavLink to='/replenish/litecoin'><button className="btn">Litecoin</button> </NavLink></li>
                    <li><NavLink to='/replenish/ethreum'> <button className="btn">Ethereum</button> </NavLink></li>
                </ul>
                <div className='pay-selector-list-icon'>
                    <NavLink to='/replenish/pay-list'><i className='material-icons'>list</i></NavLink>
                </div>
            </div>
            <div className="pay-type-content" style={
                {
                    padding: "15px"
                }
            }>
                <Switch>
                    <Route path='/replenish/pay-list' component={ListPayContent}/>
                    <Route path='/replenish/payeer'   render={(props) => <PayeerContent   {...props} props={false} />}/>
                    <Route path='/replenish/qiwi'     render={(props) => <QIWIContent     {...props} props={false} />}/>
                    <Route path='/replenish/bitcion'  render={(props) => <BitcoinContent  {...props} props={false} />}/>
                    <Route path='/replenish/litecoin' render={(props) => <LitecoinContent {...props} props={false} />}/>
                    <Route path='/replenish/ethreum'  render={(props) => <EthereumContent {...props} props={false} />}/>
                    <Redirect to='/replenish/payeer'/>
                </Switch>
            </div>
        </div>
    )
};