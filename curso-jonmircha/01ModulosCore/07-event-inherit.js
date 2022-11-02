'use strict'

var EventEmitter = require('events').EventEmitter,
    inherits = require('util').inherits //exporta el modulo inherits(herencia) de util lo que permite
                                        //que un objeto herede sus caracteristicas a otros

var Clock = function()
{
	var self = this

	setInterval(function(){
		//console.log('Hola')
		self.emit('tictac') //el mismo objeto emita el evento tictac
	}, 1000)
}

var cucu = new Clock()

//inherits(constructor(elementoHijo),superConstructor(clasePadre))
inherits(Clock, EventEmitter)

Clock.prototype.theTime = function() //extiende el prototipo del objeto clock
{                                    //y le agrega un metodo llamado the time
	var date = new Date(),
	    hrs = date.getHours(),
	    min = date.getMinutes(),
	    sec = date.getSeconds(),
	    msg = hrs+':'+min+':'+sec

	console.log(msg)
}

cucu.on('tictac',function(){ //el objeto inicializa el evento tictac
	cucu.theTime()           //cuando inicialize el evento tictac ejecute la función theTime()
})

//on y emit pertenecena la clase EventEmmiter por lo que si a Clock
//no le heredamos metodos de EventEmitter esta no funcionara