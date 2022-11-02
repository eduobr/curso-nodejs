let nombre = 'Deadpool';
let real = 'Wade Winston';

//console.log(nombre +' '+ real);
//console.log(`${1+2}`);

let nombreCompleto = nombre + ' ' +real;
let nombreTemplate = `${nombre} ${real}`;

//sintacticamente son iguales
console.log(nombreCompleto == nombreTemplate);

function getNombre(){
	return `${nombre} ${real}`;
}

//podemos usar template literales de funciones
console.log(`El nombre de ${getNombre()}`);