import * as React from 'react';
import {Component} from "react";

import {withRouter} from 'react-router'

import "./components-styles/FitnessApp.css"

import ExerciseItem from "./ExerciseItem";

import {Exercise} from '../types/index'

import axios from 'axios'

interface IExercisesSectionProps {
    getExercise: Function
    href: string
}

interface IExercisesSectionStates {
    exercisesFromServer: Array<Exercise>
}


export default class ExercisesSection extends Component<IExercisesSectionProps, IExercisesSectionStates> {
    constructor(props: any) {
        super(props);

        this.state = {
            exercisesFromServer: []
        }

        this.loadExercisesDataFromServerOnClick = this.loadExercisesDataFromServerOnClick.bind(this)
    }

    loadExercisesDataFromServerOnClick(propsHref: any) {
        axios.get(`http://localhost:9000/api/exercises/${propsHref}`)
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

    componentWillReceiveProps(nextProps: any) {
        const neededHref = nextProps.href;
        this.loadExercisesDataFromServerOnClick(neededHref)
    }

    render() {
        const {exercisesFromServer} = this.state;

        const {href} = this.props;

        const exerciseItemTemplate = exercisesFromServer.map((exercise: any, index: number) => {
            return(
                <ExerciseItem onClick={(exercise: Exercise) => this.getInfo(exercise)} key={index} exercise={exercise} />
            )
        })
        //todo: add switch, у меня чето не полчуается
        if (href === 'chest' || href === 'back' || href === 'arms' || href === 'shoulders' || href === 'legs') {
            return(
                <div>
                    <hr/>
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

withRouter(ExercisesSection)