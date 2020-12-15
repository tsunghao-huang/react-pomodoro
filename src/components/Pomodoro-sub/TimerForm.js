import React, { useRef, useState, useEffect } from 'react';
import usePrevious from "../TodoApp-sub/utils";

export default function TimerForm(props) {

    const [isEditing, setIsEditing] = useState(false);
    const [newBreakLength, setNewBreakLength] = useState(parseInt(props.breakLength));
    const [newWorkLength, setNewWorkLength] = useState(parseInt(props.workLength));

    useEffect(() => {
        setNewWorkLength(props.workLength);
        setNewBreakLength(props.breakLength);
    }, [props.breakLength, props.workLength])

    // Get the modal
    const modal = useRef(null);
    const editBreakLegnthRef = useRef(null);
    const setTimerBtnRef = useRef(null);
    const wasEditing = usePrevious(isEditing);

    useEffect(() => {
        if (!wasEditing && isEditing) {
            editBreakLegnthRef.current.focus();
            setNewWorkLength(props.workLength);
            setNewBreakLength(props.breakLength);
        } else if (wasEditing && !isEditing) {
            setTimerBtnRef.current.focus();
        }
    }, [isEditing, wasEditing, props.workLength, props.breakLength])

    function openModal() {
        // When the user clicks on the button, open the modal
        if (props.counting) return;
        setIsEditing(!isEditing);
        modal.current.style.display = "block";
    }

    function closeModal() {
        // When the user clicks on <span> (x), close the modal
        setIsEditing(!isEditing);
        modal.current.style.display = "none";
    }

    function handleChange(e) {
        if (e.target.id === 'new-break-length') {
            setNewBreakLength(e.target.value);
        } else if (e.target.id === 'new-work-length') {
            setNewWorkLength(e.target.value);
        }

    }

    function handleSubmit(e) {
        const max = 60;
        const min = 1;
        e.preventDefault();

        if (newBreakLength < min | newBreakLength > max | newWorkLength < min | newWorkLength > max) {
            return;
        } else {
            props.handleTimerFormSubmit(newBreakLength, newWorkLength);
            closeModal();
        }

    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target === modal.current) {
            modal.current.style.display = "none";
        }
    }

    return (
        <div className="default-form-modal">
            <button
                id="set-timer-btn"
                className="btn"
                onClick={openModal}
                ref={setTimerBtnRef}
            >
                <i className="fas fa-cog"></i>
            </button>
            <div id="myModal" className="modal" ref={modal}>
                <div className="modal-content">
                    <form id="timer-form">
                        <h2>Timer Setting (minutes)</h2>
                        <fieldset>
                            <label htmlFor="new-break-length">Break</label>
                            <input
                                id="new-break-length"
                                type="number"
                                min="1"
                                max="60"
                                value={newBreakLength}
                                onChange={handleChange}
                                ref={editBreakLegnthRef}
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="new-work-length">Work</label>
                            <input
                                id="new-work-length"
                                type="number"
                                min="1"
                                max="60"
                                value={newWorkLength}
                                onChange={handleChange}
                            />
                        </fieldset>

                        <div id="timer-form-btn-group">
                            <button
                                id="timer-form-cancel"
                                type="button"
                                className="btn timer-form-btns"
                                onClick={closeModal}
                            >
                                <i className="fas fa-times" aria-hidden="true"></i>
                                {/* <span className="visually-hidden">
                        {(props.lang === 'en') ? 'Cancel' : props.LANG_MAP['Cancel']}
                        renaming {props.name}
                    </span> */}
                            </button>
                            <button
                                id="timer-form-save"
                                type="submit"
                                className="btn timer-form-btns"
                                onClick={(e) => handleSubmit(e)}
                            >
                                <i className="far fa-save" aria-hidden="true"></i>

                                {/* <span className="visually-hidden">
                        {(props.lang === 'en') ? 'Save' : props.LANG_MAP['Save']}
                        new name for {props.name}
                    </span> */}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}