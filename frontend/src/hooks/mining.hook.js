import {useCallback, useEffect, useState} from "react";
import {useHttp} from "./http.hook";

const storageName = "miningData";

export const useMining = () => {
    const {request} = useHttp();

    const [mining, setMining] = useState(JSON.parse(localStorage.getItem(storageName)) || [
        {id: 0, name: "Ethereum", balance: 0, power: 0},
        {id: 1, name: "Litecoin", balance: 0, power: 0},
        {id: 2, name: "Bitcoin", balance: 0, power: 0},
        {id: 3, name: "USD", balance: 0, power: 0},
    ]);

    const removeMining = useCallback(() => {
        setMining(null);

        localStorage.removeItem(storageName);
    }, [setMining]);

    const setPower = useCallback( async (token) => {
        const powerData = await request("/user/set-power", "POST", null, {token}),
            newMining = mining;

        newMining.map(iter => iter.power = powerData.power[iter.name.toLowerCase()]);

        setMining(newMining);

        if(!localStorage.getItem(storageName)) localStorage.setItem(storageName, JSON.stringify(mining));
    }, [request, mining]);

    useEffect(() => {
        if(localStorage.getItem("balanceData")){
            const storageBalance = JSON.parse(localStorage.getItem("balanceData")),
                newMining = mining;

            newMining.map(iter => iter.balance = storageBalance[iter.name.toUpperCase()]);

            setMining(newMining);
        }

        if(!localStorage.getItem('UserData')) localStorage.removeItem(storageName);
    }, [localStorage.getItem(storageName), localStorage.getItem("balanceData"), mining]);

    return { mining, setMining, removeMining, setPower };
};