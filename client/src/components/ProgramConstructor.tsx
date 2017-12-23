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
    redirectAfterMakeProgram: boolean
    href: string
}

export interface IProgramConstructorProps {
    userData?: UserData | any
    exercisesFromServer: Array<Exercise>
    onAddProgram: Function
    isLoggedIn: boolean
}

export default class ProgramConstructor extends Component<IProgramConstructorProps, IProgramConstructorStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            program: {
                title: '',
                exercises: []
            },
            href: '',
            redirectAfterMakeProgram: false
        }
    }

    getExercise(exercise: Exercise) {
        const {program} = this.state;
        program.exercises.push(exercise);
        this.setState({program});
    }

    removeExercise(index: number) {
        const {program} = this.state;
        const exercsisesArr = this.state.program.exercises;
        exercsisesArr.splice(index, 1)
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
            .then((res: any) => this.props.onAddProgram(res.data)) //todo: any int of UesrDAta
            .then(() => alert(`Ваша программа ${this.state.program.title} успешно добавлена!`)) //todo:mod int alert
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

    getHref(e: any) {
        e.preventDefault()
        this.setState({
            href: e.target.getAttribute("data-href")
        })
    }

    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to="/" />
        }

        if (this.state.redirectAfterMakeProgram) {
            return <Redirect to="/" />
        }

        const {program: {exercises}, href} = this.state;


        const exercisesHtml = exercises.map((exercise: Exercise, index: number) => <div key={index}><p style={{display: "inline-block"}} >{exercise.title}</p>&nbsp;&nbsp;<span onClick={() => this.removeExercise(index)} style={{color: "red", fontWeight: "bold", display: "inline-block", cursor: "pointer"}}>X</span></div>);

        return (
            <div style={{display: "flex", width: "70%", margin: "0 auto", justifyContent: "space-around"}}>
                <div>
                    <input style={{width: "400px"}} value={this.state.program.title} placeholder="Введите имя программы" onChange={evt => this.updateProgramTitle(evt)}/>
                    <br/>
                    {exercisesHtml}
                    <button onClick={() => this.makeProgram()}>Сделать программу</button><br/>
                    <Link to="/">Назад на главную</Link>
                </div>
                <div>
                    <div>
                        <ul className="pc-ul" style={{listStyleType: 'none', padding: 0}}>
                            <h1>Упражнения</h1>
                            <h6>Выберите группу мышц</h6>
                            <li><a onClick={(e: any) => this.getHref(e)} href="#" data-href="chest">Грудь</a></li>
                            <li><a onClick={(e: any) => this.getHref(e)} href="#" data-href="back">Спина</a></li>
                            <li><a onClick={(e: any) => this.getHref(e)} href="#" data-href="arms">Руки</a></li>
                            <li><a onClick={(e: any) => this.getHref(e)} href="#" data-href="shoulders">Плечи</a></li>
                            <li><a onClick={(e: any) => this.getHref(e)} href="#" data-href="legs">Ноги</a></li>
                            {/*<li><NavLink to="/program_constructor/">Назад к выбору группы мышц</NavLink></li>*/}
                            {/*{routesHtml}*/}
                            <ExercisesSection href={href} getExercise={(exercise: Exercise) => this.getExercise(exercise)} />
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}