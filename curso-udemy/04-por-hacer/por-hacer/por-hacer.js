const fs = require('fs');

let listadoPorHacer=[];


const guardarDB = () =>{
	let data=JSON.stringify(listadoPorHacer);
	fs.writeFile('db/data.json',data,(err)=>{
		if (err) {
			throw new Error('No se pudo grabar',err);
		}else{
			console.log('Archivo data.json guardado correctamente')
		}
	})
}

const cargarDB = () => {
	try {
		listadoPorHacer = require('../db/data.json');
	} catch(e) {
		listadoPorHacer = [];
	}
	
}

const crear = (descripcion)=>{
	cargarDB();
	let porHacer = {
		descripcion,
		completado:false
	};

	listadoPorHacer.push(porHacer);
	guardarDB();

	return porHacer;
}

const getListado = (c) =>{
		cargarDB();
		console.log(c);
		let valor = (c==="true")
		if (c===undefined) {
			return listadoPorHacer;
		}
		else {
			let lista = listadoPorHacer.filter(tarea=>tarea.completado===valor);
			return lista;
		}
		
}

const actualizar = (descripcion,completado=true)=>{
	cargarDB();
	let index = listadoPorHacer.findIndex(tarea=>tarea.descripcion === descripcion);
	if (index>=0) {
		listadoPorHacer[index].completado = completado
		guardarDB();
		return true;
	}else{
		return false;
	}
}

const borrar = (descripcion)=>{
	cargarDB();
	if (listadoPorHacer.some(tarea=>tarea.descripcion === descripcion)) {
		let porHacerTemp = listadoPorHacer.filter(tarea=>tarea.descripcion!=descripcion);
		listadoPorHacer = porHacerTemp;
		guardarDB();
		return true;
	}else{
		return false;
	}	
}

module.exports = {
	crear,
	getListado,
	actualizar,
	borrar
}