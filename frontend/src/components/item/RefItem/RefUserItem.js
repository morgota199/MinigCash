import React, {useContext, useEffect, useState} from "react";
import {AuthContext, RefUserPayContext} from "../../../context/auth.context";
import {NavLink} from "react-router-dom";
import {useHttp} from "../../../hooks/http.hook";
import path from "../../../path.config";

export const RefUserItem = ({props}) => {
    const {setReferral} = useContext(RefUserPayContext),
        {token} = useContext(AuthContext);

    const {request} = useHttp();

    const [countPay, setCountPay] = useState(0);

    const payHandler = () => setReferral(props);

    useEffect(() => {
        (async () => {
           const count = await request(`${path.reference_pay}/${props._id}`, "GET", null, {"Authorization": `Bearer ${token}`});

           if(count) setCountPay(count.length);
        })()
    }, [request, props._id, token])

    return(
        <li className="ref-user-item">
            <div>
                <NavLink to={`/user/ref/my-ref/${props._id}`} onClick={payHandler}><p>{props.username}</p></NavLink>
            </div>
            <div>
                <p>Количество платежей: <b>{countPay}</b></p>
            </div>
        </li>
    )
}