import React, { useState } from 'react';
import ControlPanel from './Pomodoro-sub/ControlPanel';
import DisplayPanel from './Pomodoro-sub/DisplayPanel';

function Pomodoro(props) {

    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timeLeft, setTimeLeft] = useState(1500);
    const [isCounting, setIsCounting] = useState(false);
    const [currentCounting, setCurrentCounting] = useState('Session');

    let intervalID;

    function handleReset() {

        setBreakLength(5);
        setSessionLength(25);
        setTimeLeft(1500);
        setIsCounting(false);
        setCurrentCounting('Session');

        // reset should stop the timer as well
        clearInterval(intervalID);

        // and the audio
        const audio = document.getElementById('beep');
        audio.pause();
        audio.currentTime = 0;

        // and set the color back to default, if it is changed
        document.getElementById('time-left').style.color = null;

        // and the title
        document.getElementsByTagName('title')[0].text = 'Pomodoro Clock';
    }

    function handleDefaultBtn(e) {
        // ignore click, while the clock is counting
        if (isCounting) return;
        // console.log(e.target.id);
        if (e.target.id.includes('session')) {
            setSessionLength(25);
            setTimeLeft(1500);
            setIsCounting(false);
            setCurrentCounting('Session');
        } else {
            setBreakLength(5);
            setTimeLeft(1500);
            setIsCounting(false);
            setCurrentCounting('Session');
        }
    }

    function handleInDecrement(e) {
        // in case the clock is still running, disable handleInDecrement()
        if (isCounting) return;
        switch (`${e.currentTarget.id},current:${currentCounting}`) {
            case 'break-decrement,current:Session':
                if (breakLength > 1) {
                    setBreakLength(breakLength - 1);
                    return;
                } else {
                    return;
                }
            case 'break-increment,current:Session':
                if (breakLength < 60) {
                    setBreakLength(breakLength + 1);
                    return;
                } else {
                    return;
                }
            case 'break-decrement,current:Break':
                if (breakLength > 1) {
                    setBreakLength(breakLength - 1);
                    setTimeLeft(timeLeft - 60);
                    return;
                } else {
                    return;
                }
            case 'break-increment,current:Break':
                if (breakLength < 60) {
                    setBreakLength(breakLength + 1);
                    setTimeLeft(timeLeft + 60);
                    return;
                } else {
                    return;
                }
            case 'session-decrement,current:Session':
                if (sessionLength > 1) {
                    setSessionLength(sessionLength - 1);
                    setTimeLeft(timeLeft - 60);
                    return;
                } else {
                    return;
                }
            case 'session-increment,current:Session':
                if (sessionLength < 60) {
                    setSessionLength(sessionLength + 1);
                    setTimeLeft(timeLeft + 60);
                    return;
                } else {
                    return;
                }
            case 'session-decrement,current:Break':
                if (sessionLength > 1) {
                    setSessionLength(sessionLength - 1);
                    return;
                } else {
                    return;
                }
            case 'session-increment,current:Break':
                if (sessionLength < 60) {
                    setSessionLength(sessionLength + 1);
                    return;
                } else {
                    return;
                }
            default:
                return;

        }

    }

    function tick() {

        // change color when time left <= 60
        if (timeLeft <= 60) {
            document.getElementById('time-left').style.color = "#F8BFCE";
        } else {
            document.getElementById('time-left').style.color = null;
        }
        if (timeLeft <= 0) {

            clearInterval(intervalID);
            const audio = document.getElementById('beep');
            audio.play();
            const newCurrentCounting = (currentCounting === 'Session') ? 'Break' : 'Session';
            const newTimeLeft = (currentCounting === 'Session') ? breakLength * 60 : sessionLength * 60;

            document.getElementById('time-left').style.color = null;

            setTimeLeft(newTimeLeft);
            setCurrentCounting(newCurrentCounting);
            intervalID = setInterval(() => { tick() }, 1000);
            return;
        };


        setTimeLeft(timeLeft - 1);

        document.getElementsByTagName('title')[0].text = `(${clockify(timeLeft)}) Pomodoro Clock`;

    }

    function handleStartToggle() {
        if (!isCounting) {
            intervalID = setInterval(() => { tick() }, 1000);
        } else {
            clearInterval(intervalID);
        }

        setIsCounting(!isCounting);

    }

    function clockify(timeInSecs) {
        let minutes = Math.floor(timeInSecs / 60);
        let seconds = timeInSecs - 60 * minutes;
        // insure mm:ss format at any time
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        minutes = (minutes < 10) ? '0' + minutes : minutes;

        return minutes + ':' + seconds
    }

    const controlPanelList = ['Break', 'Session'].map((v) => (
        <ControlPanel
            value={v}
            key={`${v}-panel`}
            currentCounting={currentCounting}
            length={(v === 'Break') ? breakLength : sessionLength}
            handleInDecrement={handleInDecrement}
            handleDefaultBtn={handleDefaultBtn}
            // english={english}
            LANG_MAP={props.LANG_MAP}
            lang={props.lang}
        />
    ));


    return (
        <div id='pomodoro-panel'>
            <h1>{(props.lang === 'en') ? 'Pomodoro Clock' : props.LANG_MAP['Pomodoro Clock']}</h1>
            <DisplayPanel
                timeLeft={clockify(timeLeft)}
                handleReset={handleReset}
                handleStartToggle={handleStartToggle}
                currentCounting={currentCounting}
                LANG_MAP={props.LANG_MAP}
                lang={props.lang}
            />
            <div id='control-panels-group' className='btn-group'>
                {controlPanelList}
            </div>
            <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/tsunghao-huang/react-pomodoro/gh-pages/homeland.mp3"></audio>
        </div>

    )
}

export default Pomodoro;