import {useCallback, useEffect, useState} from "react";
import {useHttp} from "./http.hook";
import {storage} from "../storage.config";

export const useMining = () => {
    const {request} = useHttp();

    const [mining, setMining] = useState(JSON.parse(localStorage.getItem(storage.mining)) || [
        {id: 0, name: "Ethereum", balance: 0, power: 0},
        {id: 1, name: "Litecoin", balance: 0, power: 0},
        {id: 2, name: "Bitcoin", balance: 0, power: 0},
        {id: 3, name: "USD", balance: 0, power: 0},
    ]);

    const removeMining = useCallback(() => {
        setMining(null);

        localStorage.removeItem(storage.mining);
    }, [setMining]);

    const setPower = useCallback( (power) => {
        const newMining = mining;

        newMining.map(iter => iter.power = power[iter.name.toLowerCase()]);

        setMining(newMining);

        if(!localStorage.getItem(storage.mining))
            localStorage.setItem(storage.mining, JSON.stringify(mining));
    }, [request, mining]);

    useEffect(() => {
        if(localStorage.getItem(storage.balance)){
            const storageBalance = JSON.parse(localStorage.getItem(storage.balance)),
                newMining = mining;

            newMining.map(iter => iter.balance = storageBalance[iter.name.toUpperCase()]);

            setMining(newMining);
        }

        if(!localStorage.getItem(storage.user))
            localStorage.removeItem(storage.mining);
    }, [
        JSON.parse(
            localStorage.getItem(storage.mining)
        ),
        JSON.parse(
            localStorage.getItem(storage.balance)
        )
    ]);

    return { mining, setMining, removeMining, setPower };
};