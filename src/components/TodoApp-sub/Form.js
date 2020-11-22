import React, { useState } from "react";

function Form(props) {
    const [name, setName] = useState("");
    const [targetSessions, setTargetSessions] = useState("");

    function handleChange(e) {
        if (e.target.id === 'new-todo-input') {
            setName(e.target.value);
        } else if (e.target.id === 'new-todo-target-session') {
            setTargetSessions(e.target.value);
        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name.replace(/\s*/, "") === "") return;
        props.addTask(name);
        setName("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    {(props.lang === 'en') ? 'What needs to be done?'
                        : props.LANG_MAP['What needs to be done?']}
                </label>
            </h2>
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
                />
                <input
                    type="number"
                    id="new-todo-target-session"
                    className="input input__lg"
                    value={targetSessions}
                    onChange={handleChange}
                    min="0"
                    placeholder="Sessions?"
                />
            </fieldset>

            <button type="submit" className="btn btn__primary btn__lg">
                {(props.lang === 'en') ? 'Add' : props.LANG_MAP['Add']}
            </button>
        </form>
    );
}

export default Form;