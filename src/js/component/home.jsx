import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tareas, setTareas] = useState([
		
	]);

	const [inputValue, setInputValue] = useState ("");
	
	const controlarInput = (e) => {
		setInputValue(e.target.value) 
	}
	const controlarEnter = (e) => {
		if (e.key === 'Enter') {
			setTareas(tareas.concat(inputValue));
			setInputValue ("");
		}
	}
	
	const deleteItems = (e) => {
		setTareas((prevState) =>
		  prevState.filter((tarea, index) => index !== e)
		);
	  };
	


	return (
		<div className="container">
			<div className="text-center txt-light my-4">
				<h1><strong>Todo LIST</strong></h1>
				<ul>
					<li><input className= "form-control m-auto" type="text" onChange={controlarInput} onKeyDown={controlarEnter} value={inputValue} placeholder="Ojalá funcione" ></input> </li>
					{tareas.map((t, index) => <li key={index}>{t} <button onClick={() => deleteItems (index)}><i className="fa-solid fa-trash"></i></button></li>)}
			
				</ul>	
			</div>

				<div className="text-center text-bold my-4 total"> {tareas.length} tasks </ div>

		</div>
	);
};

export default Home;