import React from 'react';

export default function DefaultBtn(props) {
    return (
        <button
            className='btn toggle-btn'
            aria-pressed={props.currentCounting === props.value}
            aria-label={`set ${props.value.toLowerCase()} to default duration.`}
            id={`default-${props.value.toLowerCase()}`}
            onClick={props.handleDefaultBtn}
        >
            {(props.lang === 'en') ? props.value : props.LANG_MAP[props.value]}
        </button>
    )
}