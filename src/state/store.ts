import {combineReducers, createStore} from 'redux';
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todolist-reducer";


const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

//@ts-ignore
window.store = store