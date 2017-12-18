/** MODELS **/
export interface UserData {
    email: string
    username: string
}

export interface Exercise {
    _id: string
    title: string
    content: string
}

export class Program {
    public title: string
    public exercises: Array<Exercise>

    constructor(title: string, ex: Array<Exercise>) {
        this.title = title
        this.exercises = ex
    }

}
/** /MODELS **/

export interface IAppRouterStates {
    doRedirect: boolean
}


export interface IFitnessAppProps {
    doRedirect: boolean
}




export interface ISignUpProps {
    doRedirect: boolean
}

export interface ISignUpStates {
    newUserName: string
    newUserEmail: string
    newUserPassword: string
    doRedirect: boolean
}


export interface ISignInProps {
    doRedirect: boolean
}

export interface ISignInStates {
    newUserNameCheck: string
    newUserPasswordCheck: string
    doRedirect: boolean
}

export interface IProgramsSectionProps {
    userData: UserData
    userLoggedIn: boolean
    userPrograms: Array<Program>
}



export interface IProfile {
    doRedirect: boolean
}