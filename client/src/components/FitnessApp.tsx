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
                .map((program: Program) => <Link key={program._id} style={{fontSize: '24px', marginRight: '10px', marginBottom: '5px',display: 'block', width: "190px", height: "190px", backgroundColor: "#28a745", color: "yellow", padding: "60px 0", textAlign: "center"}} to={`/programs/${program._id}`}>{program.title}</Link>)
        } else {
            titles = <h3>Кажется, вас нет в системе! <Link to="/signup">Зарегистрируйтесь </Link>или <Link to="/signin">войдите!</Link></h3>
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
                <Link style={{fontSize: "35px"}} to="/program_constructor">Сделать программу</Link>
                <h1>Мои программы</h1>
                <div style={{width: "600px", margin: "0 auto",display: "flex", flexWrap: "wrap"}}>
                    {titles}
                    {makeProgramMsg}
                </div>
            </div>
        )
    }
}