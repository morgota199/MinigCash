import React, {useContext, useEffect, useRef, useState} from "react";
import {Line} from 'react-chartjs-2';
import {useDate} from "../../../../hooks/date.hook";
import {useMessage} from "../../../../hooks/message.hook";
import {useHttp} from "../../../../hooks/http.hook";
import {AuthContext} from "../../../../context/auth.context";
import moment from "moment";

import "../../../../style/StatisticToolsContent.css"

export const StatisticToolsContent = () => {
    const dateStart = useDate(),
        dateEnd     = useDate(),
        message     = useMessage(),
        {request}   = useHttp(),
        {token}     = useContext(AuthContext)

    const [startDate] = useState(moment().set({"year": 2020, "month": 4, "date": 1})._d),
        [sel, setSel] = useState(() => {
            let d = [];
            for(let i = moment("2020-5-1").valueOf();
                i <= moment(Date.now()).valueOf();
                i += 24 * 60 * 60 * 1000) d.push(moment(i).format("Y, MMM, D"))

            return d;
        });

    const start = useRef(null),
        end     = useRef(null)

    const [data, setData] = useState({
        labels: sel,
        datasets: [
            {
                label: 'My First dataset',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [12, 123, 234, 6, 1, 3, 789]
            }
        ]
    })

    useEffect(() => {
        dateStart(document.querySelectorAll("#start"), {
            container: document.querySelector(".calendar"),
            autoClose: true,
            defaultDate: startDate,
            setDefaultDate: true
        })

        dateEnd(document.querySelectorAll("#end"), {
            container: document.querySelector(".calendar"),
            autoClose: true,
            defaultDate: moment()._d,
            setDefaultDate: true
        })
    }, [])

    useEffect(() => {
        setData({
            labels: sel,
            datasets: [
                {
                    label: 'My First dataset',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [12, 123, 234, 6, 1, 3, 789]
                }
            ]
        })
    }, [sel])

    const selectHandler = async () => {
        if(moment(start.current.value).valueOf() >= moment(end.current.value).valueOf())
            return message("Дата начала позже даты конца");

        let d = [];
        for(let i = moment(start.current.value).valueOf();
            i <= moment(end.current.value).valueOf();
            i += 24 * 60 * 60 * 1000) d.push(moment(i).format("Y, MMM, D"));

        const data = await request("/statistic", "POST", {start: start.current.value, end: end.current.value}, {token})

        setSel(d)
    }

    return (
        <div className="statistic">
            <h1>Статистика</h1>

            <Line data={data} />

            <div className="pay-selector">
                <div className="row-block">
                    <span>От</span>
                    <div className="in-val">
                        <input id="start" type="text" ref={start} className="datepicker" />
                    </div>
                </div>
                <div className="row-block">
                    <span>До</span>
                    <div className="in-val">
                        <input id="end" type="text" ref={end} className="datepicker" />
                    </div>
                </div>
            </div>

            <ul className="pay-selector">
                <li><button className="btn" onClick={selectHandler}>Применить</button></li>
            </ul>

            <div className="calendar" />
        </div>
    )
}