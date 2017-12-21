import * as React from 'react';
import {Component} from "react";

import axios from 'axios'
import {Exercise, Program} from "../types/index";
import {Link} from "react-router-dom";
import {Redirect} from "react-router";
import {getUserToken} from "../AppRouter";

interface IProgramPageProps {
    params: any
    match: any
    isLoggedIn: boolean
    getNewUserDataAfterEditProgram: Function
}

interface IProgramPageStates {
    userProgram?: Program | null
    redirectAfterDelete: boolean
}

export default class ProgramPage extends Component<IProgramPageProps, IProgramPageStates> {
    constructor(props: IProgramPageProps) {
        super(props);

        this.state = {
            userProgram: undefined,
            redirectAfterDelete: false
        }

        this.getProgramFromServer = this.getProgramFromServer.bind(this);
    }

    getProgramFromServer() {
        const id = this.props.match.params.id

        axios.get(`http://localhost:9000/api/programs/${id}`, {
            'headers': {
                'Authorization': `Bearer ${getUserToken()}`
            }
        })
            .then((res: any) => {
                this.setState({
                    userProgram: res.data
                })
            })
    }

    deleteProgram(e: any) {
        e.preventDefault()
        const id = this.props.match.params.id
        
        axios.delete(`http://localhost:9000/api/programs/${id}`, {
            'headers': {
                'Authorization': `Bearer ${getUserToken()}`
            }
        })
            .then((res: any) => {
                this.props.getNewUserDataAfterEditProgram(res.data)
                this.setState({
                    redirectAfterDelete: true
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

        if (this.state.redirectAfterDelete) {
            return <Redirect to="/" />
        }

        const {userProgram} = this.state;

        let exercisesTemplate;
        if (userProgram) {
            exercisesTemplate = userProgram.exercises.map((item: Exercise) => {
                return(
                    <li key={item._id}>{item.title}<br/><small>{item.content}</small></li>
                )
            })
        }

        return(
            <div>
                {!userProgram ? <h1>Loading...</h1> : <h1>{userProgram.title}</h1>}
                <ul>
                    {exercisesTemplate}
                </ul>
                <a onClick={(e: any) => this.deleteProgram(e)} style={{color: "red"}} href="#">Удалить программу</a><br/>
                <Link to="/">Назад на главную</Link>
            </div>
        )
    }
}