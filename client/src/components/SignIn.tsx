import * as React from 'react';
import {Component} from "react";

import "./components-styles/Sign.css"
import {Link} from "react-router-dom";

import axios from "axios";
import {Redirect} from "react-router";


export interface ISignInProps {
    isLoggedIn: boolean
    getUserDataFromSignIn: Function
}

export interface ISignInStates {
    newUserNameCheck: string
    newUserPasswordCheck: string
    doRedirect: boolean
}


export default class SignIn extends Component<ISignInProps, ISignInStates> {
    constructor(props: any) {
        super(props);

        this.state = {
            newUserNameCheck: "",
            newUserPasswordCheck: "",
            doRedirect: false
        }
    }

    handleUsernameCheckChange(e: any) {
        this.setState({
            newUserNameCheck: e.target.value //was newUserName for some reason
        })
    }

    handlePasswordCheckChange(e: any) {
        this.setState({
            newUserPasswordCheck: e.target.value //was newUserPassword for some reason
        })
    }

    handleCheckUser(e: any) {
        const {newUserNameCheck, newUserPasswordCheck} = this.state;

        e.preventDefault();
        axios.request({url:'http://localhost:9000/api/auth',method:'post',auth: {
            username: newUserNameCheck,
            password: newUserPasswordCheck
        }})
        .then((res: any) => {
            this.props.getUserDataFromSignIn(res.data)
            const token = res.data.token;
            localStorage.setItem('token', token);
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
            return <Redirect to="/" />
        }

        return(
            <div className="SignIn">
                <div className="container">
                    <div className="card card-container">
                        <h1>Sign in</h1>
                        <form className="form-signin">
                            Username<br/>
                            <input onChange={(e: any) => this.handleUsernameCheckChange(e)}  type="text" name="username" className="form-control" placeholder="Username" required={true} autoFocus={true} />
                            Password<br/>
                            <input onChange={(e: any) => this.handlePasswordCheckChange(e)} type="password" name="password" className="form-control" placeholder="Password" required />
                            <input onClick={(e: any) => this.handleCheckUser(e)} type="submit" className="btn btn-lg btn-primary btn-block btn-input-form" value="Sign in" />
                        </form>
                        <Link to="/">Go back</Link>
                    </div>
                </div>
            </div>
        )
    }
}