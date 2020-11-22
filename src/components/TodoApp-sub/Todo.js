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
                <fieldset id="todo-fieldset">
                    <label className="todo-label" htmlFor={props.id}>
                        {(props.lang === 'en') ? `New name for ${props.name}` : `${props.name} 的新名字`}
                    </label>
                    <input
                        id={props.id}
                        className="input input__lg"
                        type="text"
                        value={newName}
                        onChange={handleChange}
                        ref={editFieldRef}
                        required={true}
                    />
                    <label className="todo-label" htmlFor={`${props.id}-completed-sessions`}>
                        Completed sessions
                    </label>
                    <input
                        id={`${props.id}-completed-sessions`}
                        className="input input__lg"
                        type="number"
                        value={newCompletedSessions}
                        onChange={handleChange}
                        min="0"
                        placeholder="Sessions?"
                    />
                    <label className="todo-label" htmlFor={`${props.id}-target-sessions`}>
                        Target sessions
                    </label>
                    <input
                        id={`${props.id}-target-sessions`}
                        className="input input__lg"
                        type="number"
                        value={newTargetSessions}
                        onChange={handleChange}
                        min="0"
                        placeholder="Sessions?"
                    />

                </fieldset>

            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={() => setEditing(false)}
                >
                    {(props.lang === 'en') ? 'Cancel' : props.LANG_MAP['Cancel']}
                    <span className="visually-hidden">renaming {props.name}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    {(props.lang === 'en') ? 'Save' : props.LANG_MAP['Save']}
                    <span className="visually-hidden">new name for {props.name}</span>
                </button>
            </div>
        </form>
    );
    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}: {(props.targetSessions) ? `${props.completedSessions ? props.completedSessions : 0}/${props.targetSessions}` : ''}
                </label>
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={() => setEditing(true)}
                    ref={editButtonRef}
                >
                    {(props.lang === 'en') ? 'Edit' : props.LANG_MAP['Edit']}
                    <span className="visually-hidden">{props.name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => props.deleteTask(props.id)}
                >
                    {(props.lang === 'en') ? 'Delete' : props.LANG_MAP['Delete']}
                    <span className="visually-hidden">{props.name}</span>
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
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }

    }, [wasEditing, isEditing, props.name]);

    return (
        <li className="todo stack-small">
            {isEditing ? editingTemplate : viewTemplate}
        </li>
    );
}