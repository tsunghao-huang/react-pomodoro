import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Promodoro from './components/Promodoro';

function App() {
    return (
        <div>
            <Promodoro />
        </div>

    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);