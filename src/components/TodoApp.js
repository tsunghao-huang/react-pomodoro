import React from 'react';
import "./TodoApp.css";
import Form from "./TodoApp-sub/Form";
import FilterButton from "./TodoApp-sub/FilterButton";
import Todo from "./TodoApp-sub/Todo";



export default function TodoApp(props) {

    const taskList = props.tasks.map(task => (
        <Todo
            id={task.id}
            name={task.name}
            completed={task.completed}
            key={task.id}
        />
    ));
    return (
        <div className="todoapp stack-large">
            <h1>Todos</h1>
            <Form />
            <div className="filters btn-group stack-exception">
                <FilterButton />
                <FilterButton />
                <FilterButton />
            </div>
            <h2 id="list-heading">
                3 tasks remaining
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