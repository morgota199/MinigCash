import React, {useContext, useEffect, useState} from "react";
import {AuthContext, RefUserPayContext} from "../../../context/auth.context";
import {NavLink} from "react-router-dom";
import {useHttp} from "../../../hooks/http.hook";

export const RefUserItem = ({props}) => {
    const {setReferral} = useContext(RefUserPayContext),
        {token} = useContext(AuthContext);

    const {request} = useHttp();

    const [countPay, setCountPay] = useState(0);

    const payHandler = () => setReferral(props);

    useEffect(() => {
        (async () => {
           const count = await request("/get-referrals-pay-length-by-id", "POST", {ID: props._id}, {token});

           if(count && count.payCount) setCountPay(count.payCount);
        })()
    }, [request, props._id, token])

    return(
        <li className="ref-user-item">
            <div>
                <NavLink to={`/user/ref/my-ref/${props._id}`} onClick={payHandler}><p>{props.userName}</p></NavLink>
            </div>
            <div>
                <p>Количество платежей: <b>{countPay}</b></p>
            </div>
        </li>
    )
}