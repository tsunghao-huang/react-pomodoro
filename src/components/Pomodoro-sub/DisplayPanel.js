import React from 'react';

export default function DisplayPanel(props) {
    return (
        <div id='display-panel' aria-label="display panel">
            <p id='timer-label' aria-label={`Currently counting for ${props.currentCounting}`}>{(props.english) ? props.currentCounting : props.mandarinLabel[props.currentCounting]}</p>
            <p id='time-left' role='timer' aria-label={`Duration for ${props.currentCounting}`}>{props.timeLeft}</p>

            <div>
                <button
                    aria-label={`start ${props.currentCounting}`} id="start_stop" onClick={props.handleStartToggle} className='btn-level'>
                    <i className="fa fa-play fa-3x"></i>
                    <i className="fa fa-pause fa-3x"></i>
                </button>
                <button aria-label={`reset to session, 25 minutes.`} id="reset" onClick={props.handleReset} className='btn-level'>
                    <i className="fa fa-refresh fa-3x"></i>
                </button>
            </div>

        </div>
    )
}