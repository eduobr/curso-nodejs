let nombre = 'Perro';
//console.log('Hola '+ nombre);
console.log(`Hola ${nombre}`);

const persona = {
	nombre:"Eduardo",
	apellido:"Obreque",
	saludar:function (){
		console.log('Hola '+this.nombre);
	}
}

console.log(persona.saludar());