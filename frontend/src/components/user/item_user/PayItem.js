import React from "react";
import {NavLink, Route, Switch} from 'react-router-dom';
import {QIWIContent} from "./content/payContent/QIWIContent";
import {PayeerContent} from "./content/payContent/PayeerContent";
import {EthereumContent} from "./content/payContent/EthereumContent";
import {LitecoinContent} from "./content/payContent/LitecoinContent";
import {BitcoinContent} from "./content/payContent/BitcoinContent";
import {ListPayContent} from "./content/payContent/ListPayContent";

export const PayItem = () => {
    return (
        <div className="pay">
            <div className='container-pay-selector replenish-pay-container'>
                <ul className="pay-selector">
                    <li><NavLink to='/user/pay/payeer'>    <button className="btn">Payeer</button>   </NavLink></li>
                    <li><NavLink to='/user/pay/qiwi'>      <button className="btn">QIWI</button>     </NavLink></li>
                    <li><NavLink to='/user/pay/bitcoin'>   <button className="btn">Bitcoin</button>  </NavLink></li>
                    <li><NavLink to='/user/pay/litecoin'>  <button className="btn">Litecoin</button> </NavLink></li>
                    <li><NavLink to='/user/pay/ethereum'>  <button className="btn">Ethereum</button> </NavLink></li>
                </ul>
                <div className='pay-selector-list-icon'>
                    <NavLink to='/user/pay/pay-list'><i className='material-icons'>list</i></NavLink>
                </div>
            </div>
            <div className="pay-type-content">
                <Switch>
                    <Route path='/user/pay/pay-list'  render={()      => <ListPayContent />}/>
                    <Route path='/user/pay/payeer'    render={(props) => <PayeerContent   {...props} props={true} />}/>
                    <Route path='/user/pay/qiwi'      render={(props) => <QIWIContent     {...props} props={true} />}/>
                    <Route path='/user/pay/bitcoin'   render={(props) => <BitcoinContent  {...props} props={true} />}/>
                    <Route path='/user/pay/litecoin'  render={(props) => <LitecoinContent {...props} props={true} />}/>
                    <Route path='/user/pay/ethereum'  render={(props) => <EthereumContent {...props} props={true} />}/>
                </Switch>
            </div>
        </div>
    )
};