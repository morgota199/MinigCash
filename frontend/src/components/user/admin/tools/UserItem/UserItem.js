import React, {useContext, useEffect, useState} from "react";
import {AuthContext, UsersContext} from "../../../../../context/auth.context";
import {useHttp} from "../../../../../hooks/http.hook";
import {useMessage} from "../../../../../hooks/message.hook";
import {NavLink, Route, Switch} from "react-router-dom";
import {Balance, Load, Ref} from "./subUserItem";
import "../../../../../style/UserItem.css"

export const UserItem = (props) => {
    const { request } = useHttp(),
        message = useMessage();

    const {users, setUsers, search} = useContext(UsersContext),
        {token} = useContext(AuthContext);

    const [block, setBlock] = useState(props.block),
        [admin, setAdmin] = useState(props.isAdmin),
        [reference, setReference] = useState(props.reference.ref_register),
        [adminIcon, setAdminIcon] = useState(admin ? "remove_circle_outline" : "add_circle_outline"),
        [blockIcon, setBlockIcon] = useState(block ? "do_not_disturb_off" : "do_not_disturb_on");

    useEffect(() => {
        (
            async () => {
                try {
                    const data = await request("/search-all-ref-user", "POST", {ref: props.reference.ref_register}, {token});

                    if (data && data.refUsers) {
                        setReference(data.refUsers);
                    }
                } catch (e) {
                    console.log("Нет ответа");
                }
        })();
    }, [request, token, props]);

    const adminHandler = async () => {
        if(!admin){
            const data = await request("/add-admin-user", "POST", {addAdminUserId: props._id}, {token});

            if(data){
                message(data.message);
                setAdmin(true);
                setAdminIcon("remove_circle_outline");
            }
        } else {
            const data = await request("/remove-admin-user", "POST", {removeAdminUserId: props._id}, {token});

            if(data){
                message(data.message);
                setAdmin(false);
                setAdminIcon("add_circle_outline");
            }
        }

    };

    const blockHandler = async () => {
        if(!block){
            const data = await request("/block-user", "POST", {blockUserId: props._id}, {token});

            if(data){
                message(data.message);
                setBlock(true);
                setBlockIcon("do_not_disturb_off");
            }
        } else {
            const data = await request("/unblock-user", "POST", {unblockUserId: props._id}, {token});

            if(data){
                message(data.message);
                setBlock(false);
                setBlockIcon("do_not_disturb_on");
            }
        }
    };

    const removeHandler = async () => {
        const candidate = users.filter(i => i._id === props._id)[0];

        const data = await request("/remove-user", "POST", {removeUser: candidate}, {token});

        message(data.message);

        const user = users.filter(i => {return i._id !== props._id});
        setUsers(user);

        localStorage.setItem("UsersAdminData", JSON.stringify(user));
    };
    
    const searchUsersByIdHandler = async event => {
        if(event.target.innerHTML !== "Нет") {
            const data = await request("/search-user-by-id", "POST", {searchParam: event.target.innerHTML}, {token});

            if (!data.searchUser && !search) {
                setUsers([]);
                localStorage.setItem("UsersAdminData", JSON.stringify(users));
            } else if (!data.searchUser && search) {
                setUsers([]);
                localStorage.setItem("UsersAdminData", JSON.stringify(users));
                message("Такого пользователя нет")
            } else {
                setUsers([data.searchUser]);
                localStorage.setItem("UsersAdminData", JSON.stringify(users));
            }
        }
    };

    const searchOnLoginAndEmailHandler = async event => {
        const data = await request("/search-user", "POST", {searchParam: event.target.innerHTML}, {token});

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
    };

    return(
        <div className="user-item">
            <div className="title"><p>Информация о пользователе</p></div>
            <div className="name-info">
                <div className="name">
                    <span>Login: <b>{props.userName}</b></span>
                    <span>Email: <b>{props.email}</b></span>
                </div>
                <div className="control">
                    <span data-title="Администратор" className="admin" onClick={adminHandler}><i className="material-icons">{adminIcon}</i></span>
                    <span data-title="Блокировать" className="block" onClick={blockHandler}><i className="material-icons">{blockIcon}</i></span>
                    <span data-title="Удалить" className="clear" onClick={removeHandler}><i className="material-icons">clear</i></span>
                </div>
            </div>
            <div className="selector-menu-user">
                <div className="static-data">
                    <span>Администратор: <b>{admin ? "Да" : "Нет"}</b></span>
                    <br/>
                    <div>Пришел по ссылке: <b><span onClick={searchUsersByIdHandler}>{props.forRef ? `${props.forRef}` : "Нет"}</span></b></div>
                </div>

                <div className="user-selector">
                    <div className="search-users-container">
                        <ul className="search-user-menu">
                            <NavLink to="/user/admin/user-tools/load"><li >Нагрузка</li></NavLink>
                            <NavLink to="/user/admin/user-tools/balance"><li >Баланс</li></NavLink>
                            <NavLink to="/user/admin/user-tools/ref"><li >Рефералы</li></NavLink>
                        </ul>
                    </div>
                    <div className="blank">
                        <Switch>
                            <Route path="/user/admin/user-tools/load" render={() => <Load props={props} />}/>
                            <Route path="/user/admin/user-tools/balance" render={() => <Balance props={props}/>} />
                            <Route path="/user/admin/user-tools/ref" render={() =>
                                <Ref
                                    reference={reference}
                                    searchUsersById={searchUsersByIdHandler}
                                    searchOnLoginAndEmailHandler={searchOnLoginAndEmailHandler}/>} />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
};