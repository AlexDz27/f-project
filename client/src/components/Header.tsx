import * as React from 'react';
import {Component} from "react";

import "./components-styles/Header.css"
import {UserData} from "../types/index";


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
                <span className="Header__initials">Welcome,
                    {isLoggedIn && userData ? ` ${userData.username}` : " Anonymous"}
                </span>
                <div className="user-bar">
                    {isLoggedIn ? <a onClick={() => this.handleLogout()} href="/">Sign out</a> : <div><a href="/signin">Sign in</a> <a href="/signup">Sign up</a></div>}
               </div>
            </header>
        )
    }
}