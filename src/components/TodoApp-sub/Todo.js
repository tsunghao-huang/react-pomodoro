import React, { useState, useRef, useEffect } from "react";
import usePrevious from "./utils";

export default function Todo(props) {

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState(props.name);
    const [newTargetSessions, setNewTargetSessions] = useState(props.targetSessions);
    const [newCompletedSessions, setNewCompletedSessions] = useState(props.completedSessions);
    const wasEditing = usePrevious(isEditing);

    function handleChange(e) {
        if (e.target.id.includes('completed-sessions')) {
            setNewCompletedSessions(e.target.value);
        } else if (e.target.id.includes('target-sessions')) {
            setNewTargetSessions(e.target.value);
        } else {
            setNewName(e.target.value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (newName.replace(/\s*/, "") === "") return;
        props.editTask(props.id, newName, newCompletedSessions, newTargetSessions);
        setEditing(false);
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
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
                    <div className='edit-todo-sessions'>
                        <label className="todo-label todo-label-sessions" htmlFor={`${props.id}-completed-sessions`}>
                            {(props.lang === 'en') ? 'Completed sessions' : props.LANG_MAP['Completed sessions']}
                        </label>
                        <input
                            id={`${props.id}-completed-sessions`}
                            className="input input__lg edit-todo-completed-sessions"
                            type="number"
                            value={newCompletedSessions}
                            onChange={handleChange}
                            min="0"
                            max={newTargetSessions}
                            placeholder="Sessions?"
                        />
                    </div>
                    <div className='edit-todo-sessions'>
                        <label className="todo-label todo-label-sessions" htmlFor={`${props.id}-target-sessions`}>
                            {(props.lang === 'en') ? 'Target sessions' : props.LANG_MAP['Target sessions']}
                        </label>
                        <input
                            id={`${props.id}-target-sessions`}
                            className="input input__lg edit-todo-target-sessions"
                            type="number"
                            value={newTargetSessions}
                            onChange={handleChange}
                            min={newCompletedSessions}
                            max="57"
                            placeholder="Sessions?"
                        />
                    </div>
                </fieldset>

            </div>
            <div className="todo-btn-group">
                <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={() => setEditing(false)}
                >
                    <i className="fa fa-times" aria-hidden="true"></i>
                    <span className="visually-hidden">
                        {(props.lang === 'en') ? 'Cancel' : props.LANG_MAP['Cancel']}
                        renaming {props.name}
                    </span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    <i className="fa fa-floppy-o" aria-hidden="true"></i>

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
                {/* <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                /> */}
                <button
                    id={props.id}
                    type="button"
                    className="btn check-btn"
                    onClick={() => props.toggleTaskCompleted(props.id)}
                >
                    <i className={`fa ${props.completed ? "fa-check-circle" : "fa-circle-o"}`} aria-hidden="true"></i>
                    <span className="visually-hidden">
                        {(props.lang === 'en') ? 'Edit' : props.LANG_MAP['Edit']}
                        {props.name}
                    </span>
                </button>
                <div className={`todo-label ${props.completed ? "todo-label-checked" : ""}`} htmlFor={props.id}>
                    <span className="todo-label-name">{props.name}</span>
                    <span className="todo-label-progress">{(props.targetSessions === 0 | props.targetSessions === "") ? '' : `${(props.lang === 'en') ? 'Progress' : props.LANG_MAP['Progress']}: ${props.completedSessions ? props.completedSessions : 0}/${props.targetSessions}`}</span>
                </div>
            </div>
            <div className="todo-btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={() => setEditing(true)}
                    ref={editButtonRef}
                >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                    <span className="visually-hidden">
                        {(props.lang === 'en') ? 'Edit' : props.LANG_MAP['Edit']}
                        {props.name}
                    </span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => props.deleteTask(props.id)}
                >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                    <span className="visually-hidden">
                        {(props.lang === 'en') ? 'Delete' : props.LANG_MAP['Delete']}
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
            setNewCompletedSessions(props.completedSessions);
            setNewTargetSessions(props.targetSessions);
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }

    }, [wasEditing, isEditing, props.name, props.completedSessions, props.targetSessions]);

    return (
        <li className="todo stack-small">
            {isEditing ? editingTemplate : viewTemplate}
        </li>
    );
}