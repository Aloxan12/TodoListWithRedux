import React, {useReducer, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodolistAC,
    changeTodolistFilterAC,
    removeTodoListAC,
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {AppRootState} from "./state/store";

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}
export type FilterValueType = "all" | "active" | "completed"
export type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type ToDoListType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<ToDoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)

    //BLL:
    function removeTasks(taskID: string, toDoListId: string) {
        const action = removeTaskAC(taskID, toDoListId)
        dispatch(action)
    }

    function addTask(title: string, toDoListId: string) {
        const action = addTaskAC(title, toDoListId)
        dispatch(action)
    }

    function changeTasksStatus(taskId: string, newIsDone: boolean, toDoListId: string) {
        const action = changeTaskStatusAC(taskId, newIsDone, toDoListId)
        dispatch(action)
    }

    function changeTasksTitle(taskId: string, newTitle: string, toDoListId: string) {
        const action = changeTaskTitleAC(taskId, newTitle, toDoListId)
        dispatch(action)
    }

    function changeToDoList(newFilterValue: FilterValueType, toDoListId: string) {
        const action = changeTodolistFilterAC(toDoListId, newFilterValue)
        dispatch(action)
    }

    function changeToDoListTitle(newTitle: string, toDoListId: string) {
        const action = changeTodolistAC(newTitle, toDoListId)
        dispatch(action)
    }

    function removeTodoList(toDoListId: string) {
        const action = removeTodoListAC(toDoListId)
        dispatch(action)
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title)
        dispatch(action)
    }

    const todoListComponents = todoLists.map(tl => {
        let tasksForToDoList = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false)
        }
        if (tl.filter === "completed") {
            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true)
        }
        return (
            <Grid item>
                <Paper elevation={3} style={{padding: '20px'}}>
                    <ToDoList
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForToDoList}
                        removeTasks={removeTasks}
                        addTask={addTask}
                        changeToDoList={changeToDoList}
                        changeToDoListTitle={changeToDoListTitle}
                        changeStatus={changeTasksStatus}
                        changeTitle={changeTasksTitle}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                </Paper>
            </Grid>
        )
    })
    //UI
    //Create, Read, Update, Delete
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5} style={{padding: '20px'}}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
