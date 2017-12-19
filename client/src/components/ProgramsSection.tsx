import * as React from 'react';
import {Component} from "react";

import "./components-styles/FitnessApp.css"
import ExercisesSection from "./ExercisesSection";

import {Exercise, Program, UserData} from '../types/index'

//TODO: deal with the same names for states in FitnessApp and ProgramsSection

import axios from 'axios'

export interface IProgramsSectionStates {
    program: Program,
    userPrograms: Array<Program>
}

export interface IProgramsSectionProps {
    userData?: UserData
    userLoggedIn: boolean
    userPrograms: Array<Program>
}

export default class ProgramsSection extends Component<any, IProgramsSectionStates> { //TODO: int for IProgramsSectionProps
    constructor(props: any) {
        super(props);

        this.state = {
            program: {
                title: '',
                exercises: []
            },
            userPrograms: [],
        }
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
        const newProgram: Program = new Program(this.state.program.title, this.state.program.exercises)
        axios.post(`http://localhost:9000/api/users/${this.props.userData._id}/my_programs`, newProgram, {
            'headers': {
                'Authorization': 'Bearer ' + this.props.userData.token
            }
        })
            .then((responseData: any) => {
                this.setState({
                    userPrograms: [...this.state.userPrograms, responseData.data]
                })
            })
            .catch((err: any) => console.log(err))
    }

    updateProgramTitle(evt: any) {
        const {program} = this.state;
        program.title = evt.target.value;
        this.setState({program});
    }
    //TODO: REFACTOR UP

    render() {
        const {userPrograms, program: {exercises}} = this.state;
        const exercisesHtml = exercises.map((exercise: Exercise, index: number) => <p
            onClick={() => this.removeExercise(exercise)}>{exercise.title}</p>);

        return (
            <div className="mb-15rem">
                <h1>Мои программы</h1>
                <input value={this.state.program.title} onChange={evt => this.updateProgramTitle(evt)}/>
                <br/>
                {exercisesHtml}
                <button onClick={() => this.makeProgram()}>Сделать программу</button>
                {/*{userPrograms.map((item: any, index: number) => <a href="#" key={index}>{item.title} - Посмотреть</a>)}*/}
                {userPrograms.map((item: any, index: number) => <a href="#"
                                                                   key={index}>{item.title} {item.exercises.map((item: any, index: number) => {
                    return <a href="#">{item.title}</a>
                })}</a>)}

                <ExercisesSection getExercise={(exercise: Exercise) => this.getExercise(exercise)}/>
            </div>
        )
    }
}