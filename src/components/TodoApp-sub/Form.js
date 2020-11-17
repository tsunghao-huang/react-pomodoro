import React, { useState } from "react";

function Form(props) {
    const [name, setName] = useState("");

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name === "") return;
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
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                {(props.lang === 'en') ? 'Add' : props.LANG_MAP['Add']}
            </button>
        </form>
    );
}

export default Form;