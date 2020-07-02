import React, {useState} from "react";
import {useHttp} from "../../../../hooks/http.hook";
import {useMessage} from "../../../../hooks/message.hook";
import {UsersContext} from "../../../../context/auth.context";
import {UserItem} from "./UserItem/UserItem";

import "../../../../style/UserToolsContent.css"
import path from "../../../../path.config";

export const UserToolsContent = () => {
    const { request } = useHttp(),
        message = useMessage();

    const [users, setUsers] = useState(JSON.parse(localStorage.getItem("UsersAdminData")) || []),
        [search, setSearch] = useState(null);

    const searchHandler = async () => {
            const data = await request(`${path.user_search}/${search}`);

            if(data.statusCode === 500) {
                if (search) {
                    setUsers([])
                    localStorage.setItem("UsersAdminData", JSON.stringify(users))
                    return message("Такого пользователя нет")
                }

                setUsers([]);
                return localStorage.setItem("UsersAdminData", JSON.stringify(users))
            }

            setUsers(data);
            return localStorage.setItem("UsersAdminData", JSON.stringify(users))
    };

    const onEnterSearchHandler = async (event) => {if (event.keyCode === 13) await searchHandler()};

    const changeHandler = event => setSearch(event.target.value);

    return (
        <UsersContext.Provider value={{
            users, setUsers, search, setSearch, changeHandler, doSearch: searchHandler
        }}>
            <div>
                <div className="search">
                    <div className="row-block">
                        <span className="helper-text">Введите Login или Email для поиска</span>
                        <div className="input-field col s12 in-val">
                            <div className="submit-search" style={{cursor: "pointer"}} onClick={searchHandler}>
                                <button className="btn"><i className="material-icons prefix">send</i></button>
                            </div>
                            <input id="search" type="text" className="validate" onChange={changeHandler} onKeyDown={onEnterSearchHandler}/>
                        </div>
                    </div>
                </div>
                <div className="users-content">
                    {
                        users.map((i)=>
                            <UserItem
                                key       =    {i._id}
                                props     =    {i}
                            />
                        )
                    }
                </div>
            </div>
        </UsersContext.Provider>
    );
};