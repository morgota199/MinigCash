import {NavBarOffAuth, NavBarOnAuth} from "./components/global/NavBar";
import {ReplenishPage} from "./pages/ReplenishPage";
import {CalculatePage} from "./pages/CalculatePage";
import {Redirect, Route, Switch} from "react-router-dom";
import {TariffsPage} from "./pages/TariffsPage";
import {MainPage} from "./pages/MainPage";
import {AuthPage} from "./pages/AuthPage";
import {NewsPage} from "./pages/NewsPage";
import React from "react";
import {Adaptive} from "./components/user/global_user/Adaptive";

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <div className="App">
                <NavBarOnAuth />
                <Switch>
                    <Route path="/"          component={MainPage} exact/>
                    <Route path="/calculate" component={CalculatePage} />
                    <Route path="/ticets"    component={Adaptive} />
                    <Route path="/replenish" component={ReplenishPage} />
                    <Route path="/trafic"    component={TariffsPage} />
                    <Route path="/news"      component={NewsPage} />
                    <Route path="/user"      component={Adaptive} />
                    <Route path="/mining"    component={Adaptive} />
                    <Redirect to='/'/>
                </Switch>
            </div>
        );
    }

    return(
        <div className="App">
            <NavBarOffAuth/>
            <Switch>
                <Route path="/"          component={MainPage} exact/>
                <Route path="/calculate" component={CalculatePage} />
                <Route path="/trafic"    component={TariffsPage} />
                <Route path="/news"      component={NewsPage} />
                <Route path="/auth"      component={AuthPage} />
            </Switch>
        </div>
    );
};