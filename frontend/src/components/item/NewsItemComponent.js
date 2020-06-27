import React from "react";

export const NewsItemComponent = ({props}) => {
    return(
        <li>
            <div className="news-admin-title-box collapsible-header">
                <div className="news-admin-title-box-logo">
                    <span><b>{props.title}</b></span>
                </div>
            </div>
            <div className="news-admin-text-placeholder collapsible-body">
                <p dangerouslySetInnerHTML={{__html: props.text.replace(/\n/g, "<br>")}} />
            </div>
        </li>
    )
};