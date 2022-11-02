'use strict'

//función anonima
var Clock = ( function() {
    var EventEmitter = require( 'events' ).EventEmitter,
        inherits = require( 'util' ).inherits //exporta el modulo inherits(herencia) de util lo que permite
    //que un objeto herede sus caracteristicas a otros

    //Constructor
    var Clock = function() {
        var self = this // le paso el contexto clock
        setInterval( function() {
            //console.log('Hola')
            self.emit( 'tictac' ) //el mismo contexto emita el evento tictac
        }, 1000 )
    }

    //inherits(constructor(elementoHijo),superConstructor(clasePadre))
    inherits( Clock, EventEmitter )

    Clock.prototype.theTime = function() //extiende el prototipo del objeto clock y le agrega un metodo llamado the time
    { //en ES5 no hay clases hay prototipos
        var date = new Date(),
            hrsAmPm = ( date.getHours() > 12 ? date.getHours() - 12 : date.getHours ),
            hrs = addZero( hrsAmPm ),
            min = addZero( date.getMinutes() ),
            sec = addZero( date.getSeconds() ),
            ampm = ( date.getHours() < 12 ) ? ' am' : ' pm',
            msg = hrs + ':' + min + ':' + sec + ampm

        function addZero( num ) {
            return ( num < 10 ) ? ( '0' + num ) : num
        }
        console.log( msg )
    }

    return Clock
} )()
//on y emit pertenecena la clase EventEmmiter por lo que si a Clock
//no le heredamos metodos de EventEmitter esta no funcionara
module.exports = Clock;