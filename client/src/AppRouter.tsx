import * as React from 'react'
import {Component} from "react";
import {BrowserRouter} from "react-router-dom"
import {Switch, Route} from "react-router"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import FitnessApp from "./components/FitnessApp";

import axios from 'axios'
import ProgramConstructor from "./components/ProgramConstructor";

import {UserData} from './types/index'

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
    }

    getUserData() {
        const storage = window.localStorage;
        const usersToken = storage.getItem("token");
        console.log(usersToken);
        if (!usersToken) {
            return
        } else {
            // axios.request({url: 'http://localhost:9000/api/users/check/', method: 'post', data: {token: usersToken}})
            //     .then((res: any) => {
            //         console.log(res.data);
            //         this.setState({
            //             isLoggedIn: true,
            //             userData: res.data
            //         })
            //     })
            //     .catch((err: any) => console.log(err))
            axios.get('http://localhost:9000/api/users/check/', {
                'headers': {
                    'Authorization': 'Bearer ' + this.state.userData.token
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

    componentWillMount() {
        this.getUserData();
    }

    render() {

        const {isLoggedIn} = this.state;

        return(
            <BrowserRouter>
                <Switch>
                    {/*TODO: make a page for showing one particular program*/}
                    <Route exact={true} path="/" render={() => <FitnessApp isLoggedIn={isLoggedIn} />} />

                    <Route exact={true} path="/signup" render={() => <SignUp isLoggedIn={isLoggedIn} />} />

                    <Route exact={true} path="/signin" render={() => <SignIn isLoggedIn={isLoggedIn} />} />

                    <Route exact={true} path="/program_constructor" render={() => <ProgramConstructor isLoggedIn={isLoggedIn} />} />

                    <Route exact={true} path="*" render={() => <h1>404 page not found (route for a page)</h1>} />
                </Switch>
            </BrowserRouter>
        )
    }
}