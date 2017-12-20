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
        // this.loadProgramsFromServer = this.loadProgramsFromServer.bind(this);
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
            // axios.request({url: 'http://localhost:9000/api/users/check/', method: 'post', data: {token: usersToken}})
            //     .then((res: any) => {
            //         this.setState({
            //             isLoggedIn: true,
            //             userData: res.data
            //         })
            //     })
            //     .catch((err: any) => console.log(err))
            // debugger
            axios.get('http://localhost:9000/api/users/check/', {
                'headers': {
                    'Authorization': 'Bearer ' + userToken
                }
            })

            .then((res: any) => {
                console.log(res.data);
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

    logNewUserDataAfterMakeProgram(newUserData: UserData) {
        this.setState({
            userData: newUserData
        })
    }
    
    componentWillMount() {
        this.getUserData();
        this.checkIfLoggedIn();
        // this.loadProgramsFromServer();
        // setTimeout(this.loadProgramsFromServer, 2000) /** а через сетТаймаут работает**/
    }

    render() {

        const {isLoggedIn, userData} = this.state;
        
        const token = localStorage.getItem('token')
        console.log(token);
        
        if (token) {
            console.log('user got token');
        } else {
            console.log('user aint got a token');
        }
        
        console.log(userData.programs);
        

        return(
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" render={() => <FitnessApp isLoggedIn={isLoggedIn} userData={userData} />} />

                    <Route exact={true} path="/signup" render={() => <SignUp isLoggedIn={isLoggedIn} />} />

                    <Route exact={true} path="/signin" render={() => <SignIn getUserDataFromSignIn={(res: any) => this.getUserDataFromSignIn(res)} isLoggedIn={isLoggedIn} />} />

                    <Route exact={true} path="/program_constructor" render={() => <ProgramConstructor onAddProgram={(newUserData: UserData) => this.logNewUserDataAfterMakeProgram(newUserData)} userData={userData} isLoggedIn={isLoggedIn} />} />

                    <Route exact={true} path="/programs/:id" render={(props: any) => <ProgramPage isLoggedIn={isLoggedIn} {...props} />} />

                    <Route exact={true} path="*" render={() => <h1>404 page not found (route for a page)</h1>} />
                </Switch>
            </BrowserRouter>
        )
    }
}