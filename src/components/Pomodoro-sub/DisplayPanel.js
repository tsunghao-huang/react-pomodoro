import React, { useEffect } from 'react';

export default function DisplayPanel(props) {
    const englishHeading = (
        <div id='pomodoro-heading'>
            <p>Time to {props.currentCounting} {(props.currentTask) ? `${props.currentCounting === 'Work' ? 'on' : 'from'} ${props.currentTask.name}` : ""}</p>
            {props.currentTask ?
                <p>{(props.currentTask.targetPomodoros) ? `Progress: ${props.currentTask.completedPomodoros}/${props.currentTask.targetPomodoros}` : ""}</p>
                : ""
            }

        </div>
    )

    const mandarinHeading = (
        <div id='pomodoro-heading'>
            <p>{(props.currentTask) ? `${props.currentTask.name} 的` : ""}{props.LANG_MAP[props.currentCounting].replace(' ', '')}時間</p>
            {props.currentTask ?
                <p>{(props.currentTask.targetPomodoros) ? `${props.LANG_MAP['Progress']}: ${props.currentTask.completedPomodoros}/${props.currentTask.targetPomodoros}` : ""}</p>
                : ""
            }
        </div>
    )

    function handleProgressBar(currentCounting, workLength, breakLength, timeLeft) {
        const progressBar = document.querySelector('.progress__filled');
        const duration = (currentCounting === "Work") ? workLength * 60 : breakLength * 60;
        const percent = (timeLeft / duration) * 100;
        progressBar.style.flexBasis = `${percent}%`;
    }

    useEffect(() => {
        handleProgressBar(props.currentCounting, props.workLength, props.breakLength, props.timeLeft);
    }, [props.currentCounting, props.workLength, props.breakLength, props.timeLeft])

    return (
        <div id='display-panel' aria-label="display panel">
            {/* <p id='timer-label' aria-label={`Currently counting for ${props.currentCounting}`}>{(props.lang === 'en') ? props.currentCounting : props.LANG_MAP[props.currentCounting]}</p> */}
            {(props.lang === 'en') ? englishHeading : mandarinHeading}
            <div className="progress">
                <div className="progress__filled"></div>
            </div>
            <p id='time-left' role='timer' aria-label={`Duration for ${props.currentCounting}`}>{props.clockify(props.timeLeft)}</p>

            <div id='display-btn-group'>
                <button
                    aria-label={`start ${props.currentCounting}`} id="start_stop" onClick={props.handleStartToggle} className='btn-level'>
                    <i className={`fas ${props.counting ? "fa-pause" : "fa-play"} fa-3x`}></i>
                </button>
                <button aria-label={`reset to work, 25 minutes.`} id="reset" onClick={props.handleReset} className='btn-level'>
                    <i className="fas fa-redo fa-3x"></i>
                </button>
            </div>

        </div>
    )
}