import * as React from 'react';
import {Component} from "react";

import "./components-styles/FitnessApp.css"

import ExerciseItem from "./ExerciseItem";

import {Exercise} from '../types/index'

import axios from 'axios'

interface IExercisesSectionStates {
    exercisesFromServer: Array<Exercise>
}


export default class ExercisesSection extends Component<any, IExercisesSectionStates> { //TODO: in-es
    constructor(props: any) {
        super(props);

        this.state = {
            exercisesFromServer: []
        }

        this.loadExercisesDataFromServer = this.loadExercisesDataFromServer.bind(this)
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

    getInfo(exercise: Exercise) {
        this.props.getExercise(exercise)
    }

    componentWillMount() {
        this.loadExercisesDataFromServer()
    }

    render() {
        const exPath = window.location.pathname.substring(21)

        const {exercisesFromServer} = this.state;

        const exerciseItemTemplate = exercisesFromServer.map((exercise: any, index: number) => {
            return(
                <ExerciseItem onClick={(exercise: Exercise) => this.getInfo(exercise)} key={index} exercise={exercise} />
            )
        })
        //todo: add switch, у меня чето не полчуается
        if (exPath === 'chest') {
            return(
                <div>
                    <ul>
                        {exerciseItemTemplate}
                    </ul>
                </div>
            )
        } else {
            return(
                ''
            )
        }
        
    }
}