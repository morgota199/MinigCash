import React, {useEffect, useState} from "react";
import image1 from "./bannersImages/134835-2.jpg"
import image2 from "./bannersImages/Без названия.jpeg"
import {usePagination} from "../../../hooks/pagination.hook";
import copy from "copy-to-clipboard";
import download from "downloadjs";

import {useMessage} from "../../../hooks/message.hook";

export const BannersItem = ({link}) => {
    const {init, count, pagePagination, selector} = usePagination(),
        message = useMessage();

    const [image, setImage] = useState([image1, image2]);

    useEffect(() => {init(image, 1)}, [image]);

    const copyHandler = () => {
        copy(`<a href=\'${link}\'><img src="/path/to/banner"  alt="banner"/></a>`);

        message("Скопированно в буфер");
    }

    const downloadHandler = () => {
        download(pagePagination[count][0]);
    }

    return(
        <div className="banners-box">
            {
                pagePagination.length !== 0 ? pagePagination[count].map(im => {
                        return (
                            <div className="ref-banners-box">
                                <div className="banners-selector" >
                                    <button className="btn" onClick={copyHandler}>Баннер с картинкой</button>
                                    <button className="btn" onClick={downloadHandler}>Скачать</button>
                                </div>
                                <img src={im} alt=""/>
                            </div>
                        )
                    }
                ) : <li className="no-news"><b>Нет банеров</b></li>
            }
            {selector()}
        </div>
    )
};