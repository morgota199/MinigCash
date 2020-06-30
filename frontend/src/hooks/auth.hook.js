import {useState, useCallback, useEffect} from 'react';
import {useMining} from "./mining.hook";
import {storage} from "../storage.config"
import {useMessage} from "./message.hook";
import {useHttp} from "./http.hook";
import path from "../path.config";


export const useAuth = () => {
    const {setPower} = useMining();
    const message = useMessage();
    const {request} = useHttp();

    const [token, setToken]     = useState(null),
        [userId, setUserId]     = useState(null),
        [userName, setUserName] = useState(null),
        [admin, setAdmin]       = useState(null),
        [balance, setBalance]   = useState(
            {
                GHS:      1,
                LITECOIN: 0,
                USD:      0,
                ETHEREUM: 0,
                BITCOIN:  0,
                REF_MONEY:0
            }
        );

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUserName(null);
        setAdmin(null);

        localStorage.removeItem("NewsData");
        localStorage.removeItem(storage.mining);
        localStorage.removeItem(storage.balance);
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


        setInterval(async () => {
            try {
                const checker = await request(
                    path.checker,
                    "GET",
                    null,
                    {"Authorization": `Bearer ${jwt}`}
                )

                if (checker.block) return logout();

                if(!is_admin(isAdmin, checker.is_admin)) {
                    logout()
                    return window.location.reload()
                }

                setPower(checker.power)

                return set_balance(checker.money)
            } catch (e) {
                if(typeof e.message === "string")
                    return message(e.message)
                else
                    for(const err of e.message)
                        message(err)
            }
        }, 1000)

        localStorage.setItem(storage.user, JSON.stringify({token: jwt, userId: id, userName: name, admin: isAdmin}));

    }, [logout, setPower]);

    const is_admin = (isAdmin, is_admin) => {
        if (isAdmin) {
            if (is_admin === false) {
                alert("Вы больше не администратор\n"
                    + "Зайдите заново чтобы продолжить пользоваться сервисом");
                return false
            }
        } else {
            if (is_admin === true) {
                alert("Вы стали администратором\n"
                    + "Зайдите заново");

                return false
            }
        }

        return true
    }

    const set_balance = (money) => {
        const newBalance = {
            GHS: money.ghs,
            LITECOIN: money.litecoin,
            BITCOIN: money.bitcoin,
            ETHEREUM: money.ethereum,
            USD: money.usd,
            REF_MONEY: money.ref_money
        };

        if (!localStorage.getItem(storage.user)) {
            localStorage.removeItem(storage.balance);
            localStorage.removeItem(storage.mining);
        }

        if (JSON.stringify(balance) === JSON.stringify(newBalance)) return

        setBalance(newBalance)

        localStorage.setItem(storage.balance, JSON.stringify(newBalance));
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storage.user));

        if(data && data.token) {

            login(data.token, data.userId, data.userName, data.admin);
        }
    }, [login]);

    const offBalance = useCallback(() => {
        setBalance(null);
        localStorage.removeItem(storage.balance);
    }, []);

    useEffect(() => {
        if(JSON.stringify(balance) !== localStorage.getItem(storage.balance))
            setBalance(JSON.parse(localStorage.getItem(storage.balance)));
    }, [balance, setBalance]);

    return { login, logout, token, userId, userName, admin, balance }
};