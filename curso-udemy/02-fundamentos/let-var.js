//Siempre debemos usar let ya que con let no podemos
//declarar dos veces la misma variable dentro del mismo scope

/*let nombre = 'Wolverine';

if (true) {
	let nombre = 'Magneto';
}
nombre = 'Wolverine4'
console.log(nombre);¨*/

/*Si usamos nuestro for con var el ultimo console
 log nos mostrara un numero 6 ya que la variable i ya
 fue inicializada
for (var i = 0; i <= 5; i++){
	console.log(`i: ${i}`);
}
console.log(i);
*/

//En este caso el ultimo console log nos mostrara undefined
//ya que la variable i solo fue creada dentro del scope del let
let i;

for (let i = 0; i <= 5; i++){
	console.log(`i: ${i}`);
}

console.log(i);
