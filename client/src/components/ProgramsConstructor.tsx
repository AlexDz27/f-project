import * as React from 'react';
import {Component} from "react";

import "./components-styles/FitnessApp.css"
import ExercisesSection from "./ExercisesSection";

import {Exercise, Program, UserData} from '../types/index'

//TODO: deal with the same names for states in FitnessApp and ProgramsConstructor

import axios from 'axios'

export interface IProgramsConstructorStates {
    program: Program
    exercisesFromServer: any
}

export interface IProgramsConstructorProps {
    userData?: UserData
    exercisesFromServer: Array<Exercise>
}

export default class ProgramsConstructor extends Component<any, IProgramsConstructorStates> { //TODO: int for IProgramsSectionProps
    constructor(props: any) {
        super(props);
        this.state = {
            program: {
                title: '',
                exercises: [],
            },
            exercisesFromServer: []
        }

        // this.updateUserProgramsBeforeMount = this.updateUserProgramsBeforeMount.bind(this)
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
        const newProgram: Program = new Program(this.state.program.title, this.state.program.exercises)
        axios.post(`http://localhost:9000/api/users/${this.props.userData._id}/my_programs`, newProgram, {
            'headers': {
                'Authorization': 'Bearer ' + this.props.userData.token
            }
        })
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

    /*    updateUserProgramsBeforeMount() {
            this.setState({
                userPrograms: [...this.state.userPrograms, this.props.userData.programs]
            })
        }

        componentWillMount() {
            this.updateUserProgramsBeforeMount()
        }*/

    componentWillMount() {
        this.loadExercisesDataFromServer()
    }

    render() {
        const {program: {exercises}, exercisesFromServer} = this.state;

        const exercisesHtml = exercises.map((exercise: Exercise, index: number) => <p
            onClick={() => this.removeExercise(exercise)}>{exercise.title}</p>);

        // const titles = this.props.userData.programs
        //     .map((program: any) => <h3>{program.title}</h3>)

        return (
            <div className="mb-15rem">
                <input value={this.state.program.title} onChange={evt => this.updateProgramTitle(evt)}/>
                <br/>
                {exercisesHtml}
                <button onClick={() => this.makeProgram()}>Сделать программу</button>
                {/*{userPrograms.map((item: any, index: number) => <a href="#" key={index}>{item.title} - Посмотреть</a>)}*/}
                {/*{titles}*/}
                <ExercisesSection exercisesFromServer={exercisesFromServer}
                                  getExercise={(exercise: Exercise) => this.getExercise(exercise)}/>
            </div>
        )
    }
}