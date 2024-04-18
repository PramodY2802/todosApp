import React from 'react';
import { TodoItem } from "./TodoItem";

export const Todos = (props) => {
    return (
        <div className="container my-3" style={{ backgroundColor: 'black' }}>
            <h3 className="text-center my-3" style={{ color: '#fff' }}>Todos List</h3>
            <hr style={{ color: '#fff' }}/>
            <div style={{ maxHeight: '465px', overflowY: 'auto' }}>
                {props.todos.length === 0 ? "No Todos to display" :
                    props.todos.map((todo) => {
                        console.log(todo.sno);
                        return (
                            <TodoItem todo={todo} key={todo.sno} onDelete={props.onDelete} />
                        )
                    })
                }
            </div>
        </div>
    )
}
