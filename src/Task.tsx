import React, {ChangeEvent} from 'react';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked)

    }
    const onTitleChangeHandler = (newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle)
    }
    const onClickHandler = () => {
        props.removeTask(props.task.id)

    }
    return (
        <div className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={props.task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />
            <EditableSpan title={props.task.title} changeTitle={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})