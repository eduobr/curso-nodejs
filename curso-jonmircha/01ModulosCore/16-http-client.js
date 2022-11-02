'use strict'

var http = require( 'http' ),
    options = {
        host: 'jonmircha.com',
        port: 80,
        path: '/en'
    }


http
    .get( options, function( res ) {
        console.log( `El sitio ${options.host} ha respondido. Código de Estado: ${res.statusCode}` )
    } )
    //la damos un evento de error cuando 
    .on( 'error', function( err ) {
        console.log( `El sitio ${options.host} no respondido. Código de estado: ${err.code}. Error: ${err.message}` )
    } )