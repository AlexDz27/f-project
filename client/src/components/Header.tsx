import * as React from 'react';
import {Component} from "react";

import "./components-styles/Header.css"
import {UserData} from "../types/index";

// import {UserData} from '../types/index'

// const LoginActionButton = (props: any) => props.action ? <a href={`/${props.action}`}>{props.action}</a> : null


export interface IHeaderProps {
    userData?: UserData
    isLoggedIn: boolean
}

export default class Header extends Component<IHeaderProps, {}> {
    handleLogout() {
        // e.preventDefault();
        
        // const usersToken = localStorage.getItem('token');
        localStorage.removeItem('token')
    }


    render() {
        const {userData, isLoggedIn} = this.props;

        // let userLoggedIn;
        // Object.keys(userData).length === 0 ? userLoggedIn = false : userLoggedIn = true
        // console.log(userLoggedIn);

        return(
            <header className="Header header">
                <img src="../../public/img/Capture.PNG" alt=""/>
                <span className="Header__initials">Fitness App</span>
                <span className="Header__initials">Welcome,
                    {isLoggedIn && userData ? ` ${userData.username}` : " Anonymous"}
                </span>
                <div className="user-bar">
                    {isLoggedIn ? <a onClick={() => this.handleLogout()} href="/">Sign out</a> : <div><a href="/signin">Sign in</a> <a href="/signup">Sign up</a></div>}
                    {/*<LoginActionButton onClick={(e: any) => this.handleLogout(e)} action={userLoggedIn ? 'signout' : 'signin'} />*/}
                    {/*<LoginActionButton action={!userLoggedIn ? 'register' : ''} />*/}
                    {/*<a onClick={(e: any) => this.handleLogout(e)} href="/logout">Log out my</a>*/}
               </div>
            </header>
        )
    }
}