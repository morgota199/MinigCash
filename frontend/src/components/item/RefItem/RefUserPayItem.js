import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../../../hooks/http.hook";
import {AuthContext, RefUserPayContext} from "../../../context/auth.context";
import {usePagination} from "../../../hooks/pagination.hook";

export const RefUserPayItem = () => {
    const {token} = useContext(AuthContext);

    const {init, count, pagePagination, selector} = usePagination(),
        {request} = useHttp();

    const [pay, setPay] = useState([]),
        [referralLength, setReferralLength] = useState(0),
        [percent, setPercent] = useState(0),
        [login, setLogin] = useState(null);

    useEffect(() => {
        const ID = window.location.href.split("my-ref/")[1];

        (async () => {
            const data = await request("/get-referrals-pay-by-id", "POST", {ID}, {token}),
                referralData = await request('/get-referrals-length', "POST", null, {token}),
                searchData = await request("/search-user-by-id", "POST", {searchParam: ID}, {token});

            if( data &&
                data.pay &&
                referralData &&
                referralData.refLength &&
                searchData &&
                searchData.searchUser
            ){
                const rev = data.pay.reverse();

                setReferralLength(referralData.refLength);
                setLogin(searchData.searchUser.userName);
                setPay(rev);
                init(rev);
            }
        })()
    }, [])

    useEffect(() => {
        init(pay)

        if(referralLength < 10) setPercent(0);
        else if(referralLength >= 10 && pay.length < 20) setPercent(0.01);
        else if(referralLength >= 20 && pay.length < 100) setPercent(0.03);
        else setPercent(0.05);

    }, [pay, referralLength]);

    return (
        <div>
            <h4 style={{marginLeft: "15px"}}>{login}</h4>
            <ul className="referal-selector">
                {
                    pagePagination.length !== 0 ? pagePagination[count].map(pays => {
                        return (
                            <li key={pays._id} className="ref-user-item">
                                <div>
                                    <p>{pays.system}</p>
                                </div>
                                <div>
                                    <p>Вы получили: <span>{pays.usd * percent}$</span></p>
                                </div>
                            </li>
                        )
                    }
                ) : <li className="no-news"><b>Нет платежей</b></li>}
            </ul>
            {selector()}
        </div>
    )
}