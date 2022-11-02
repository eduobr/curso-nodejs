let empleados = [{
	id:1,
	nombre:'Eduardo'
},{
	id:2,
	nombre: 'Melissa'
},{
	id:3,
	nombre:'Juan'
}];

let salarios = [{
	id:1,
	salario:1000
},{
	id:2,
	salario:2000
}];

let getEmpleado=(id)=>{
	let empleadoDB = empleados.find(empleado=>empleado.id === id);
	if (!empleadoDB) {
		throw new Error(`No existe un empleado con el ID ${id}`);
	}else{
		return empleadoDB;
	}
}

let getSalario=(empleado)=>{
	let salarioDB = salarios.find(salario=>salario.id === empleado.id);
	if (!salarioDB) {
		throw new Error(`No existe un salario para el empleado ${empleado.id}`);
	}else{
		return{
			nombre:empleado.nombre,
			salario:salarioDB.salario,
			id: empleado.id
		};
	}
}

let getInformacion = async (id) => {
	let empleado = await getEmpleado(id);
	let resp = await getSalario(empleado)

	return `${resp.nombre} tiene un salario de ${resp.salario}`
}

getInformacion(3)
	.then(mensaje => console.log(mensaje))
	.catch(err => console.log(err))