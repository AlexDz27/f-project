import * as React from 'react';
import {Component} from "react";

import Header from "./Header"

import "./components-styles/FitnessApp.css"

import axios from 'axios'
import ProgramsSection from "./ProgramsSection";

import {Program, UserData} from '../types/index'

export interface IFitnessAppProps {
    doRedirect: boolean
}

export interface IFitnessAppStates {
    userData?: UserData
    userLoggedIn: boolean
    usersPrograms: Array<Program>
}

export default class FitnessApp extends Component<IFitnessAppProps, IFitnessAppStates> {
    constructor(props: any) {
        super(props);

        this.state = {
            userData: undefined,
            userLoggedIn: false,
            usersPrograms: []
        }

        this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
    }

    checkIfLoggedIn() {
        const storage = window.localStorage;
        const usersToken = storage.getItem("token");
        if (!usersToken) {
            return
        } else {
            axios.request({url:'http://localhost:9000/api/users/check/',method:'post', data: {token: usersToken}})
                .then((res: any) => {
                    console.log(res.data);
                    this.setState({
                        userData: res.data,
                        userLoggedIn: true
                    })
                })
                .catch((err: any) => console.log(err))
            }
        }
        // console.log(usersToken);


    componentDidMount() {
        this.checkIfLoggedIn();
    }

    render() {
        const {userData, userLoggedIn, usersPrograms} = this.state;

        // // let userLoggedIn;
        // Object.keys(userData).length === 0 ? this.setState({userLoggedIn: true}) : this.setState({userLoggedIn: false})
        // console.log(this.state.userLoggedIn);

        return(
            <div className="FitnessApp">
                <Header userData={userData} userLoggedIn={userLoggedIn} />
                {/*<ProgramsSection userData={userData} userLoggedIn={userLoggedIn} />*/}
                {userLoggedIn ? <ProgramsSection userData={userData} userLoggedIn={userLoggedIn} usersPrograms={usersPrograms} /> : <h2>You have no progs yet!</h2>}
                {/*{userLoggedIn ? <ExercisesSection/> : null}*/}
            </div>
        )
    }
}