import * as React from 'react';
import {Component} from "react";
import {Redirect} from "react-router";

interface IProgramConstructorProps {
    isLoggedIn: boolean
}


//TODO: remove any
export default class ProgramConstructor extends Component<IProgramConstructorProps, any> {
    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to="/"/>
        }

        return(
            <h1>asd</h1>
        )
    }
}