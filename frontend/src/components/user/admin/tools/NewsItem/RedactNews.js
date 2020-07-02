import React, {useContext, useEffect, useRef, useState} from "react";
import {AllNewsContext, AuthContext} from "../../../../../context/auth.context";
import {AllNews} from "./AllNews";
import {useHttp} from "../../../../../hooks/http.hook";
import {useMessage} from "../../../../../hooks/message.hook";
import path from "../../../../../path.config"
import "../../../../../style/NewsToolsContent.css";

const on = {border: "1px solid #000000", padding: 0, cursor: "pointer"},
    off  = {border: "none", padding: "1px", cursor: "pointer"};

export const RedactNews = ({props}) => {
    const {setPages, allNews, setAllNews, setRedactNews} = useContext(AllNewsContext),
        {token} = useContext(AuthContext);

    const [itemNews, setItemNews] = useState(props),
        [redactFont, setRedactFont] = useState(["", ""]);

    const selectText = useRef(null);

    const {request} = useHttp(),
        message     = useMessage();


    useEffect(() => {setItemNews(props)}, [props]);

    const changeTitleHandler = event => setItemNews({_id: itemNews._id, title: event.target.value, text: itemNews.text}),
        changeTextHandler = event => setItemNews({_id: itemNews._id, title: itemNews.title, text: event.target.value}),
        saveHandler = async () => {
            if(!props.newPost){
                const News = await request(
                    `${path.news}/${itemNews._id}`,
                    "PUT",
                    {
                        title: itemNews.title,
                        text: itemNews.text
                    },
                    {"Authorization": `Bearer ${token}`}
                );

                if(News && News.message) {
                    setRedactNews(itemNews);
                    message(News.message);
                }
            } else {
                const News = await request(
                    path.news,
                    "POST",
                    {
                        title: itemNews.title,
                        text: itemNews.text
                    },  {
                        "Authorization": `Bearer ${token}`
                    });

                if(News && News.newNews){
                    setRedactNews(itemNews);
                    setAllNews([{_id: News.newNews._id, title: itemNews.title, text: itemNews.text}, ...allNews]);
                    message(News.message);
                }
            }

            setPages(<AllNews props={allNews.map(news => {return news._id === itemNews._id ? itemNews : news})}/>);
        };

    const focusTextAreaHandler = () => {
        if(window.getSelection().toString()) {
            setItemNews(item => {
                item.text = item.text
                    .replace(
                        window.getSelection().toString(),
                        `${redactFont[0]}${window.getSelection().toString()}${redactFont[1]}`);
                return item;
            });
        }
    };

    const activeHandler = event => {
        switch (event.target.innerHTML) {
            case "format_bold":
                redactFont.toString() !== ["<b>", "</b>"].toString() ? setRedactFont(["<b>", "</b>"]) : setRedactFont(["", ""]);
                break;
            case "format_italic":
                redactFont.toString() !== ["<i>", "</i>"].toString() ? setRedactFont(["<i>", "</i>"]) : setRedactFont(["", ""]);
                break;
            case "format_underlined":
                redactFont.toString() !== ["<ins>", "</ins>"].toString() ? setRedactFont(["<ins>", "</ins>"]) : setRedactFont(["", ""]);
                break;
            default: break;
        }
    };

    if(!props.newPost) {
        return (
            <div className="redact-news">
                <div className="row-block">
                    <span className="helper-text">Заголовок</span>
                    <div className="in-val">
                        <input type="text" style={{fontSize: "20pt"}} name="title" value={itemNews.title}
                               onChange={changeTitleHandler}/>
                    </div>
                </div>
                <div className="redact-controller-font">
                    <div onClick={activeHandler}>
                        <i className="material-icons"
                           style={redactFont.toString() === ["<b>", "</b>"].toString() ? on : off}>format_bold</i>
                    </div>
                    <div onClick={activeHandler}>
                        <i className="material-icons"
                           style={redactFont.toString() === ["<i>", "</i>"].toString() ? on : off}>format_italic</i>
                    </div>
                    <div onClick={activeHandler}>
                        <i className="material-icons"
                           style={redactFont.toString() === ["<ins>", "</ins>"].toString() ? on : off}>format_underlined</i>
                    </div>
                </div>
                <div className="row-block">
                    <span className="helper-text">Текст новости</span>
                    <div className="in-val">
                        <textarea name="text" className="materialize-textarea" ref={selectText} value={itemNews.text} onClick={focusTextAreaHandler} onChange={changeTextHandler}/>
                    </div>
                </div>
                <div className="pay-btn">
                    <button className="btn" onClick={saveHandler}>Сохранить</button>
                </div>
            </div>
        )
    }

    return (
        <div className="redact-news">
            <div className="row-block">
                <span className="helper-text">Заголовок</span>
                <div className="in-val">
                    <input type="text" style={{fontSize: "20pt"}} name="title" value={itemNews.title}
                           onChange={changeTitleHandler}/>
                </div>
            </div>
            <div className="redact-controller-font">
                <div onClick={activeHandler}>
                    <i className="material-icons"
                       style={redactFont.toString() === ["<b>", "</b>"].toString() ? on : off}>format_bold</i>
                </div>
                <div onClick={activeHandler}>
                    <i className="material-icons"
                       style={redactFont.toString() === ["<i>", "</i>"].toString() ? on : off}>format_italic</i>
                </div>
                <div onClick={activeHandler}>
                    <i className="material-icons"
                       style={redactFont.toString() === ["<ins>", "</ins>"].toString() ? on : off}>format_underlined</i>
                </div>
            </div>
            <div className="row-block">
                <span className="helper-text">Текст новости</span>
                <div className="in-val">
                    <textarea name="text" className="materialize-textarea" value={itemNews.text} onClick={focusTextAreaHandler} onChange={changeTextHandler}/>
                </div>
            </div>
            <div className="pay-btn">
                <button className="btn" onClick={saveHandler}>Добавить пост</button>
            </div>
        </div>
    )
};