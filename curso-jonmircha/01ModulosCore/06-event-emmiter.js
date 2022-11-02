//La emisión de eventos de node lo hace a través del patron observador

'use strict'

var EventEmitter = require('events').EventEmitter,
    pub = new EventEmitter()

pub
    .on('myevent', function(message){
	    console.log(message)
    })

   .once('myevent', function(message){//se ejecuta solo la primera vez que escucha el evento
	    console.log('Se emite la primera vez '+message)
    })

pub.emit('myevent','Soy un emisor de eventos')//permite emitir un evento es igual que el end
pub.emit('myevent', 'Volviendo a emitir')
pub.removeAllListeners('myevent') //remueve los eventos por lo que el tercero no se ejecutaria
pub.emit('myevent','Volviendo a emitir por tercera vez')