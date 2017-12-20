import * as React from 'react';
import {Component} from "react";

import "./components-styles/FitnessApp.css"

import ExerciseItem from "./ExerciseItem";

import {Exercise} from '../types/index'


export default class ExercisesSection extends Component<any, any> { //TODO: in-es
    getInfo(exercise: Exercise) {
        this.props.getExercise(exercise)
    }

    render() {
        const {exercisesFromServer} = this.props;

        const exerciseItemTemplate = exercisesFromServer.map((exercise: any, index: number) => {
            return(
                <ExerciseItem onClick={(exercise: Exercise) => this.getInfo(exercise)} key={index} exercise={exercise} />
            )
        })

        return(
            <div className="mt-15rem">
                <h1>Упражнения</h1>
                <ul>
                    {exerciseItemTemplate}
                </ul>
            </div>
        )
    }
}