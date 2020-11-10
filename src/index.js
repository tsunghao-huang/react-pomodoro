import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Pomodoro from './components/Pomodoro';

function App() {
    return (
        <div>
            <Pomodoro />
        </div>

    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);