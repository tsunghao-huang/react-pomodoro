import React from "react";

function FilterButton(props) {
    return (
        <button
            type="button"
            className="btn toggle-btn"
            aria-pressed={props.isPressed}
            onClick={() => props.setFilter(props.name)}
        >
            <span className="visually-hidden">Show </span>
            <span>{(props.lang === 'en') ? props.name : props.LANG_MAP[props.name]} </span>
            <span className="visually-hidden"> tasks</span>
        </button>
    );
}

export default FilterButton;