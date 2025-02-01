export interface IToDo {
    _id: string;
    created_at: Date;
    user_id: string;
    text: string;
    completed: number;
}

export interface IToDoItem {
    id: string;
    text: string;
    completed: number;
}

export enum TodoStatus {
    NOT_DONE = 0,
    COMPLETED = 1,
    DELETED = 2
}  

export type ToDoItemWithId = Omit<IToDoItem, 'id'> & { id: string };