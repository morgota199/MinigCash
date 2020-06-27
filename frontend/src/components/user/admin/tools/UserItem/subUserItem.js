import React, {useEffect, useState} from "react";
import {usePagination} from "../../../../../hooks/pagination.hook";

export const Load = ({props}) => {
    return (
        <div className="load-user">
            <ul className="load-user-selector">
                <li><b>Bitcoin: </b>{props.power.bitcoin}%</li>
                <li><b>Ethereum: </b>{props.power.ethereum}%</li>
                <li><b>Litecoin: </b>{props.power.litecoin}%</li>
                <li><b>USD: </b>{props.power.usd}%</li>
            </ul>
        </div>
    )
};

export const Balance = ({props}) => {
    return (
        <div className="balance-user">
            <ul className="balance-user-selector">
                <li><b>Gh/s: </b>{props.money.ghs.toFixed(12)}</li>
                <li><b>Bitcoin: </b>{props.money.bitcoin.toFixed(12)} BTC</li>
                <li><b>Ethereum: </b>{props.money.ethereum.toFixed(12)} ETC</li>
                <li><b>Litecoin: </b>{props.money.litecoin.toFixed(12)} LTC</li>
                <li><b>USD: </b>{props.money.usd.toFixed(12)}$</li>
                <li><b>Партнерская программа: </b>{props.money.ref_money.toFixed(12)}$</li>
            </ul>
        </div>
    )
};

export const Ref = (props) => {
    const {init, selector, count, pagePagination} = usePagination();

    useEffect(() => init(props.reference), [init, props.reference])

    return (
        <div className="ref-user">
            <table className="striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Login</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {
                    pagePagination.length !== 0 ?
                        pagePagination[count].map((i, n) => {
                            return (
                                <tr key={n}>
                                    <td data-label="ID: " onClick={props.searchUsersById}>{i._id}</td>
                                    <td data-label="Login: " onClick={props.searchOnLoginAndEmailHandler}>{i.userName}</td>
                                    <td data-label="Email: " onClick={props.searchOnLoginAndEmailHandler}>{i.email}</td>
                                </tr>
                            )
                        }) : <tr style={{colSpan: 3}}><td/><td>Нет рефералов</td><td/></tr>
                }
                </tbody>
            </table>
            {selector()}
        </div>
    )
};