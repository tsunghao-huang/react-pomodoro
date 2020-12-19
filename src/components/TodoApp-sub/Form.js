import React, { useState, useRef, useEffect } from "react";
import usePrevious from "./utils";

function Form(props) {
    const [name, setName] = useState("");
    const [targetSessions, setTargetSessions] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const wasEditing = usePrevious(isEditing);

    const newTodoInputRef = useRef(null);
    const toggleButtonRef = useRef(null);
    const addTodoForm = useRef(null);

    function handleChange(e) {
        if (e.target.id === 'new-todo-input') {
            setName(e.target.value);
        } else if (e.target.id === 'new-todo-target-pomodoro') {
            setTargetSessions(e.target.value);
        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name.replace(/\s*/, "") === "") return;
        props.addTask(name, targetSessions);
        setName("");
        setTargetSessions("");
        const newTodoInput = document.getElementById('new-todo-input');
        newTodoInput.focus();
    }

    const form = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo-input" className="label__lg">
                {(props.lang === 'en') ? 'What needs to be done?'
                    : props.LANG_MAP['What needs to be done?']}
            </label>
            <fieldset id="new-todo-fieldset">
                <input
                    type="text"
                    id="new-todo-input"
                    className="input input__lg"
                    name="text"
                    autoComplete="off"
                    value={name}
                    onChange={handleChange}
                    required={true}
                    placeholder={`${(props.lang === 'en') ? 'Todo' : props.LANG_MAP['Todo']}`}
                    ref={newTodoInputRef}
                />
                <input
                    type="number"
                    id="new-todo-target-pomodoro"
                    className="input input__lg"
                    value={targetSessions}
                    onChange={handleChange}
                    min="0"
                    max="57"
                    placeholder={`${(props.lang === 'en') ? 'Pomodoros' : props.LANG_MAP['Pomodoros']}?`}
                />
            </fieldset>

            <div id="form-btn-group" className="todo-btn-group">
                <button type="button" className="btn" onClick={toggleForm}>
                    <i className="fas fa-times"></i>
                </button>
                <button type="submit" className="btn">
                    <i className="fas fa-plus-circle"></i>
                </button>
            </div>


        </form>
    )

    const toggleBtn = (
        <button
            onClick={toggleForm}
            id="add-todo-toggle-btn"
            className="btn"
            ref={toggleButtonRef}
        >
            <i className="fas fa-plus-circle"></i>
            {(props.lang === 'en') ? " Add a task" : props.LANG_MAP["Add a task"]}
        </button>
    )

    function toggleForm() {
        setIsEditing(!isEditing);
    }

    useEffect(() => {
        if (!wasEditing && isEditing) {
            newTodoInputRef.current.focus();
            addTodoForm.current.id = "add-todo-form-edit";
        }
        if (wasEditing && !isEditing) {
            toggleButtonRef.current.focus();
            addTodoForm.current.id = "add-todo-form";
        }

    }, [wasEditing, isEditing]);

    return (
        <div id="add-todo-form" ref={addTodoForm}>

            {isEditing ? form : toggleBtn}

        </div>
    );
}

export default Form;