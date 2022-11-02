/*Path contiene utilidades para manejar y transformar las
  rutas de los directorios y archivos a formato de cadena.
  el sistema de archivos no es consultado para comprobar si
  los caminos son validos*/
'use strict'

var http = require( 'http' ).createServer( webServer ),
    path = require( 'path' ),
    urls = [ {
        route: '',
        output: '<h2>Home</h2>'
    }, {
        route: 'acerca',
        output: '<h2>Acerca</h2>'
    }, {
        route: 'contacto',
        output: '<h2>Contacto</h2>'
    } ]

//req y res son del http
function webServer( req, res ) {
    var message = '<h1>Hola Node.js</h1>',
        pathURL = path.basename( req.url ) //omite la ruta y extrae la parte final

    console.log( pathURL )
    urls.forEach( function( pos ) {
        if ( pos.route == pathURL ) {
            res.writeHead( 200, {
                'Content-Type': 'text/html'
            } )
            res.end( message + pos.output )

        }
    } )

    //si la respuesta termina abruptamente
    if ( !res.finished ) {
        res.writeHead( 404, {
            'Content-Type': 'text/html'
        } )
        res.end( '<h1>Error 404: Not Found</h1>' )
    }
}

http.listen( 3000 )

console.log( 'Servidor corriendo en http://localhost:3000/' )