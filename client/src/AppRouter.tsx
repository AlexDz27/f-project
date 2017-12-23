import * as React from 'react'
import {Component} from "react";
import {BrowserRouter} from "react-router-dom"
import {Switch, Route} from "react-router"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import FitnessApp from "./components/FitnessApp";

import axios from 'axios'

import {Program, UserData} from './types/index'
import ProgramConstructor from "./components/ProgramConstructor";
import ProgramPage from "./components/ProgramPage";
import ProfilePage from "./components/ProfilePage";


export function getUserToken() {
    const storage = window.localStorage;
    return storage.getItem("token");
}

export interface IAppRouterStates {
    userData: UserData | any
    isLoggedIn: boolean
    userProgramToUpdate: Program | any
}

export default class AppRouter extends Component<{}, IAppRouterStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoggedIn: false,
            userData: {},
            userProgramToUpdate: {}
        }

        this.getUserData = this.getUserData.bind(this);
        this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
    }

    checkIfLoggedIn() {
        if (getUserToken()) {
            this.setState({
                isLoggedIn: true
            })
        }
    }

    getUserData() {
        if (!getUserToken()) {
            return
        } else {
            axios.get('http://localhost:9000/api/users/check/', {
                'headers': {
                    'Authorization': 'Bearer ' + getUserToken()
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

    getNewUserDataAfterEditProgram(newUserData: UserData) {
        this.setState({
            userData: newUserData
        })
    }

    toBeUpdatedInfo(userProgramToUpdate: Program) {
        this.setState({
            userProgramToUpdate: userProgramToUpdate
        })
    }

    removeUpdateStage() {
        this.setState({
            userProgramToUpdate: {}
        })
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

                    <Route exact={true} path="/me" render={() => <ProfilePage userData={userData} />} />

                    <Route exact={true} path="/program_constructor/" render={(props: any) => <ProgramConstructor
                        onAddProgram={(newUserData: UserData) => this.getNewUserDataAfterEditProgram(newUserData)}
                        userData={userData}
                        isLoggedIn={isLoggedIn}
                        userProgramToUpdate={this.state.userProgramToUpdate}
                        removeUpdateStage={() => this.removeUpdateStage()}
                        {...props} />} />

                    <Route exact={true} path="/programs/:id" render={(props: any) => <ProgramPage
                        getNewUserDataAfterEditProgram={(newUserData: UserData) => this.getNewUserDataAfterEditProgram(newUserData)}
                        isLoggedIn={isLoggedIn}
                        toBeUpdatedInfo={(userProgramToUpdate: Program) => this.toBeUpdatedInfo(userProgramToUpdate)}
                        {...props} />} />

                    <Route exact={true} path="*" render={() => <h1>404 page not found (route for a page)</h1>} />
                </Switch>
            </BrowserRouter>
        )
    }
}