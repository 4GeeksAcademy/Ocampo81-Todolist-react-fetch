import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [tareas, setTareas] = useState([]);
	const [inputValue, setInputValue] = useState("");

	const controlarInput = (e) => {
		setInputValue(e.target.value);
	};

	const getTareas = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/alesanchezr");
			if (!response.ok) {
				throw new Error("Error fetching tasks");
			}
			const data = await response.json();
			if (data && Array.isArray(data)) {
				setTareas(data);
			}
		} catch (error) {
			console.error("Error en el fetch de tareas", error);
		}
	};

	useEffect(() => {
		getTareas();
	}, []);

	const controlarEnter = async (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			const nuevaTarea = { label: inputValue, done: false };
			try {
				const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/alesanchezr', {
					method: "POST",
					body: JSON.stringify(nuevaTarea),
					headers: {
						"Content-Type": "application/json"
					}
				});
				if (!response.ok) {
					throw new Error("Error agregando tarea");
				}
				const data = await response.json();
				setTareas((prevTareas) => [...prevTareas, data]);
				setInputValue("");
			} catch (error) {
				console.error("Error agregando tareas", error);
			}
		}
	};

	const deleteItems = async (index) => {
		const tareaId = tareas[index].id;
		try {
			const response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/alesanchezr/${tareaId}`, {
				method: "DELETE"
			});
			if (!response.ok) {
				throw new Error("Error eliminando tarea");
			}
			setTareas((prevTareas) => prevTareas.filter((_, i) => i !== index));
		} catch (error) {
			console.error("Error eliminando tarea", error);
		}
	};

	const limpiarTareas = async () => {
		try {
			for (let tarea of tareas) {
				const response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/alesanchezr/${tarea.id}`, {
					method: "DELETE"
				});
				if (!response.ok) {
					throw new Error("Error eliminando tarea");
				}
			}
			setTareas([]);
		} catch (error) {
			console.error("Error eliminando tareas", error);
		}
	};

	return (
		<div className="container text-center">
			<h1 className="my-4">TODOS</h1>
			<div className="input-list-container">
				<input
					className="form-control"
					type="text"
					onChange={controlarInput}
					onKeyDown={controlarEnter}
					value={inputValue}
					placeholder="No hay tareas, agregue alguna"
				/>
				<ul className="list-container">
					{tareas.length === 0 ? (
						<li className="no-tasks">No hay tareas, agrega alguna</li>
					) : (
						tareas.map((tarea, index) => (
							<li key={index} className="task">
								{tarea.label}
								<button onClick={() => deleteItems(index)} className="delete-button">
									<i className="fas fa-trash-alt"></i>
								</button>
							</li>
						))
					)}
				</ul>
			</div>
			<div className="text-bold my-4 total">{tareas.length} tasks</div>
			<button onClick={limpiarTareas} className="btn btn-danger mt-4">Limpiar todas las tareas</button>
		</div>
	);
};

export default Home;
