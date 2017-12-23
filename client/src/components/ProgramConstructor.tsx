import * as React from 'react';
import {Component} from "react";

import {withRouter} from 'react-router'

import "./components-styles/FitnessApp.css"
import ExercisesSection from "./ExercisesSection";

import {Exercise, Program, UserData} from '../types/index'

import axios from 'axios'
import {getUserToken} from "../AppRouter";
import {Redirect} from "react-router";
import {NavLink, BrowserRouter as Router} from "react-router-dom";

export interface IProgramConstructorStates {
    program: Program
    redirectAfterMakeProgram: boolean
}

export interface IProgramConstructorProps {
    userData?: UserData | any
    exercisesFromServer: Array<Exercise>
    onAddProgram: Function
    isLoggedIn: boolean
}

// const routes = [
//     {
//         path: '/program_constructor',
//         exact: true,
//         nav: () => <p>Выберите группу мышц</p>
//     },
//     {
//         path: '/program_constructor/chest',
//         // nav: () => <ExercisesSection getExercise={(exercise: Exercise) => this.getExercise(exercise)}/>
//         nav: () => <ExercisesSection />
//
//     },
//     {
//         path: '/program_constructor/back',
//         nav: () => <p>Спина</p>
//     },
//     {
//         path: '/program_constructor/arms',
//         nav: () => <p>Руки</p>
//     },
//     {
//         path: '/program_constructor/shoulders',
//         nav: () => <p>Плечи</p>
//     },
//     {
//         path: '/program_constructor/legs',
//         nav: () => <p>Ноги</p>
//     }
// ]
export default class ProgramConstructor extends Component<any, IProgramConstructorStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            program: {
                title: '',
                exercises: []
            },
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

    logCurrLoc() {
        const currLoc = this.props.location;
        console.log(currLoc);
    }

    componentDidMount() {
        this.onRouteChanged()
    }

    onRouteChanged() {
        setInterval(console.log(this.props.location), 3000)
    }

    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to="/" />
        }

        if (this.state.redirectAfterMakeProgram) {
            return <Redirect to="/" />
        }

        const {program: {exercises}} = this.state;


        const exercisesHtml = exercises.map((exercise: Exercise, index: number) => <div key={index}><p style={{display: "inline-block"}} >{exercise.title}</p>&nbsp;&nbsp;<span onClick={() => this.removeExercise(index)} style={{color: "red", fontWeight: "bold", display: "inline-block", cursor: "pointer"}}>X</span></div>);

        return (
            <div style={{display: "flex", width: "70%", margin: "0 auto", justifyContent: "space-around"}}>
                <div>
                    <input style={{width: "400px"}} value={this.state.program.title} placeholder="Введите имя программы" onChange={evt => this.updateProgramTitle(evt)}/>
                    <br/>
                    {exercisesHtml}
                    <button onClick={() => this.makeProgram()}>Сделать программу</button><br/>
                    <NavLink to="/">Назад на главную</NavLink>
                </div>
                <div>
                    {/*<ExercisesSection exercisesFromServer={exercisesFromServer}*/}
                                      {/*getExercise={(exercise: Exercise) => this.getExercise(exercise)}/>*/}
                    <Nav getCurrLoc={() => this.logCurrLoc()} getExercise={(exercise: Exercise) => this.getExercise(exercise)} />
                </div>
            </div>
        )
    }
}

withRouter(ProgramConstructor)

interface INavProps {
    getExercise: Function
    getCurrLoc: Function
}

class Nav extends Component<INavProps , {}> {
    getExercise(exercise: Exercise) {
        this.props.getExercise(exercise)
    }

    getCurrLoc() {
        this.props.getCurrLoc()
    }

    render() {
        // const routesHtml = routes.map((route: any, index: number) => {
        //     return <Route key={index} path={route.path} exact={route.exact} render={route.nav} />
        // })
        const groupToDownload = window.location.pathname.substring(21)
        console.log(groupToDownload);

        return(
            <Router>
                <div>
                    <ul style={{listStyleType: 'none', padding: 0}}>
                        <h1>Упражнения</h1>
                        <h6>Выберите группу мышц</h6>
                        <li><NavLink activeStyle={{color: "green", fontWeight: "bold"}} onClick={() => this.getCurrLoc()} to="/program_constructor/chest">Грудь</NavLink></li>
                        <li><NavLink activeStyle={{color: "green", fontWeight: "bold"}} to="/program_constructor/back">Спина</NavLink></li>
                        <li><NavLink activeStyle={{color: "green", fontWeight: "bold"}} to="/program_constructor/arms">Руки</NavLink></li>
                        <li><NavLink activeStyle={{color: "green", fontWeight: "bold"}} to="/program_constructor/shoulders">Плечи</NavLink></li>
                        <li><NavLink activeStyle={{color: "green", fontWeight: "bold"}} to="/program_constructor/legs">Ноги</NavLink></li>
                        {/*<li><NavLink to="/program_constructor/">Назад к выбору группы мышц</NavLink></li>*/}
                        {/*{routesHtml}*/}
                        <ExercisesSection getExercise={(exercise: Exercise) => this.getExercise(exercise)} />
                    </ul>
                </div>
            </Router>
        )
    }
}

// class ChestExercises extends Component<any, any> {
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             exercisesFromServerChest: []
//         }
//
//         this.loadExercisesDataFromServer = this.loadExercisesDataFromServer.bind(this);
//     }
//
//     loadExercisesDataFromServer() {
//         axios.get("http://localhost:9000/api/exercises")
//             .then((res: any) => {
//                 this.setState({
//                     exercisesFromServerChest: res.data
//                 })
//             })
//             .catch((err: any) => console.log(err))
//     }
//
//     componentWillMount() {
//         this.loadExercisesDataFromServer()
//     }
//
//     render() {
//         return(
//             <p>Chest</p>
//         )
//     }
// }