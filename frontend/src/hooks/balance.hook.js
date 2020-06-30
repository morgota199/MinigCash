import {useCallback, useEffect, useState} from "react";
import {storage} from "../storage.config";

export const useBalance = () => {
    const [balance, setBalance] = useState(JSON.parse(localStorage.getItem(storage.balance)) || {
        GHS:      1,
        LITECOIN: 0,
        USD:      0,
        ETHEREUM: 0,
        BITCOIN:  0,
        REF_MONEY:0
    });

    const offBalance = useCallback(() => {
        setBalance(null);
        localStorage.removeItem(storage.balance);
    }, []);

    useEffect(() => {
        if(JSON.stringify(balance) !== localStorage.getItem(storage.balance))
            setBalance(JSON.parse(localStorage.getItem(storage.balance)));
    }, [balance, setBalance, localStorage.getItem(storage.balance)]);

    return { balance, setBalance, offBalance }
};