import * as React from 'react';
import {Component} from "react";

export default class Exercise extends Component<any, any> {
    handleClick(e: any) {
        e.preventDefault();

        this.props.onClick(this.props.exercise)
    }

    render() {
        const {exercise} = this.props;

        return(
            <a href="#" onClick={(e: any) => this.handleClick(e)} >
                <li>
                    {exercise.title}<br/>
                    <small>
                        {exercise.content}
                    </small>
                </li>
            </a>
        )
    }
}