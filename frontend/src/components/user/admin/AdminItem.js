import React, {useContext} from "react";
import {AuthContext} from "../../../context/auth.context";
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import {NewsToolsContent} from "./tools/NewsToolsContent";
import {PayToolsContent} from "./tools/PayToolsContent";
import {TicetToolsContent} from "./tools/TicetToolsContent";
import {UserToolsContent} from "./tools/UserToolsContent";
import {StatisticToolsContent} from "./tools/StatisticToolsContent";

export const AdminItem = () => {
    const auth = useContext(AuthContext);

    if(auth.admin){
        return(
            <div className="admin-panel">
                <ul className="pay-selector">
                    <li><NavLink to='/user/admin/news-tools/all-posts'>    <button className="btn">Новости</button>        </NavLink></li>
                    <li><NavLink to='/user/admin/pay-tools'>               <button className="btn">Оплаты</button>         </NavLink></li>
                    <li><NavLink to='/user/admin/ticet-tools'>             <button className="btn">Тикеты</button>         </NavLink></li>
                    <li><NavLink to='/user/admin/user-tools'>              <button className="btn">Пользователи</button>   </NavLink></li>
                    <li><NavLink to='/user/admin/statistic'>               <button className="btn">Статистика</button>     </NavLink></li>
                </ul>
                <div className="admin-container-selector">
                    <Switch>
                        <Route path='/user/admin/news-tools'      component={NewsToolsContent}      />
                        <Route path='/user/admin/pay-tools'       component={PayToolsContent}       />
                        <Route path='/user/admin/ticet-tools'     component={TicetToolsContent}     />
                        <Route path='/user/admin/user-tools'      component={UserToolsContent}      />
                        <Route path='/user/admin/statistic'       component={StatisticToolsContent} />
                    </Switch>
                </div>
            </div>
        )
    }

    return(
        <Redirect to="/"/>
    )

};