import * as React from 'react';
import {Component} from "react";

import "./components-styles/Header.css"
import {UserData} from "../types/index";
import {Link} from "react-router-dom";


export interface IHeaderProps {
    userData?: UserData
    isLoggedIn: boolean
}

export default class Header extends Component<IHeaderProps, {}> {
    handleLogout() {
        localStorage.removeItem('token')
    }


    render() {
        const {userData, isLoggedIn} = this.props;

        return(
            <header className="Header header">
                <span className="Header__initials display-4">Fitness App</span>
                <span className="Header__initials">Добро пожаловать,
                    <Link to="/me" style={{color: "green"}}>{isLoggedIn && userData ? ` ${userData.username}` : " Anonymous"}</Link>
                </span>
                <div className="user-bar">
                    {isLoggedIn ? <a onClick={() => this.handleLogout()} href="/">Выйти</a> : <div><a href="/signin">Войти</a> <a href="/signup">Регистрация</a></div>}
               </div>
            </header>
        )
    }
}