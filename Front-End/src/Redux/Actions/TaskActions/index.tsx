export type Priority = "high" | "medium" | "low";
export type Stage = 0 | 1 | 2 | 3;

export interface ITaskDetails {
    id?: string;
    taskName: string;
    deadline: string | null;
    priority: Priority | "";
    stage: any;
    crtdate?: string;
}

export const TASK_CREATED = "TASK_CREATED";
export const SET_TASK = "SET_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";

export const createTaskAction = (payload: ITaskDetails) => {
    return {
        type: TASK_CREATED,
        payload
    }
}

export const setTasksAction = (payload: ITaskDetails[]) => {
    return {
        type: SET_TASK,
        payload
    }
}

export const deleteTaskAction = (id: string) => {
    return {
        type: DELETE_TASK,
        payload: id
    }
}

export const updateTaskAction = (payload: ITaskDetails) => {
    return {
        type: UPDATE_TASK,
        payload
    }
}