import * as React from 'react';
import {Component} from "react";

import "./components-styles/FitnessApp.css"
import ExercisesSection from "./ExercisesSection";

import {Exercise, Program, UserData} from '../types/index'

//TODO: deal with the same names for states in FitnessApp and ProgramsSection

export interface IProgramsSectionStates {
    userExercises: Array<Exercise>
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
            userExercises: [],
            userPrograms: []
        }
    }

    getExercise(exercise: Exercise) {
        console.log(exercise);
        this.setState({
            userExercises: [...this.state.userExercises, exercise]
        })
    }

    makeProgram() {
        const newProgram: Program = new Program('Chest day', this.state.userExercises)

        this.setState({
            userPrograms: [...this.state.userPrograms, newProgram]
        })
    }

    render() {
        let userExercises
        if (!this.state.userExercises) {
            return
        } else {
            userExercises = this.state.userExercises.map((item: Exercise, index: number) => <p key={index}>{item.title}</p>);
        }

        return(
            <div className="mb-15rem">
                <h1>Мои программы</h1>
                <h3>День груди</h3>
                {userExercises}
                <button onClick={() => this.makeProgram()}>Сделать программу</button>
                <ExercisesSection getExercise={(exercise: Exercise) => this.getExercise(exercise)} />
            </div>
        )
    }
}