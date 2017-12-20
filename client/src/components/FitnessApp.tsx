import * as React from 'react';
import {Component} from "react";

import Header from "./Header"

import "./components-styles/FitnessApp.css"

import { UserData} from '../types/index'
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
        //
        // const titles = this.props.userData.programs
        //     .map((program: any) => <h3>{program.title}</h3>)
        //     .reduce(prev: any, curr: any) => [prev, ', ', curr])
        let titles;
        if (isLoggedIn) {
            titles = userData.programs
                .map((program: any) => <Link key={program._id} style={{fontSize: '44px', display: 'block'}} to={`/programs/${program._id}`}>{program.title}</Link>)
        } else {
            titles = <h3>Кажется, у вас нет программ!</h3>
        }


        return(
            <div className="FitnessApp">
                <Header userData={userData} isLoggedIn={isLoggedIn} />
                <h1>Мои программы</h1>
                {/*{userData.programs.length == 0 ? <h1>It appears that u have no progs</h1> : <h1>u have some progs</h1>}*/}
                {/*{userLoggedIn ? <ExercisesSection/> : null}*/}
                {titles}
                <Link to="/programs_constructor">Сделать программу</Link>
            </div>
        )
    }
}