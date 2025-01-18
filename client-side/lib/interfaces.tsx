interface TodoInterface{
    title: string;
    description: string;
    _id : string;
    completed: boolean 
}

interface TodoArray{
    todos: TodoInterface[];
}

export type {TodoInterface, TodoArray};