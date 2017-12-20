import * as React from 'react';
import {Component} from "react";
import {Redirect} from "react-router";


export interface IProfile {
    doRedirect: boolean
}

export default class Profile extends Component<any, any> { //TODO: add appropriate int-es
    render() {
        if (!this.props.doRedirect) {
            return <Redirect to="/" />
        }
        //TODO: mb ne nuzhen mne dazhe profile etot... u menya vsyo v FApp
        return(
            <h2>User's anonym profile</h2>
        )
    }
}