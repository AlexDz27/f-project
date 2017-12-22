/** MODELS **/
export interface UserData {
    _id: string
    email: string
    username: string
    programs: Array<Program>
}

export interface Exercise {
    _id: string
    title: string
    content: string
    index: number
}

export class Program {
    public id?: string
    public title: string
    public exercises: Array<Exercise>

    constructor(title: string, ex: Array<Exercise>) {
        this.title = title
        this.exercises = ex
    }

}
/** /MODELS **/















