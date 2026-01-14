import { useState } from 'react'
import './TodoApp.css'

export default function TodoApp() {

    // lista de tarefas

    const [todos, setTodos] = useState([]);

    // estado de texto do input

    const [inputValue, setInputValue] = useState("");

    // adicionar tarefa

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputValue.trim() !== "") {

            const newTodo = {
                id: Date.now(),
                text: inputValue,
            };

            setTodos((prevTodos) => [...prevTodos, newTodo]);

            setInputValue("");
        }
    };

    return (
        <div className="todo-app">

            <h2 className="title">LISTA DE TAREFAS</h2>

            {/* form para adicionar tarefas */}

            <form onSubmit={handleSubmit} className="form-container">
                <input type="text" className="input-field" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Adicione uma tarefa...' />
                <input type="submit" className="add-button" value="Adicionar" />
            </form>

            {/* lista de tarefas */}

            {todos.length === 0 && <p className="empty">Não há tarefas</p>}

            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        <input type="checkbox" className="input-check" />
                        {todo.text}
                    </li>
                ))}
            </ul>

        </div>
    );
}