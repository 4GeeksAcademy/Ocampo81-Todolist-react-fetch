import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tareas, setTareas] = useState([])

	const [inputValue, setInputValue] = useState ("")
	
	const controlarInput = (e) => {
		setInputValue(e.target.value);
	};

	const controlarEnter = (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			setTareas([...tareas, inputValue]);
			setInputValue("");
		}
	};

	const deleteItems = (index) => {
		setTareas((prevState) =>
			prevState.filter((_, i) => i !== index)
		);
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
								{tarea}
								<button onClick={() => deleteItems(index)} className="delete-button">
									<i className="fas fa-trash-alt"></i>
								</button>
							</li>
						))
					)}
				</ul>
			</div>
			<div className="text-bold my-4 total">{tareas.length} tasks</div>
		</div>
	);
};

export default Home;