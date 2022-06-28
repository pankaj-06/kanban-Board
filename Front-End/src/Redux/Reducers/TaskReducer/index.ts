import { DELETE_TASK, ITaskDetails, SET_TASK, TASK_CREATED, UPDATE_TASK } from "../../Actions/TaskActions";

interface ITaskState {
    tasks: ITaskDetails[];
}

export const initialTaskState: ITaskState = {
    tasks: []
}

export const taskReducer = (state: ITaskState = initialTaskState, action: any) => {
    switch (action.type) {
        case SET_TASK:
            return { ...state, tasks: action.payload };
        case TASK_CREATED:
            return { ...state, tasks: [...state.tasks, action.payload] };
        case DELETE_TASK:
            return { ...state, tasks: state.tasks.filter((val) => val.id !== action.payload) };
        case UPDATE_TASK:
            const clonedTaskArray = [...state.tasks];
            const fromIndex = clonedTaskArray.findIndex((task) => task.id === action.payload.id);
            clonedTaskArray.splice(fromIndex, 1)
            clonedTaskArray.splice(fromIndex, 0, action.payload);
            return { ...state, tasks: [...clonedTaskArray] };
        default:
            return state;
    }
}