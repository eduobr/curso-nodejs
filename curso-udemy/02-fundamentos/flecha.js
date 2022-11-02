//function sumar(a,b){
	//return a+b;
//}

//let sumar=(a,b)=>a +b;

//console.log(sumar(10,20));

//function saludar(){
	//return 'Hola Mundo';
//}

//let saludar=()=>'Hola Mundo';

//console.log(saludar());

//function saludar(nombre){
	//return `Hola ${nombre}`;
//}


let saludar = (nombre) => `Hola ${nombre}`;

console.log(saludar('edu'));

let hulk={
	nombre:"Hulk",
	smash(){
		setTimeout(()=>console.log(`${this.nombre}  smash`),1500);
	}
};

hulk.smash();


