let empleados = [{
    id: 1,
    nombre: 'Eduardo'
}, {
    id: 2,
    nombre: 'Melissa'
}, {
    id: 3,
    nombre: 'Juan'
}];
let salarios = [{
    id: 1,
    salario: 1000
}, {
    id: 2,
    salario: 2000
}];
let getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        let empleadoDB = empleados.find(empleado => empleado.id === id);
        if (!empleadoDB) {
            reject(`No existe un empleado con el ID ${id}`);
        } else {
            resolve(empleadoDB);
        }
    });
}
let getSalario = (empleado) => {
    return new Promise((resolve, reject) => {
        let salarioDB = salarios.find(salario => salario.id === empleado.id);
        if (!salarioDB) {
            reject(`No existe un salario para el empleado ${empleado.id}`);
        } else {
            resolve({
                nombre: empleado.nombre,
                salario: salarioDB.salario,
                id: empleado.id
            });
        }
    })
}

let getNombre = (empleado) => {
    return new Promise((resolve, reject) => {
        if (!empleado) {
            reject('No me diste un nombre')
        } else {
            resolve(empleado)
        }
    })
}

getEmpleado(2).then(empleado => {
    return getSalario(empleado)
}).then(resp => {
    console.log(`El salario de ${resp.nombre} es de ${resp.salario}`);
    return getNombre(resp);
}).then(resp=>{
	console.log(`El empleado es ${resp.nombre}`);
})
.catch(err => {
    console.log(err);
})