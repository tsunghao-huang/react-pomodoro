import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Pomodoro from './components/Pomodoro';
import TodoApp from './components/TodoApp';

const DATA = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false }
];

function App() {
    return (
        <div id="App">
            <Pomodoro />
            <TodoApp tasks={DATA} />
        </div>

    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);