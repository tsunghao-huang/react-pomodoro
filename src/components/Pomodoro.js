import React from 'react';
import ControlPanel from './Pomodoro-sub/ControlPanel';
import DisplayPanel from './Pomodoro-sub/DisplayPanel';

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLength: 5,
            workLength: 25,
            timeLeft: 1500,
            counting: false,
            currentCounting: 'Work',
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
            workLength: 25,
            timeLeft: 1500,
            counting: false,
            currentCounting: 'Work',
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
        document.getElementsByTagName('title')[0].text = 'Pomodoro Clock';
    }

    handleDefaultBtn(e) {
        // ignore click, while the clock is counting
        if (this.state.counting) return;
        // console.log(e.target.id);
        if (e.target.id.includes('work')) {
            this.setState({
                workLength: 25,
                timeLeft: 1500,
                counting: false,
                currentCounting: 'Work',
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
            case 'break-decrement,current:Work':
                if (this.state.breakLength > 1) {
                    this.setState(state => ({
                        breakLength: state.breakLength - 1,
                    }));
                    return;
                } else {
                    return;
                }
            case 'break-increment,current:Work':
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
            case 'work-decrement,current:Work':
                if (this.state.workLength > 1) {
                    this.setState(state => ({
                        workLength: state.workLength - 1,
                        timeLeft: state.timeLeft - 60,
                    }));
                    return;
                } else {
                    return;
                }
            case 'work-increment,current:Work':
                if (this.state.workLength < 60) {
                    this.setState(state => ({
                        workLength: state.workLength + 1,
                        timeLeft: state.timeLeft + 60,
                    }));
                    return;
                } else {
                    return;
                }
            case 'work-decrement,current:Break':
                if (this.state.workLength > 1) {
                    this.setState(state => ({
                        workLength: state.workLength - 1,
                    }));
                    return;
                } else {
                    return;
                }
            case 'work-increment,current:Break':
                if (this.state.workLength < 60) {
                    this.setState(state => ({
                        workLength: state.workLength + 1,
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
            const newCurrentCounting = (this.state.currentCounting === 'Work') ? 'Break' : 'Work';
            const newTimeLeft = (this.state.currentCounting === 'Work') ? this.state.breakLength * 60 : this.state.workLength * 60;

            document.getElementById('time-left').style.color = null;
            this.setState({
                timeLeft: newTimeLeft,
                currentCounting: newCurrentCounting,
            });
            this.intervalID = setInterval(() => { this.tick() }, 1000);

            // update currentTask progress
            if (this.props.currentTask && newCurrentCounting === 'Break') {
                this.props.updateTaskProgress(this.props.currentTask.id);
            }
            return;
        };



        this.setState({
            timeLeft: this.state.timeLeft - 1
        });

        document.getElementsByTagName('title')[0].text = `(${this.clockify(this.state.timeLeft)}) Pomodoro Clock`;

    }

    handleStartToggle() {
        const audio = document.getElementById('beep');
        audio.play();
        audio.pause();
        audio.currentTime = 0;
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

        const controlPanelList = ['Break', 'Work'].map((v) => (
            <ControlPanel
                value={v}
                key={`${v}-panel`}
                currentCounting={this.state.currentCounting}
                length={(v === 'Break') ? this.state.breakLength : this.state.workLength}
                handleInDecrement={this.handleInDecrement}
                handleDefaultBtn={this.handleDefaultBtn}
                lang={this.props.lang}
                LANG_MAP={this.props.LANG_MAP}
            />
        ));
        return (
            <div id='pomodoro-panel'>
                <h1>{(this.props.lang === 'en') ? 'Pomodoro Clock' : this.props.LANG_MAP['Pomodoro Clock']}</h1>
                <DisplayPanel
                    timeLeft={this.clockify(this.state.timeLeft)}
                    handleReset={this.handleReset}
                    currentCounting={this.state.currentCounting}
                    lang={this.props.lang}
                    LANG_MAP={this.props.LANG_MAP}
                    handleStartToggle={this.handleStartToggle}
                    counting={this.state.counting}
                    currentTask={this.props.currentTask}
                />
                <div id='control-panels-group' className='btn-group'>
                    {controlPanelList}
                </div>
                <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/tsunghao-huang/react-pomodoro/gh-pages/homeland.mp3"></audio>
            </div>

        )
    }
}

export default Pomodoro;