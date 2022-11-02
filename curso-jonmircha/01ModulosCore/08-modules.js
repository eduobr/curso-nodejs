'use strict'
var myData = require( './my-data.js' ),
    //Clock = require( './clock-es5' ),
    Clock = require( './clock-es6' ),
    cucu = new Clock()

console.log( myData.name, myData.email, myData._phone //este elemento aparece como undefined ya que no lo hemos exportado
)


//on y emit pertenecena la clase EventEmmiter por lo que si a Clock
//no le heredamos metodos de EventEmitter esta no funcionara
cucu.on( 'tictac', function() { //el objeto inicializa el evento tictac
    cucu.theTime() //cuando inicialize el evento tictac ejecute la función theTime()
} )