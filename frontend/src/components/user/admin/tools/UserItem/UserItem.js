import React, {useContext, useEffect, useState} from "react";
import {AuthContext, UsersContext} from "../../../../../context/auth.context";
import {useHttp} from "../../../../../hooks/http.hook";
import {useMessage} from "../../../../../hooks/message.hook";
import {NavLink, Route, Switch} from "react-router-dom";
import {Balance, Load, Ref} from "./subUserItem";
import "../../../../../style/UserItem.css"
import path from "../../../../../path.config";

export const UserItem = ({props}) => {
    const { request } = useHttp(),
        message = useMessage();

    const {users, setUsers, search} = useContext(UsersContext),
        {token} = useContext(AuthContext);

    const [block, setBlock] = useState(props.block),
        [admin, setAdmin] = useState(props.is_admin),
        [reference, setReference] = useState(props.ref.ref_register),
        [adminIcon, setAdminIcon] = useState(admin ? "remove_circle_outline" : "add_circle_outline"),
        [blockIcon, setBlockIcon] = useState(block ? "do_not_disturb_off" : "do_not_disturb_on");

    useEffect(() => {
        (async () => {
            try {
                const data = await request(
                    path.reference_refer,
                    "POST",
                    props.ref.ref_register,
                    {"Authorization": `Bearer ${token}`}
                );

                if (data && data.length !== 0) {
                    setReference(data);
                }
            } catch (e) {
                console.log("Нет ответа");
            }
        })();
    }, [request, token, props]);

    const adminHandler = async () => {
        if(!admin){
            const data = await request(
                path.user_add_admin.replace("{id}", props._id),
                "PATCH",
                null,
                {"Authorization": `Bearer ${token}`}
            );

            if(data === true){
                message(data.message);
                setAdmin(data);
                setAdminIcon("remove_circle_outline");
            }
        } else {
            const data = await request(
                path.user_remove_admin.replace("{id}", props._id),
                "PATCH",
                null,
                {"Authorization": `Bearer ${token}`}
            );

            if(data === false){
                message(data.message);
                setAdmin(data);
                setAdminIcon("add_circle_outline");
            }
        }

    };

    const blockHandler = async () => {
        if(!block){
            const data = await request(
                path.user_block.replace("{id}", props._id),
                "PATCH",
                null,
                {"Authorization": `Bearer ${token}`}
            );

            if(data === true){
                message(data.message);
                setBlock(data);
                setBlockIcon("do_not_disturb_off");
            }
        } else {
            const data = await request(
                path.user_unblock.replace("{id}", props._id),
                "PATCH",
                null,
                {"Authorization": `Bearer ${token}`}
            );

            if(data === false){
                message(data.message);
                setBlock(data);
                setBlockIcon("do_not_disturb_on");
            }
        }
    };

    const removeHandler = async () => {
        const data = await request(
            path.user_remove.replace("{id}", props._id),
            "DELETE",
            null,
            {"Authorization": `Bearer ${token}`}
        );

        message(data.message);

        const user = users.filter(i => {return i._id !== props._id});
        setUsers(user);

        localStorage.setItem("UsersAdminData", JSON.stringify(user));
    };

    const searchHandler = async event => {
        if(event.target.innerHTML === "Да") return

        const data = await request(`${path.user_search}/${event.target.innerHTML}`);

        if(data.length === 0) {
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

    return(
        <div className="user-item">
            <div className="title"><p>Информация о пользователе</p></div>
            <div className="name-info">
                <div className="name">
                    <span>Login: <b>{props.username}</b></span>
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
                    <div>Пришел по ссылке: <b><span onClick={searchHandler}>{props.forRef ? `${props.forRef}` : "Нет"}</span></b></div>
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
                                    search={searchHandler}
                                />} />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
};