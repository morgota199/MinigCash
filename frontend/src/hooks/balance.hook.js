import {useCallback, useEffect, useState} from "react";

const storageName = "balanceData";

export const useBalance = () => {
    const [balance, setBalance] = useState(JSON.parse(localStorage.getItem(storageName)) || {
        GHS:      1,
        LITECOIN: 0,
        USD:      0,
        ETHEREUM: 0,
        BITCOIN:  0,
        REF_MONEY:0
    });

    const offBalance = useCallback(() => {
        setBalance(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        if(JSON.stringify(balance) !== localStorage.getItem(storageName)) setBalance(JSON.parse(localStorage.getItem(storageName)));
    }, [balance, setBalance, localStorage.getItem(storageName)]);

    return { balance, setBalance, offBalance }
};