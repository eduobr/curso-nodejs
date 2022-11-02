let deadpool={
	nombre: 'Wade',
	apellido: 'Winston',
	poder:'Regeneracion',
	//con ES6 le podemos quitar el :function quedando getNombre()
	getNombre: function(){
		return `${this.nombre} ${this.apellido} - poder ${this.poder}`
	}
};

//let nombre = deadpool.nombre;
//let apellido = deadpool.apellido;
//let poder = deadpool.poder;

let {nombre:primerNombre,apellido,poder} = deadpool;
console.log(primerNombre);
