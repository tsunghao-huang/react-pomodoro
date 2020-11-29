import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Pomodoro from './components/Pomodoro';
import TodoApp from './components/TodoApp';

const DATA = [
    { id: "todo-0", name: "Eat", completed: true, completedSessions: 2, targetSessions: 2 },
    { id: "todo-1", name: "Sleep", completed: false, completedSessions: 0, targetSessions: 0 },
    { id: "todo-2", name: "Repeat", completed: false, completedSessions: 0, targetSessions: 0 }
];

const LANG_MAP = {
    'Pomodoro Clock': '蕃 茄 鐘',
    Session: '工 作',
    Break: '休 息',
    Todos: '待辦事項',
    'What needs to be done?': '有事嗎？',
    Add: '新增',
    All: '全部',
    Active: '待辦',
    Completed: '完成',
    Edit: '編輯',
    Delete: '刪除',
    Check: '標記完成',
    Cancel: '取消',
    Save: '儲存',
    Progress: '進度',
    'Target sessions': '目標番茄數',
    'Completed sessions': '完成番茄數'
};

function App() {

    const [lang, setLang] = useState('en');

    useEffect(() => {
        document.documentElement.setAttribute('lang', lang);
    }, [lang]);

    function handleLanguage() {
        (lang === 'en') ? setLang('zh-TW') : setLang('en');
    }

    return (
        <div id="App">
            <button aria-label={`switch language to ${(lang === 'en') ? 'Mandarin' : 'English'}`} id='language-btn' onClick={handleLanguage}>{(lang === 'en') ? '繁體中文' : 'English'}</button>
            <Pomodoro lang={lang} LANG_MAP={LANG_MAP} />
            <TodoApp tasks={DATA} lang={lang} LANG_MAP={LANG_MAP} />
        </div>

    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);