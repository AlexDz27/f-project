import * as React from 'react';
import {Component} from "react";

import "./components-styles/FitnessApp.css"

import axios from 'axios'
import ExerciseItem from "./ExerciseItem";

import {Exercise} from '../types/index'


export default class ExercisesSection extends Component<any, any> { //TODO: in-es
    constructor(props: any) {
        super(props);

        //todo: might ne alterd to anonther porperty in future
        this.state = {
            exercisesFromServer: []
        }

        this.loadExercisesDataFromServer = this.loadExercisesDataFromServer.bind(this);
    }

    getInfo(exercise: Exercise) {
        // console.log(exercise);
        this.props.getExercise(exercise)
        // this.setState({
        //     userExercisesTst: [...this.state.userExercisesTst, exercise]
        // })
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
        const {exercisesFromServer} = this.state;

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