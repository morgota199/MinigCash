import React, {useEffect} from 'react';
import 'materialize-css';
import './style/App.css';
import {BrowserRouter} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext, RefContext, BalanceContext} from "./context/auth.context";
import {useReference} from "./hooks/ref.hook";
import {useHttp} from "./hooks/http.hook";
import {useMessage} from "./hooks/message.hook";
import {useBalance} from "./hooks/balance.hook";
import path from "./path.config"

const App = () => {
    const { login, logout, token, userId, userName, admin, badge, setBadge } = useAuth(),
        { ref, logoutRef, loginRef } = useReference(),
        { balance, setBalance, offBalance } = useBalance(),
        { request } = useHttp();

    const isAuth = !!token,
        routes = useRoutes(isAuth),
        message = useMessage();


    useEffect(() => {
        const param = new URLSearchParams(window.location.href);
        const ref = param.get('ref');

        if(ref) {
            (async () => {
                await request(`${path.reference}/${ref}` , "GET");
                loginRef(ref)
            })();
        }
    }, [request, loginRef, message]);

    return(
        <AuthContext.Provider value={{token, userId, userName, login, logout, isAuth, admin, badge, setBadge}}>
            <BalanceContext.Provider value={{balance, setBalance, offBalance}}>
                <RefContext.Provider value={{ref, logoutRef, loginRef}}>
                    <BrowserRouter>
                        { routes }
                    </BrowserRouter>
                </RefContext.Provider>
            </BalanceContext.Provider>
        </AuthContext.Provider>
    );
};

export default App;
