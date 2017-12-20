import * as React from 'react'
import {Component} from "react";
import {BrowserRouter} from "react-router-dom"
import {Switch, Route} from "react-router"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import FitnessApp from "./components/FitnessApp";

import axios from 'axios'

import {UserData} from './types/index'
import ProgramsConstructor from "./components/ProgramsConstructor";
import ProgramPage from "./components/ProgramPage";

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

    }

    getUserData() {
        const storage = window.localStorage;
        const usersToken = storage.getItem("token");
        if (!usersToken) {
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
                    'Authorization': 'Bearer ' + usersToken
                }
            })

            .then((res: any) => {
                console.log(res.data);
                this.setState({
                    isLoggedIn: true,
                    userData: res.data
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


    componentWillMount() {
        this.getUserData();
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
        

        return(
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" render={() => <FitnessApp isLoggedIn={isLoggedIn} userData={userData} />} />

                    <Route exact={true} path="/signup" render={() => <SignUp isLoggedIn={isLoggedIn} />} />

                    <Route exact={true} path="/signin" render={() => <SignIn getUserDataFromSignIn={(res: any) => this.getUserDataFromSignIn(res)} isLoggedIn={isLoggedIn} />} />

                    <Route exact={true} path="/programs_constructor" render={() => <ProgramsConstructor userData={userData} isLoggedIn={isLoggedIn} />} />

                    <Route exact={true} path="/programs/:id" render={() => <ProgramPage  />} />

                    <Route exact={true} path="*" render={() => <h1>404 page not found (route for a page)</h1>} />
                </Switch>
            </BrowserRouter>
        )
    }
}