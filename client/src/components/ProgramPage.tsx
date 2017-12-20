import * as React from 'react';
import {Component} from "react";
// import {Redirect} from "react-router";

import axios from 'axios'
import {Exercise, Program} from "../types/index";
import {Link} from "react-router-dom";
import {Redirect} from "react-router";

interface IProgramPageProps {
    params: any
    match: any
    isLoggedIn: boolean
}

interface IProgramPageStates {
    userProgram?: Program
}

export default class ProgramPage extends Component<IProgramPageProps, IProgramPageStates> {
    constructor(props: IProgramPageProps) {
        super(props);

        this.state = {
            userProgram: undefined
        }

        this.getProgramFromServer = this.getProgramFromServer.bind(this);
    }

    getProgramFromServer() {
        const id = this.props.match.params.id

        axios.get(`http://localhost:9000/api/programs/${id}`)
            .then((res: any) => {
                this.setState({
                    userProgram: res.data
                })
            })
    }

    componentWillMount() {
        this.getProgramFromServer()
    }

    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to="/" />
        }

        //TODO: see to isLoggedIn
        // if (!this.props.isLoggedIn) {
        //     return <Redirect to="/" />
        // }
        const {userProgram} = this.state;
        let exercisesTemplate;
        {!userProgram ? console.log('') : exercisesTemplate = userProgram.exercises.map((item: Exercise) => {
            return(
                <li key={item._id}>{item.title}<br/><small>{item.content}</small></li>
            )
        })}

        return(
            <div>
                {!userProgram ? <h1>Loading...</h1> : <h1>{userProgram.title}</h1>}
                <ul>
                    {exercisesTemplate}
                </ul>
                <Link to="/">Назад на главную</Link>
            </div>
        )
    }
}