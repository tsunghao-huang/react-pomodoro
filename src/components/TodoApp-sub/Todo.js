import React, { useState, useRef, useEffect } from "react";
import usePrevious from "./utils";

export default function Todo(props) {

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState(props.name);
    const [newTargetPomodoros, setNewTargetPomodoros] = useState(props.targetPomodoros);
    const [newCompletedPomodoros, setNewCompletedPomodoros] = useState(props.completedPomodoros);
    const wasEditing = usePrevious(isEditing);

    function handleChange(e) {
        e.stopPropagation();
        if (e.target.id.includes('completed-pomodoros')) {
            setNewCompletedPomodoros(e.target.value);
        } else if (e.target.id.includes('target-pomodoros')) {
            setNewTargetPomodoros(e.target.value);
        } else {
            setNewName(e.target.value);
        }
    }

    function handleSubmit(e) {
        e.stopPropagation();
        e.preventDefault();
        if (newName.replace(/\s*/, "") === "") return;
        props.editTask(props.id, newName, newCompletedPomodoros, newTargetPomodoros);
        setEditing(false);
    }

    function setEditingAndPreventBubbling(e, b) {
        e.stopPropagation();
        setEditing(b);
    }

    const editingTemplate = (
        <form className="stack-small">
            <div className="form-group">
                <fieldset className="todo-fieldset">
                    <label className="todo-label" htmlFor={props.id}>
                        {(props.lang === 'en') ? `New name for ${props.name}` : `${props.name} 的新名字`}
                    </label>
                    <input
                        id={props.id}
                        className="input input__lg edit-todo-name"
                        type="text"
                        value={newName}
                        onChange={handleChange}
                        ref={editFieldRef}
                        required={true}
                    />
                    <div className='edit-todo-pomodoros'>
                        <label className="todo-label todo-label-pomodoros" htmlFor={`${props.id}-completed-pomodoros`}>
                            {(props.lang === 'en') ? 'Completed Pomodoros' : props.LANG_MAP['Completed Pomodoros']}
                        </label>
                        <input
                            id={`${props.id}-completed-pomodoros`}
                            className="input input__lg edit-todo-completed-pomodoros"
                            type="number"
                            value={newCompletedPomodoros}
                            onChange={handleChange}
                            min="0"
                            max={newTargetPomodoros}
                            placeholder="Pomodoros?"
                        />
                    </div>
                    <div className='edit-todo-pomodoros'>
                        <label className="todo-label todo-label-pomodoros" htmlFor={`${props.id}-target-pomodoros`}>
                            {(props.lang === 'en') ? 'Target Pomodoros' : props.LANG_MAP['Target Pomodoros']}
                        </label>
                        <input
                            id={`${props.id}-target-pomodoros`}
                            className="input input__lg edit-todo-target-pomodoros"
                            type="number"
                            value={newTargetPomodoros}
                            onChange={handleChange}
                            min={newCompletedPomodoros}
                            max="57"
                            placeholder="Pomodoros?"
                        />
                    </div>
                </fieldset>

            </div>
            <div className="todo-btn-group">
                <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={(e) => setEditingAndPreventBubbling(e, false)}
                >
                    <i className="fas fa-times" aria-hidden="true"></i>
                    <span className="visually-hidden">
                        {(props.lang === 'en') ? 'Cancel' : props.LANG_MAP['Cancel']}
                        renaming {props.name}
                    </span>
                </button>
                <button
                    type="submit"
                    className="btn btn__primary todo-edit"
                    onClick={(e) => handleSubmit(e)}
                >
                    <i className="far fa-save" aria-hidden="true"></i>

                    <span className="visually-hidden">
                        {(props.lang === 'en') ? 'Save' : props.LANG_MAP['Save']}
                        new name for {props.name}
                    </span>
                </button>
            </div>
        </form>
    );
    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <button
                    type="button"
                    className="btn check-btn"
                    onClick={(e) => props.toggleTaskCompleted(e, props.id)}
                >
                    <i className={`${props.completed ? "fas fa-check-circle" : "far fa-circle"}`} aria-hidden="true"></i>
                    <span className="visually-hidden">
                        {(props.lang === 'en') ? 'Edit' : props.LANG_MAP['Edit']}
                        {props.name}
                    </span>
                </button>
                <div className={`todo-label ${props.completed ? "todo-label-checked" : ""}`} htmlFor={props.id}>
                    <span className="todo-label-name">{props.name}</span>
                    <span className="todo-label-progress">{(props.targetPomodoros === 0 | props.targetPomodoros === "") ? '' : `${(props.lang === 'en') ? 'Progress' : props.LANG_MAP['Progress']}: ${props.completedPomodoros ? props.completedPomodoros : 0}/${props.targetPomodoros}`}</span>
                </div>
            </div>
            <div className="todo-btn-group">
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={(e) => props.deleteTask(e, props.id)}
                >
                    <i className="fas fa-trash-alt" aria-hidden="true"></i>
                    <span className="visually-hidden">
                        {(props.lang === 'en') ? 'Delete' : props.LANG_MAP['Delete']}
                        {props.name}
                    </span>
                </button>
                <button
                    type="button"
                    className="btn"
                    onClick={(e) => setEditingAndPreventBubbling(e, true)}
                    ref={editButtonRef}
                >
                    <i className="fas fa-pencil-alt" aria-hidden="true"></i>
                    <span className="visually-hidden">
                        {(props.lang === 'en') ? 'Edit' : props.LANG_MAP['Edit']}
                        {props.name}
                    </span>
                </button>
            </div>
        </div>
    );

    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.select();
            editFieldRef.current.focus();
            // initiated value for the input field
            setNewName(props.name);
            setNewCompletedPomodoros(props.completedPomodoros);
            setNewTargetPomodoros(props.targetPomodoros);
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }

    }, [wasEditing, isEditing, props.name, props.completedPomodoros, props.targetPomodoros]);

    return (
        <li
            id={`li-${props.id}`}
            className={`todo stack-small ${props.current ? "todo-selected" : ""}`}
            onClick={() => props.updateCurrentTask(props.id)}
        >
            {isEditing ? editingTemplate : viewTemplate}
        </li>
    );
}