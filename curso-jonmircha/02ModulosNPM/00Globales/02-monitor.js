'use strict'
var http = require( 'http' ).createServer( webServer ),
    fs = require( 'fs' )

function webServer( req, res ) {
    //la mayoria de  los modulos de node el primer parametro es para saber si hay un error
    function readFile( err, data ) {
        if ( err ) throw err
        res.end( data ) //termina el envio de datos al cliente
    }

    res.writeHead( 200, {
        'Content-Type': 'text/plain'
    } )

    fs.readFile( 'assets/index.html', readFile )
}

http.listen( 3000 )

console.log( 'Servidor corriendo en http://localhost:3000/' )