import React from 'react';
import ControlPanel from './Promodoro-sub/ControlPanel';
import DisplayPanel from './Promodoro-sub/DisplayPanel';

class Promodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            timeLeft: 1500,
            counting: false,
            currentCounting: 'Session',
            english: true
        };
        this.handleReset = this.handleReset.bind(this);
        this.clockify = this.clockify.bind(this);
        this.handleStartToggle = this.handleStartToggle.bind(this);
        this.tick = this.tick.bind(this);
        this.handleInDecrement = this.handleInDecrement.bind(this);
        this.handleDefaultBtn = this.handleDefaultBtn.bind(this);
        this.handleLanguage = this.handleLanguage.bind(this);
    }

    handleLanguage() {
        this.setState({
            english: !this.state.english
        });
        if (this.state.english) {
            document.documentElement.setAttribute('lang', 'zh-TW');
        } else {
            document.documentElement.setAttribute('lang', 'en');
        }
    }

    handleReset() {
        this.setState({
            breakLength: 5,
            sessionLength: 25,
            timeLeft: 1500,
            counting: false,
            currentCounting: 'Session',
        });
        // reset should stop the timer as well
        clearInterval(this.intervalID);

        // and the audio
        const audio = document.getElementById('beep');
        audio.pause();
        audio.currentTime = 0;

        // and set the color back to default, if it is changed
        document.getElementById('time-left').style.color = null;

        // and the title
        document.getElementsByTagName('title')[0].text = 'Promodoro Clock';
    }

    handleDefaultBtn(e) {
        // ignore click, while the clock is counting
        if (this.state.counting) return;
        // console.log(e.target.id);
        if (e.target.id.includes('session')) {
            this.setState({
                sessionLength: 25,
                timeLeft: 1500,
                counting: false,
                currentCounting: 'Session',
            });
        } else {
            this.setState({
                breakLength: 5,
                timeLeft: 300,
                counting: false,
                currentCounting: 'Break',
            });
        }
    }

    handleInDecrement(e) {
        // in case the clock is still running, disable handleInDecrement()
        if (this.state.counting) return;
        switch (`${e.currentTarget.id},current:${this.state.currentCounting}`) {
            case 'break-decrement,current:Session':
                if (this.state.breakLength > 1) {
                    this.setState(state => ({
                        breakLength: state.breakLength - 1,
                    }));
                    return;
                } else {
                    return;
                }
            case 'break-increment,current:Session':
                if (this.state.breakLength < 60) {
                    this.setState(state => ({
                        breakLength: state.breakLength + 1
                    }));
                    return;
                } else {
                    return;
                }
            case 'break-decrement,current:Break':
                if (this.state.breakLength > 1) {
                    this.setState(state => ({
                        breakLength: state.breakLength - 1,
                        timeLeft: state.timeLeft - 60,
                    }));
                    return;
                } else {
                    return;
                }
            case 'break-increment,current:Break':
                if (this.state.breakLength < 60) {
                    this.setState(state => ({
                        breakLength: state.breakLength + 1,
                        timeLeft: state.timeLeft + 60,
                    }));
                    return;
                } else {
                    return;
                }
            case 'session-decrement,current:Session':
                if (this.state.sessionLength > 1) {
                    this.setState(state => ({
                        sessionLength: state.sessionLength - 1,
                        timeLeft: state.timeLeft - 60,
                    }));
                    return;
                } else {
                    return;
                }
            case 'session-increment,current:Session':
                if (this.state.sessionLength < 60) {
                    this.setState(state => ({
                        sessionLength: state.sessionLength + 1,
                        timeLeft: state.timeLeft + 60,
                    }));
                    return;
                } else {
                    return;
                }
            case 'session-decrement,current:Break':
                if (this.state.sessionLength > 1) {
                    this.setState(state => ({
                        sessionLength: state.sessionLength - 1,
                    }));
                    return;
                } else {
                    return;
                }
            case 'session-increment,current:Break':
                if (this.state.sessionLength < 60) {
                    this.setState(state => ({
                        sessionLength: state.sessionLength + 1,
                    }));
                    return;
                } else {
                    return;
                }
            default:
                return;

        }

    }

    tick() {

        // change color when time left <= 60
        if (this.state.timeLeft <= 60) {
            document.getElementById('time-left').style.color = "#F8BFCE";
        } else {
            document.getElementById('time-left').style.color = null;
        }
        if (this.state.timeLeft <= 0) {

            clearInterval(this.intervalID);
            const audio = document.getElementById('beep');
            audio.play();
            const newCurrentCounting = (this.state.currentCounting === 'Session') ? 'Break' : 'Session';
            const newTimeLeft = (this.state.currentCounting === 'Session') ? this.state.breakLength * 60 : this.state.sessionLength * 60;

            document.getElementById('time-left').style.color = null;
            this.setState({
                timeLeft: newTimeLeft,
                currentCounting: newCurrentCounting,
            });
            this.intervalID = setInterval(() => { this.tick() }, 1000);
            return;
        };



        this.setState({
            timeLeft: this.state.timeLeft - 1
        });

        document.getElementsByTagName('title')[0].text = `(${this.clockify(this.state.timeLeft)}) Promodoro Clock`;

    }

    handleStartToggle() {
        if (!this.state.counting) {
            this.intervalID = setInterval(() => { this.tick() }, 1000);
        } else {
            clearInterval(this.intervalID);
        }

        this.setState(state => ({
            counting: !this.state.counting,
        }));

    }

    clockify(timeInSecs) {
        let minutes = Math.floor(timeInSecs / 60);
        let seconds = timeInSecs - 60 * minutes;
        // insure mm:ss format at any time
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        minutes = (minutes < 10) ? '0' + minutes : minutes;

        return minutes + ':' + seconds
    }

    render() {
        const mandarinLabel = {
            'Promodoro Clock': '蕃 茄 鐘',
            Session: '工 作',
            Break: '休 息'
        }

        const controlPanelList = ['Break', 'Session'].map((v) => (
            <ControlPanel
                value={v}
                key={`${v}-panel`}
                currentCounting={this.state.currentCounting}
                length={this.state.breakLength}
                handleInDecrement={this.handleInDecrement}
                handleDefaultBtn={this.handleDefaultBtn}
                english={this.state.english}
                mandarinLabel={mandarinLabel} />
        ));
        return (
            <div id='promodoro-panel'>
                <h1>{(this.state.english) ? 'Promodoro Clock' : mandarinLabel['Promodoro Clock']}</h1>
                <button aria-label={`switch language to ${this.state.english ? 'Mandarin' : 'English'}`} id='language-btn' onClick={this.handleLanguage}>{(this.state.english) ? '繁體中文' : 'English'}</button>
                <DisplayPanel
                    timeLeft={this.clockify(this.state.timeLeft)}
                    handleReset={this.handleReset}
                    handleStartToggle={this.handleStartToggle}
                    currentCounting={this.state.currentCounting}
                    english={this.state.english}
                    mandarinLabel={mandarinLabel} />
                <div id='control-panels-group'>
                    {controlPanelList}
                </div>
                <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/tsunghao-huang/react-pomodoro/gh-pages/homeland.mp3"></audio>
            </div>

        )
    }
}

export default Promodoro;