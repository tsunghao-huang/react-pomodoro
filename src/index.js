import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Pomodoro from './components/Pomodoro';
import TodoApp from './components/TodoApp';

const DATA = [
    { id: "todo-0", name: "Eat", completed: true, completedPomodoros: 2, targetPomodoros: 2, current: true },
    { id: "todo-1", name: "Sleep", completed: false, completedPomodoros: 0, targetPomodoros: 0, current: false },
    { id: "todo-2", name: "Repeat", completed: false, completedPomodoros: 0, targetPomodoros: 0, current: false }
];

const LANG_MAP = {
    'Pomodoro': '蕃 茄 鐘',
    Work: '工 作',
    Break: '休 息',
    Todos: '待辦事項',
    Todo: '待辦事項',
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
    'Target Pomodoros': '目標番茄數',
    'Completed Pomodoros': '完成番茄數'
};

function App() {

    const localStorageKey = 'localTodo';
    if (localStorage.getItem(localStorageKey) === null) {
        localStorage.setItem(localStorageKey, JSON.stringify(DATA));
    }
    const localTodo = JSON.parse(localStorage.getItem(localStorageKey));

    const [tasks, setTasks] = useState(localTodo);
    const [lang, setLang] = useState('en');
    const [currentTask, setCurrentTask] = useState(tasks.filter(t => t.current)[0]);

    function updateLocalStorage(updatedTodos) {
        localStorage.setItem(localStorageKey, JSON.stringify(updatedTodos));
        return;
    }

    useEffect(() => {
        updateLocalStorage(tasks);
        setCurrentTask(tasks.filter(t => t.current)[0]);
    }, [tasks]);

    useEffect(() => {
        document.documentElement.setAttribute('lang', lang);
    }, [lang]);

    function handleLanguage() {
        (lang === 'en') ? setLang('zh-TW') : setLang('en');
    }

    function updateTaskProgress(id) {
        const newTaskList = tasks
            .map(task => {
                // if this task has the same ID as the edited task
                if (id === task.id && task.completedPomodoros !== task.targetPomodoros) {
                    return {
                        ...task,
                        ...{
                            completedPomodoros: task.completedPomodoros + 1
                        }
                    };
                }
                return task;
            })
            .map(task => {
                // validate target & completed sessions
                if ((task.targetPomodoros !== 0) && (task.targetPomodoros === task.completedPomodoros)) {
                    return { ...task, completed: true }
                } else if ((task.targetPomodoros !== 0) && (task.targetPomodoros !== task.completedPomodoros)) {
                    return { ...task, completed: false }
                } else {
                    return task;
                }
            })
        setTasks(newTaskList);
    }

    return (
        <div id="App">
            <button aria-label={`switch language to ${(lang === 'en') ? 'Mandarin' : 'English'}`} id='language-btn' onClick={handleLanguage}>{(lang === 'en') ? '繁體中文' : 'English'}</button>
            <Pomodoro
                lang={lang}
                LANG_MAP={LANG_MAP}
                currentTask={currentTask}
                updateTaskProgress={updateTaskProgress}
            />
            <TodoApp
                tasks={tasks}
                lang={lang}
                LANG_MAP={LANG_MAP}
                setTasks={setTasks}
            />
        </div>

    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);