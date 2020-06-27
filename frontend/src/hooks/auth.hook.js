import {useState, useCallback, useEffect} from 'react';
import {useHttp} from "./http.hook";
import {useMining} from "./mining.hook";
import {storage} from "../storage.config"

export const useAuth = () => {
    const {setPower} = useMining();

    const [token, setToken]     = useState(null),
        [userId, setUserId]     = useState(null),
        [userName, setUserName] = useState(null),
        [admin, setAdmin]       = useState(null);

    const {request} = useHttp();

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUserName(null);
        setAdmin(null);

        localStorage.removeItem("NewsData");
        localStorage.removeItem("miningData");
        localStorage.removeItem("balanceData");
        localStorage.removeItem("PayAddonData");
        localStorage.removeItem("NewTicetData");
        localStorage.removeItem("UsersAdminData");
        localStorage.removeItem("RefPayUserData");
        localStorage.removeItem("TicetsAdminData");
        localStorage.removeItem("PayAllConfirmationData");
        localStorage.removeItem(storage.user);
    }, []);

    const login = useCallback((jwt, id, name, isAdmin) => {
        setToken(jwt);
        setUserId(id);
        setUserName(name);
        setAdmin(isAdmin);

        // const interval = setInterval(async () => {
        //     try {
        //         const blockData = await request(
        //             "/block-check-user", "POST", null, {token: jwt}),
        //             isAdminData = await request("/is-admin-check-user", "POST", null, {token: jwt});
        //
        //         if (blockData && blockData.blocked) {
        //             alert("Вы блокированны");
        //
        //             logout();
        //             return clearInterval(interval);
        //         }
        //
        //         if (isAdmin) {
        //             if (isAdminData && !isAdminData.isAdmin) {
        //                 alert("Вы больше не администратор\n"
        //                     + "Зайдите заново чтобы продолжить пользоваться сервисом");
        //
        //                 logout();
        //                 return clearInterval(interval);
        //             }
        //         } else {
        //             if (isAdminData && isAdminData.isAdmin) {
        //                 alert("Вы стали администратором\n"
        //                     + "Зайдите заново");
        //
        //                 logout();
        //                 return clearInterval(interval);
        //             }
        //         }
        //     } catch (e) {
        //         console.log(e.message);
        //     }
        // }, 60000);

        // const balanceInterval = setInterval(async () => {
        //     try {
        //         const balanceData = await request('/user/on-balance', "POST", null, {token: jwt});
        //
        //         await setPower(jwt);
        //
        //         const newBalance = {
        //             GHS: balanceData.money.ghs,
        //             LITECOIN: balanceData.money.litecoin,
        //             BITCOIN: balanceData.money.bitcoin,
        //             ETHEREUM: balanceData.money.ethereum,
        //             USD: balanceData.money.usd,
        //             REF_MONEY: balanceData.money.ref_money
        //         };
        //
        //         localStorage.setItem("balanceData", JSON.stringify(newBalance));
        //
        //         if (!localStorage.getItem(storageName)) {
        //             localStorage.removeItem('balanceData');
        //             localStorage.removeItem('miningData');
        //             clearInterval(balanceInterval);
        //         }
        //     } catch (e) {}
        // }, 1000);

        localStorage.setItem(storage.user, JSON.stringify({token: jwt, userId: id, userName: name, admin: isAdmin}));

    }, [request, logout, setPower]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storage.user));

        if(data && data.token) login(data.token, data.userId, data.userName, data.admin);
    }, [login]);

    return { login, logout, token, userId, userName, admin }
};