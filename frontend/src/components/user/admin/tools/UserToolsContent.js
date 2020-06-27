import React, {useContext, useState} from "react";
import {useHttp} from "../../../../hooks/http.hook";
import {useMessage} from "../../../../hooks/message.hook";
import {AuthContext, UsersContext} from "../../../../context/auth.context";
import {UserItem} from "./UserItem/UserItem";

import "../../../../style/UserToolsContent.css"

export const UserToolsContent = () => {
    const { request } = useHttp(),
        message = useMessage();

    const { token } = useContext(AuthContext);

    const [users, setUsers] = useState(JSON.parse(localStorage.getItem("UsersAdminData")) || []),
        [search, setSearch] = useState(null);

    const doSearch = async () => {
        const data = await request("/search-user", "POST", {searchParam: search}, {token});

        if(!data.searchUser && !search){
            setUsers([]);
            localStorage.setItem("UsersAdminData", JSON.stringify(users));
        } else if(!data.searchUser && search){
            setUsers([]);
            localStorage.setItem("UsersAdminData", JSON.stringify(users));
            message("Такого пользователя нет")
        } else {
            setUsers([data.searchUser]);
            localStorage.setItem("UsersAdminData", JSON.stringify(users));
        }
    }

    const onEnterSearchHandler = async (event) => {if (event.keyCode === 13) await doSearch()};

    const changeHandler = event => setSearch(event.target.value);

    return (
        <UsersContext.Provider value={{
            users, setUsers, search, setSearch, changeHandler, doSearch
        }}>
            <div>
                <div className="search">
                    <div className="row-block">
                        <span className="helper-text">Введите Login или Email для поиска</span>
                        <div className="input-field col s12 in-val">
                            <div className="submit-search" style={{cursor: "pointer"}} onClick={doSearch}>
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
                                _id       =    {i._id}
                                reference =    {i.ref}
                                userName  =    {i.userName}
                                email     =    {i.email}
                                isAdmin   =    {i.isAdmin}
                                forRef    =    {i.forRef}
                                block     =    {i.block}
                                power     =    {i.power}
                                money     =    {i.money}
                            />
                        )
                    }
                </div>
            </div>
        </UsersContext.Provider>
    );
};