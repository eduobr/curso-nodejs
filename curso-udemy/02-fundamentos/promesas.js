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
	return new Promise((resolve, reject)=>{
		let empleadoDB = empleados.find(empleado=>empleado.id === id);
		if (!empleadoDB) {
			reject(`No existe un empleado con el ID ${id}`);
		}else{
			resolve(empleadoDB);
		}
	});
}

let getSalario=(empleado)=>{
	return new Promise((resolve,reject)=>{
		let salarioDB = salarios.find(salario=>salario.id === empleado.id);
		if (!salarioDB) {
			reject(`No existe un salario para el empleado ${empleado.id}`);
		}else{
			resolve({
				nombre:empleado.nombre,
				salario:salarioDB.salario,
				id: empleado.id
			});
		}
	})
}

getEmpleado(3).then(empleado=>{
	console.log('Empleado de BD', empleado);
	getSalario(empleado).then(resp=>{
		console.log(`El empleado: ${resp.nombre} tiene un salario de: ${resp.salario}`);
	},(err)=>{
		console.log(err);
	});
},(err)=>{
	console.log(err);
});

