import React, {useContext} from "react";
import {AllNewsContext, AuthContext} from "../../../../../context/auth.context";
import {RedactNews} from "./RedactNews";
import {useHttp} from "../../../../../hooks/http.hook";
import {useMessage} from "../../../../../hooks/message.hook";

import "../../../../../style/NewsToolsContent.css"


export const NewsItem = ({props}) => {
    const {setAllNews, setRedactNews, setPages} = useContext(AllNewsContext),
        {token} = useContext(AuthContext);

    const {request} = useHttp(),
        message     = useMessage();

    const removeHandler = async () => {
        const data = await request("/remove-news-admin", "POST", {news: props}, {token});

        message(data.message);

        setAllNews(all => {return all.filter(news => news._id !== props._id)})
    };

    const redactHandler = () => {
        setRedactNews(props);
        setPages(<RedactNews props={props}/>)
    };

    return(
        <li>
            <div className="news-admin-title-box collapsible-header">
                <div className="news-admin-title-box-logo">
                    <span><b>{props.title}</b></span>
                </div>
                <div className="news-admin-title-box-controller">
                    <div onClick={redactHandler}>
                        <i className="material-icons" >create</i>
                    </div>
                    <div onClick={removeHandler}>
                        <i className="material-icons" >clear</i>
                    </div>
                </div>
            </div>
            <div className="news-admin-text-placeholder collapsible-body">
                <p dangerouslySetInnerHTML={{__html: props.text.replace(/\n/g, "<br>")}} />
            </div>
        </li>
    )
};