import * as React from 'react'
import {Component} from "react";
import {BrowserRouter} from "react-router-dom"
import {Switch, Route} from "react-router"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import FitnessApp from "./components/FitnessApp";
import Profile from "./components/Profile";

import axios from 'axios'

import {IAppRouterStates} from './types/index'

export default class AppRouter extends Component<{}, IAppRouterStates> {
    constructor(props: any) {
        super(props);

        this.state = {
            doRedirect: false
        }
    }

    checkIfLoggedIn() {
        const storage = window.localStorage;
        const usersToken = storage.getItem("token");
        console.log(usersToken);
        if (!usersToken) {
            return
        } else {
            axios.request({url: 'http://localhost:9000/api/users/check/', method: 'post', data: {token: usersToken}})
                .then((res: any) => {
                    console.log(res.data);
                    this.setState({
                        doRedirect: true
                    })
                })
                .catch((err: any) => console.log(err))
        }
    }

    componentDidMount() {
        this.checkIfLoggedIn();
    }

    render() {

        const {doRedirect} = this.state;

        return(
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" render={() => <FitnessApp doRedirect={doRedirect} />} />

                    <Route exact={true} path="/signup" render={() => <SignUp doRedirect={doRedirect} />} />

                    <Route exact={true} path="/signin" render={() => <SignIn doRedirect={doRedirect} />} />

                    <Route exact={true} path="/profile" render={() => <Profile doRedirect={doRedirect} />} />

                    <Route exact={true} path="*" render={() => <h1>404 page not found (route for a page)</h1>} />
                </Switch>
            </BrowserRouter>
        )
    }
}