import { useState, useEffect } from 'react'
import './TodoApp.css'

export default function TodoApp() {

    // estado da lista de tarefas + recuperando tarefas salvas no localStorage
    const [todos, setTodos] = useState(() => {
        // savedTodos (var temporária) recebe a string salva no localStorage
        const savedTodos = localStorage.getItem("todos");
        // se existir algo salvo, converte a string em array de tarefas
        // caso contrário, retorna um array vazio
        return savedTodos ? JSON.parse(savedTodos) : []; 
    });

    // estado de texto do input
    const [inputValue, setInputValue] = useState("");

    // salvar tarefas a cada mudança de "todos" no localStorage
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // adicionar tarefa
    const handleSubmit = (e) => {
        e.preventDefault(); // prevenir comportamento padrão de recarregar a página

        if (inputValue.trim() !== "") {

            const newTodo = {
                id: Date.now(),
                text: inputValue,
            };

            setTodos((prevTodos) => [...prevTodos, newTodo]); 
            setInputValue(""); // limpa input
        }
    };

    // deletar tarefa
    function handleDelete(id) {

        setTodos(prev => prev.filter(item => item.id !== id))  
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
                        {todo.text}
                        <button className="delete-button" onClick={() => handleDelete(todo.id)}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}