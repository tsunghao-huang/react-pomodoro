import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Promodoro from './components/Promodoro';
import TodoApp from './components/TodoApp';

function App() {
    return (
        <div>
            <Promodoro />
            <TodoApp />
        </div>

    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);