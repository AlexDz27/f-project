import * as React from 'react';
import {Component} from "react";

import Header from "./Header"

import "./components-styles/FitnessApp.css"

import axios from 'axios'
import ProgramsSection from "./ProgramsSection";

import {Program, UserData} from '../types/index'

export interface IFitnessAppProps {
    isLoggedIn: boolean
}

export interface IFitnessAppStates {
    userData?: UserData | any
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
        this.loadProgramsFromServer = this.loadProgramsFromServer.bind(this)
    }

    checkIfLoggedIn() {
        const storage = window.localStorage;
        const usersToken = storage.getItem("token");
        if (!usersToken) {
            return
        } else {
            //TODO: rewrite to GET, not POST (по идее тупо config write i vsyo
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

    loadProgramsFromServer() { //TODO: how do i get over it???
        if (!this.state.userData) {
            return
        } else {
            axios.get(`http://localhost:9000/api/users/${this.state.userData._id}/my_programs`, {
                'headers': {
                    'Authorization': 'Bearer ' + this.state.userData.token
                }
            })
                .then((responseData: any) => {
                    console.log(responseData.data);
                })
        }

    }

    componentWillMount() {
        this.checkIfLoggedIn();
        this.loadProgramsFromServer()
    }

    render() {
        const {userData, userLoggedIn, usersPrograms} = this.state;

        // // let userLoggedIn;
        // Object.keys(userData).length === 0 ? this.setState({userLoggedIn: true}) : this.setState({userLoggedIn: false})
        // console.log(this.state.userLoggedIn);
        //TODO: REFACTOR unneccessary props, remve them
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