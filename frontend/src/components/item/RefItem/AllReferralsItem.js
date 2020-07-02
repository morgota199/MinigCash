import React, {useContext, useEffect, useState} from "react";
import {useMessage} from "../../../hooks/message.hook";
import {RefUserItem} from "./RefUserItem";
import {useHttp} from "../../../hooks/http.hook";
import {AuthContext} from "../../../context/auth.context";
import {usePagination} from "../../../hooks/pagination.hook";
import copy from "copy-to-clipboard";
import path from "../../../path.config";

export const AllReferralsItem = ({link}) => {
    const {token} = useContext(AuthContext);

    const {request} = useHttp(),
        message = useMessage();

    const {init, pagePagination,selector, count} = usePagination();

    const [refUsers, setRefUsers] = useState([]),
        [show, setShow] = useState(0);

    const saveHandler = () => {
        copy(link);

        message("Сохранено в буфер");
    };

    useEffect(() => {
        (
            async () => {
                const data = await request(path.reference_me, "GET", null, {"Authorization": `Bearer ${token}`}),
                    refShow = await request(path.reference_ref, "GET", null, {"Authorization": `Bearer ${token}`});

                if(data && refShow){
                    const rev = data.reverse()

                    setShow(refShow.ref_show);
                    setRefUsers(rev);
                }
            })()
    }, [request, token]);

    useEffect(() => {init(refUsers)}, [refUsers]);

    return(
        <div className="all-ref-item">
            {/*Начало болка с ссылкой и общим количеством просмотров*/}
            <div className="ref-info">
                <div className="in-val ref-link-box" onClick={saveHandler}>
                    <p>{link}</p>
                </div>
                <div className="ref-link-show">
                    <p>Просмотренно раз: <b className="show-count">{show}</b></p>
                </div>
            </div>
            {/*Конец болка с ссылкой и общим количеством просмотров*/}
            <div className="ref-table-container">
                <ul className="referal-selector">
                    {
                        pagePagination.length !== 0 ? pagePagination[count].map(ref => {
                                return (
                                    <RefUserItem
                                        key={ref._id}
                                        props={ref}
                                    />
                                )
                            }
                        ): <li><p>Рефералов нет</p></li>
                    }
                </ul>
                {selector()}
            </div>
        </div>
    )
};