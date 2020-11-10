import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Pomodoro from './components/Pomodoro';
import TodoApp from './components/TodoApp';

function App() {
    return (
        <div>
            <Pomodoro />
            <TodoApp />
        </div>

    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);