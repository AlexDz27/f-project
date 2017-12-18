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















