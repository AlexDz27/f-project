import * as React from 'react';
import {Component} from "react";

import Header from "./Header"

import "./components-styles/FitnessApp.css"

import {Program, UserData} from '../types/index'
import {Link} from "react-router-dom";

export interface IFitnessAppProps {
    isLoggedIn: boolean
    userData?: UserData | any
}

export interface IFitnessAppStates {
    userLoggedIn: boolean
}

export default class FitnessApp extends Component<IFitnessAppProps, IFitnessAppStates> {
    constructor(props: any) {
        super(props);

        this.state = {
            userLoggedIn: false
        }
    }


    render() {
        const {isLoggedIn, userData} = this.props;

        let titles;
        if (isLoggedIn && Object.keys(userData).length > 0) {
            titles = userData.programs
                .map((program: Program) => <Link key={program._id} style={{fontSize: '24px', display: 'block'}} to={`/programs/${program._id}`}>{program.title}</Link>)
        } else {
            titles = <h3>Кажется, вас нет в системе! <Link to="/signup">Зарегистрируйтесь </Link>или <Link to="/signin">залогиньтесь!</Link></h3>
        }

        let makeProgramMsg;
        if (Object.keys(userData).length > 0) {
            if (Object.keys(userData.programs).length === 0) {
                makeProgramMsg =  <h4>У вас нет программ! Самое время сделать новую!</h4>
            }
        }



        return(
            <div className="FitnessApp">
                <Header userData={userData} isLoggedIn={isLoggedIn} />
                <h1>Мои программы</h1>
                {titles}
                {makeProgramMsg}
                <Link style={{fontSize: "40px"}} to="/program_constructor">Сделать программу</Link>
            </div>
        )
    }
}