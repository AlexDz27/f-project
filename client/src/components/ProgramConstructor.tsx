import * as React from 'react';
import {Component} from "react";

import "./components-styles/FitnessApp.css"
import ExercisesSection from "./ExercisesSection";

import {Exercise, Program, UserData} from '../types/index'

import axios from 'axios'
import {getUserToken} from "../AppRouter";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";

export interface IProgramConstructorStates {
    program: Program
    exercisesFromServer: any
    redirectAfterMakeProgram: boolean
}

export interface IProgramConstructorProps {
    userData?: UserData
    exercisesFromServer: Array<Exercise>
}

export default class ProgramConstructor extends Component<any, IProgramConstructorStates> { //TODO: int for IProgramsSectionProps
    constructor(props: any) {
        super(props);
        this.state = {
            program: {
                title: '',
                exercises: [],
            },
            exercisesFromServer: [],
            redirectAfterMakeProgram: false
        }

        this.loadExercisesDataFromServer = this.loadExercisesDataFromServer.bind(this);
    }

    getExercise(exercise: Exercise) {
        const {program} = this.state;
        program.exercises.push(exercise);
        this.setState({program});
    }

    removeExercise(exercise: Exercise) {
        const {program} = this.state;
        program.exercises = program.exercises.filter((item: Exercise) => {
            return item._id !== exercise._id
        });
        this.setState({program})
    }

    makeProgram() {
        const userToken = getUserToken()
        const newProgram: Program = new Program(this.state.program.title, this.state.program.exercises)
        axios.post(`http://localhost:9000/api/users/${this.props.userData._id}/my_programs`, newProgram, {
            'headers': {
                'Authorization': 'Bearer ' + userToken
            }
        })
            .then((res: any) => this.props.onAddProgram(res.data))
            .then(() => alert(`Ваша программа ${this.state.program.title} успешно добавлена!`))
            .then(() => this.setState({
                redirectAfterMakeProgram: true
            }))
            .catch((err: any) => console.log(err))
    }

    updateProgramTitle(evt: any) {
        const {program} = this.state;
        program.title = evt.target.value;
        this.setState({program});
    }

    loadExercisesDataFromServer() {
        axios.get("http://localhost:9000/api/exercises")
            .then((res: any) => {
                this.setState({
                    exercisesFromServer: res.data
                })
            })
            .catch((err: any) => console.log(err))
    }

    componentWillMount() {
        this.loadExercisesDataFromServer()
    }

    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to="/" />
        }

        if (this.state.redirectAfterMakeProgram) {
            return <Redirect to="/" />
        }

        const {program: {exercises}, exercisesFromServer} = this.state;

        const exercisesHtml = exercises.map((exercise: Exercise, index: number) => <p
            onClick={() => this.removeExercise(exercise)}>{exercise.title}</p>);

        return (
            <div className="mb-15rem">
                <input style={{width: "400px"}} value={this.state.program.title} placeholder="Введите имя программы" onChange={evt => this.updateProgramTitle(evt)}/>
                <br/>
                {exercisesHtml}
                <button onClick={() => this.makeProgram()}>Сделать программу</button><br/>
                <Link to="/">Назад на главную</Link>
                <ExercisesSection exercisesFromServer={exercisesFromServer}
                                  getExercise={(exercise: Exercise) => this.getExercise(exercise)}/>
            </div>
        )
    }
}