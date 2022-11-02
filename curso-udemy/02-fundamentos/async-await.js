let getNombre = () =>{
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve('Eduardo');
		},3000)
	});
};

let saludo = async () =>{
	//el await tiene que estar dentro de una función async
	//y hace que la funcion actue como metodo sincrono
	let nombre = await getNombre();
	return `Hola ${nombre}`;
}

saludo().then(nombre=>{
	console.log(nombre);
})
.catch(e=>{
	console.log('Error de ASYNC',e);
})