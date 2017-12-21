import * as React from 'react'
import {Component} from "react";
import {BrowserRouter} from "react-router-dom"
import {Switch, Route} from "react-router"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import FitnessApp from "./components/FitnessApp";

import axios from 'axios'

import {UserData} from './types/index'
import ProgramConstructor from "./components/ProgramConstructor";
import ProgramPage from "./components/ProgramPage";


export function getUserToken() {
    const storage = window.localStorage;
    return storage.getItem("token");
}

export interface IAppRouterStates {
    userData?: UserData | any
    isLoggedIn: boolean
}


export default class AppRouter extends Component<{}, IAppRouterStates> {
    constructor(props: any) {
        super(props);

        this.state = {
            isLoggedIn: false,
            userData: {}
        }

        this.getUserData = this.getUserData.bind(this);
        this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
    }

    checkIfLoggedIn() {
        const userToken = getUserToken();
        if (userToken) {
            this.setState({
                isLoggedIn: true
            })
        }
    }

    getUserData() {
        const userToken = getUserToken();
        if (!userToken) {
            return
        } else {
            axios.get('http://localhost:9000/api/users/check/', {
                'headers': {
                    'Authorization': 'Bearer ' + userToken
                }
            })

            .then((res: any) => {
                this.setState({
                    userData: res.data,
                    isLoggedIn: true
                })
            })
            .catch((err: any) => console.log(err))
        }
    }

    getUserDataFromSignIn(res: any) {
        this.setState({
            isLoggedIn: true,
            userData: res.user
        })
    }

    getNewUserDataAfterMakeProgram(newUserData: UserData) {
        this.setState({
            userData: newUserData
        })
        this.getUserData();
    }
    
    componentWillMount() {
        this.getUserData();
        this.checkIfLoggedIn();
    }

    render() {

        const {isLoggedIn, userData} = this.state;
            //TODO: see to removeing token, need promises probably, or just leave it as is.............
/*        if (isLoggedIn && Object.keys(userData).length === 0) {
            localStorage.removeItem("token")
            this.setState({
                isLoggedIn: false
            })
        }*/


        return(
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" render={() => <FitnessApp isLoggedIn={isLoggedIn} userData={userData} />} />

                    <Route exact={true} path="/signup" render={() => <SignUp isLoggedIn={isLoggedIn} />} />

                    <Route exact={true} path="/signin" render={() => <SignIn getUserDataFromSignIn={(res: any) => this.getUserDataFromSignIn(res)} isLoggedIn={isLoggedIn} />} />

                    <Route exact={true} path="/program_constructor" render={() => <ProgramConstructor onAddProgram={(newUserData: UserData) => this.getNewUserDataAfterMakeProgram(newUserData)} userData={userData} isLoggedIn={isLoggedIn} />} />

                    <Route exact={true} path="/programs/:id" render={(props: any) => <ProgramPage isLoggedIn={isLoggedIn} {...props} />} />

                    <Route exact={true} path="*" render={() => <h1>404 page not found (route for a page)</h1>} />
                </Switch>
            </BrowserRouter>
        )
    }
}