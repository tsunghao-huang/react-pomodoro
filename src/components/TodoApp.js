import React, { useState, useRef, useEffect } from 'react';
import "./TodoApp.css";
import Form from "./TodoApp-sub/Form";
import FilterButton from "./TodoApp-sub/FilterButton";
import Todo from "./TodoApp-sub/Todo";
import { nanoid } from "nanoid";
import usePrevious from "./TodoApp-sub/utils";

const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function TodoApp(props) {

    // const localStorageKey = 'localTodo';
    // if (localStorage.getItem(localStorageKey) === null) {
    //     localStorage.setItem(localStorageKey, JSON.stringify(props.tasks));
    // }
    // const localTodo = JSON.parse(localStorage.getItem(localStorageKey));
    // const [tasks, setTasks] = useState(localTodo);


    // function updateLocalStorage(updatedTodos) {
    //     localStorage.setItem(localStorageKey, JSON.stringify(updatedTodos));
    //     return;
    // }
    // const [tasks, setTasks] = useState(props.tasks);
    const tasks = props.tasks;

    const [filter, setFilter] = useState('All');

    function addTask(name, targetSessions) {
        const sanitizedName = name.replace(/(^\s*)|(\s*$)/g, "");
        const newTask = {
            id: "todo-" + nanoid(),
            name: sanitizedName,
            completed: false,
            completedSessions: 0,
            targetSessions: (targetSessions === "") ? 0 : parseInt(targetSessions)
        };
        props.setTasks([...tasks, newTask]);
    }

    function toggleTaskCompleted(e, id) {
        e.stopPropagation();
        const updatedTasks = tasks
            .map(task => {
                // if this task has the same ID as the edited task
                if (id === task.id) {
                    // use object spread to make a new obj
                    // whose `completed` prop has been inverted
                    return { ...task, completed: !task.completed }
                }
                return task;
            })
            .map(task => { // update completedSessions with toggle
                if (task.completed) {
                    return { ...task, completedSessions: parseInt(task.targetSessions) };
                } else if (task.completedSessions === task.targetSessions) {
                    // task not completed but have the same completed & target sessions
                    // reset completedSessions to 0;
                    return { ...task, completedSessions: 0 };
                }
                return task;
            })
        props.setTasks(updatedTasks);
    }

    function updateCurrentTask(id) {
        const updatedTasks = tasks.map((task) => {
            if (id === task.id) {
                return { ...task, current: true };
            } else {
                return { ...task, current: false };
            }
        })
        props.setTasks(updatedTasks);
        const currentTask = updatedTasks.filter(task => task.current)[0]
        props.handleCurrentTask(currentTask);

    }

    function deleteTask(e, id) {
        e.stopPropagation();
        const remainingTasks = tasks.filter(task => id !== task.id);
        props.setTasks(remainingTasks);
    }

    function editTask(id, newName, newCompletedSessions, newTargetSessions) {
        const sanitizedNewName = newName.replace(/(^\s*)|(\s*$)/g, "");
        const editedTaskList = tasks
            .map(task => {
                // if this task has the same ID as the edited task
                if (id === task.id) {
                    //
                    return {
                        ...task,
                        ...{
                            name: sanitizedNewName,
                            completedSessions: (newCompletedSessions === "") ? 0 : parseInt(newCompletedSessions),
                            targetSessions: (newTargetSessions === "") ? 0 : parseInt(newTargetSessions)
                        }
                    };
                }
                return task;
            })
            .map(task => { // validate target & completed sessions
                if ((task.targetSessions !== 0) && (task.targetSessions === task.completedSessions)) {
                    return { ...task, completed: true }
                } else if ((task.targetSessions !== 0) && (task.targetSessions !== task.completedSessions)) {
                    return { ...task, completed: false }
                } else {
                    return task;
                }
            })

        props.setTasks(editedTaskList);
    }

    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .map(task => (
            <Todo
                id={task.id}
                name={task.name}
                completed={task.completed}
                key={task.id}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}
                lang={props.lang}
                LANG_MAP={props.LANG_MAP}
                completedSessions={task.completedSessions}
                targetSessions={task.targetSessions}
                updateCurrentTask={updateCurrentTask}
            />
        ));

    const filterList = FILTER_NAMES.map(name => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
            lang={props.lang}
            LANG_MAP={props.LANG_MAP}
        />
    ));

    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
    let headingText;

    if (props.lang === 'en') {
        switch (filter) {
            case 'All':
                headingText = `${taskList.length} ${tasksNoun} in total`;
                break;
            default:
                headingText = `${taskList.length} ${tasksNoun} ${filter.toLowerCase()}`;
        }

    } else {
        headingText = `${props.LANG_MAP[filter]} ${taskList.length} 件事`;
    }

    const listHeadingRef = useRef(null);
    const prevTaskLength = usePrevious(tasks.length);

    useEffect(() => {
        if (tasks.length - prevTaskLength === -1) {
            listHeadingRef.current.focus();
        }
    }, [tasks.length, prevTaskLength]);

    return (
        <div id="todoapp" className="stack-large">
            <h1>{(props.lang === 'en') ? 'Todos' : props.LANG_MAP['Todos']}</h1>
            <Form addTask={addTask} lang={props.lang} LANG_MAP={props.LANG_MAP} />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
                {headingText}
            </h2>
            <ul
                role="list"
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {taskList}

            </ul>
        </div>
    );
}