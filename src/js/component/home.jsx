import React, { useState, useEffect } from "react";
import User from "./User";

const Home = () => {
    const [tareas, setTareas] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [user, setUser] = useState(null);
    const [taskLength, setTaskLength] = useState(0);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/Ocampo81");
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                setTareas(userData.todos);
                setTaskLength(userData.todos.length);
            } else {
                await createUser();
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const createUser = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/Ocampo81", {
                method: 'POST'
            });
            if (response.ok) {
                alert('User created!');
                fetchUser();
            }
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = async (e) => {
        if (e.key === "Enter" && inputValue.trim()) {
            await addTask(inputValue);
            setInputValue("");
        }
    };

    const addTask = async (task) => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/todos/Ocampo81", {
                method: "POST",
                body: JSON.stringify({ label: task, is_done: false }),
                headers: { "Content-Type": "application/json" }
            });
            if (response.ok) {
                fetchUser();
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                fetchUser();
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const clearTasks = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/Ocampo81", {
                method: 'DELETE'
            });
            if (response.ok) {
                setTareas([]);
                setTaskLength(0);
            }
        } catch (error) {
            console.error("Error clearing tasks:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">TODOS</h1>
            {user && <User name={user.name} />}
            <div className="input-list-container">
                <input
                    className="form-control"
                    type="text"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    value={inputValue}
                    placeholder="No hay tareas, agregue alguna"
                />
                <ul className="list-container">
                    {tareas.length === 0 ? (
                        <li className="no-tasks">No hay tareas, agrega alguna</li>
                    ) : (
                        tareas.map((tarea) => (
                            <li key={tarea.id} className="task">
                                {tarea.label}
                                <button onClick={() => deleteTask(tarea.id)} className="delete-button">
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <div className="text-bold my-4 total">{taskLength} tasks</div>
            <button onClick={clearTasks} className="btn btn-danger mt-4">Limpiar todas las tareas</button>
        </div>
    );
};

export default Home;
