import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const mandarinLabel = {
    Session: '工作',
    Break: '休息'
}


class ControlPanel extends React.Component {
    render() {
        return (
            <div id={`${this.props.value.toLowerCase()}-panel`} className='control-panel'>
                <button id={`default-${this.props.value.toLowerCase()}`} onClick={this.props.handleDefaultBtn}>{(this.props.english) ? this.props.value : mandarinLabel[this.props.value]}</button>
                <h2 id={`${this.props.value.toLowerCase()}-label`}>{(this.props.english) ? `Custom ${this.props.value}` : `自訂${mandarinLabel[this.props.value]}`}</h2>
                <button id={`${this.props.value.toLowerCase()}-decrement`} onClick={this.props.handleInDecrement} className='btn-level'>
                    <i className="fa fa-arrow-down fa-2x" aria-hidden="true"></i>
                </button>

                <p id={`${this.props.value.toLowerCase()}-length`} className='btn-level'>{this.props.length}</p>

                <button id={`${this.props.value.toLowerCase()}-increment`} onClick={this.props.handleInDecrement} className='btn-level'>
                    <i className="fa fa-arrow-up fa-2x" aria-hidden="true"></i>
                </button>

            </div>

        )
    }
}

function DisplayPanel(props) {
    return (
        <div id='display-panel'>
            <h2 id='timer-label'>{(props.english) ? props.currentCounting : mandarinLabel[props.currentCounting]}</h2>
            <p id='time-left'>{props.timeLeft}</p>

            <div>
                <button id="start_stop" onClick={props.handleStartToggle} className='btn-level'>
                    <i className="fa fa-play fa-3x"></i>
                    <i className="fa fa-pause fa-3x"></i>
                </button>
                <button id="reset" onClick={props.handleReset} className='btn-level'>
                    <i className="fa fa-refresh fa-3x"></i>
                </button>
            </div>

        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            timeLeft: 1500,
            counting: false,
            currentCounting: 'Session',
            english: false
        };
        this.handleReset = this.handleReset.bind(this);
        this.clockify = this.clockify.bind(this);
        this.handleStartToggle = this.handleStartToggle.bind(this);
        this.tick = this.tick.bind(this);
        this.handleInDecrement = this.handleInDecrement.bind(this);
        this.handleDefaultBtn = this.handleDefaultBtn.bind(this);
        this.handleLanguage = this.handleLanguage.bind(this);
    }

    handleLanguage () {
        this.setState({
            english: !this.state.english
        });
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
                breakLength: 5,
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
            document.getElementById('time-left').style.color = "rgb(175, 81, 78)";
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
        return (
            <div>
                <h1>{(this.state.english) ? 'Promodoro Clock' : '蕃 茄 鐘'}</h1>
                <button id='language-btn' onClick={this.handleLanguage}>{(this.state.english) ? '繁體中文' : 'English'}</button>
                <DisplayPanel timeLeft={this.clockify(this.state.timeLeft)} handleReset={this.handleReset}
                    handleStartToggle={this.handleStartToggle} currentCounting={this.state.currentCounting} english={this.state.english} />
                <div id='control-panels-group'>
                    <ControlPanel value={'Break'} length={this.state.breakLength} handleInDecrement={this.handleInDecrement} handleDefaultBtn={this.handleDefaultBtn} english={this.state.english} />
                    <ControlPanel value={'Session'} length={this.state.sessionLength} handleInDecrement={this.handleInDecrement} handleDefaultBtn={this.handleDefaultBtn} english={this.state.english} />
                </div>

                <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
            </div>

        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);