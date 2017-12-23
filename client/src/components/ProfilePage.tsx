import * as React from 'react';
import {Component} from "react";
import {UserData} from '../types/index';
import {Link} from "react-router-dom";

interface IProfilePageProps {
    userData: UserData
}

export default class ProfilePage extends Component<IProfilePageProps, {}> {
    render() {
        const {userData} = this.props;

        return(
            <div>
                <h2>Информация обо мне</h2>
                <ul style={{listStyleType: "none"}}>
                    <li>ID: {userData._id}</li>
                    <li>Юзернейм: {userData.username}</li>
                    <li>Эмейл: {userData.email}</li>
                </ul>
                <Link to="/">Назад на главную</Link>
            </div>
        )
    }
}