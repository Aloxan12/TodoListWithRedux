import React, {ChangeEvent, useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from "./Task";
import {FilterValueType} from "./AppWithRedux";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValueType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) =>{

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.id, props.addTask])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.id]);

    let allTodolistTasks = props.tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
    }

    const onClickHandler = useCallback((taskId: string) => {
        props.removeTask(taskId, props.id)
    },[props.removeTask, props.id])
    const onChangeHandler = useCallback((taskId: string, isDone: boolean) => {
        props.changeTaskStatus(taskId, isDone, props.id);
    },[props.id, props.changeTaskStatus])
    const onTitleChangeHandler = useCallback((taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId, newValue, props.id);
    },[props.id, props.changeTaskTitle])

    return <div>
        <h3> <EditableSpan title={props.title} changeTitle={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    return <Task
                        key={t.id}
                        task={t}
                        removeTask={onClickHandler}
                        changeTaskStatus={onChangeHandler}
                        changeTaskTitle={onTitleChangeHandler}

                    />
                })
            }
        </div>
        <div style={{ paddingTop: "10px"}}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


