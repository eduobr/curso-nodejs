'use strict'
//El sniffer busca lo que hay en otro sitio
var http = require( 'http' ),
    options = {
        host: 'www.comocreartuweb.com',
        port: 80,
        path: '/'
    },
    htmlCode = ''

function httpClient( res ) {
    console.log( `El sitio ${options.host} ha respondido. Código de Estado: ${res.statusCode}` )
    //le asignamos el evento data, esto significa que mientras haya datos va a ejecutar la función
    //el evento data envia pedazos del stream
    res.on( 'data', function( data ) {
        htmlCode += data
        console.log( data,
            data.toString() //convierte el data a cadena de texto
        )
    } )
}

function httpError( err ) {
    console.log( `El sitio ${options.host} no respondido. Código de estado: ${err.code}. Error: ${err.message}` )
}

function webServer( req, res ) {
    res.writeHead( 200, {
        'Content-Type': 'text/html'
    } )
    res.end( htmlCode )
}

//instancia de servidor
http
    .get( options, httpClient )
    //la damos un evento de error cuando 
    .on( 'error', httpError )
http
    .createServer( webServer ) //createServer y listen son de servidor por lo que se tiene                            
    .listen( 3000 ) //que crear una nueva instancia de servidor

console.log( 'Servido corriendo en http://localhost:3000/' )