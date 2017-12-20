import * as React from 'react';
import {Component} from "react";
// import {Redirect} from "react-router";

import axios from 'axios'

interface IProgramPageProps {
    // params:any
    // isLoggedIn: boolean
}

export default class ProgramPage extends Component<IProgramPageProps, any> {
    constructor(props: IProgramPageProps) {
        super(props);

        this.getProgramFromServer = this.getProgramFromServer.bind(this);
    }

    getProgramFromServer() {
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1)
        console.log(id);
        // console.log(this.props.params.id)

        axios.get(`http://localhost:9000/api/programs/${id}`)
            .then((res: any) => {
                console.log(res);
            })
    }

    componentWillMount() {
        this.getProgramFromServer()
    }

    render() {
        // if (!this.props.isLoggedIn) {
        //     return <Redirect to="/" />
        // }

        return(
            <div>
                one program page
            </div>
        )
    }
}