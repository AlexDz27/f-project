import * as React from 'react';
import {Component} from "react";

import "./components-styles/Sign.css"
import {Link} from "react-router-dom";

import axios from "axios";
import {Redirect} from "react-router";

export interface ISignUpProps {
    isLoggedIn: boolean
}

export interface ISignUpStates {
    newUserName: string
    newUserEmail: string
    newUserPassword: string
    doRedirect: boolean
}

class NewUser {
    username: string
    email: string
    password: string

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

export default class SignUp extends Component<ISignUpProps, ISignUpStates> {
    constructor(props: any) {
        super(props);

        this.state = {
            newUserName: "",
            newUserEmail: "",
            newUserPassword: "",
            doRedirect: false
        }
    }

    handleUsernameChange(e: any) {
        this.setState({
            newUserName: e.target.value
        })
    }

    handleEmailChange(e: any) {
        this.setState({
            newUserEmail: e.target.value
        })
    }

    handlePasswordChange(e: any) {
        this.setState({
            newUserPassword: e.target.value
        })
    }

    handleAddUser(e: any) {
        const {newUserName, newUserEmail, newUserPassword} = this.state;

        e.preventDefault();
        const newUserObj = new NewUser(newUserName, newUserEmail, newUserPassword);
        axios.request({url: "http://localhost:9000/api/users", method: 'post', data: newUserObj})
            // .then((res: any) => console.log(res.data))
            // .then(() => {
            //     this.setState({
            //         doRedirectToSignIn: true
            //     })
            // })
            .then(() => {
                this.setState({
                    doRedirect: true
                })
            })
            .catch((err: any) => console.log(err))
    }

    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to="/" />
        }

        if (this.state.doRedirect) {
            return <Redirect to="/signin"/>
        }

        return(
            <div className="SignUp">
                <div className="container">
                    <div className="card card-container">
                        <h1>Sign up</h1>
                        <form className="form-signin">
                            Username<br/>
                            <input onChange={(e: any) => this.handleUsernameChange(e)} type="text" name="username" className="form-control" placeholder="Username" required={true} autoFocus={true} />
                            Email<br/>
                            <input onChange={(e: any) => this.handleEmailChange(e)} type="email" name="email" className="form-control" placeholder="Email" required={true} />
                            Password<br/>
                            <input onChange={(e: any) => this.handlePasswordChange(e)} type="password" name="password" className="form-control" placeholder="Password" required={true} />
                            <br/>
                            <input type="submit"
                                   onClick={(e) => this.handleAddUser(e)}
                                   className="btn btn-lg btn-primary btn-block btn-input-form"
                                   value="Sign up" />
                        </form>
                        <Link to="/">Go back</Link>
                    </div>
                </div>
            </div>
        )
    }
}