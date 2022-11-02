/*URL
Este módulo dispone de utilidades para la resolución y analisis de URLs

Query String
Este módulo proporciona utilidades para hacer frente a las cadenas de consulta
*/

'use strict'

var http = require( 'http' ).createServer( webServer ),
    path = require( 'path' ),
    url = require( 'url' ),
    urls = [ {
        id: 1,
        route: '',
        output: '<h2>Home</h2>'
    }, {
        id: 2,
        route: 'acerca',
        output: '<h2>Acerca</h2>'
    }, {
        id: 3,
        route: 'contacto',
        output: '<h2>Contacto</h2>'
    } ]

//req y res son del http
function webServer( req, res ) {
    var message = '<h1>Hola Node.js</h1>',
        pathURL = path.basename( req.url ), //omite la ruta y extrae la parte final

        //con true le estamos diciendo que ejecute querystring
        //la propiedad query me permite analizar paso de parametros
        //id es un parametro por lo que se tiene que mandar así: ?id=numero
        id = url.parse( req.url, true ).query.id //toma una cadena de texto url y retorna un objeto

    console.log( `path: ${pathURL}, id: ${id}` )

    console.log( pathURL )
    urls.forEach( function( pos ) {
        if ( pos.route == pathURL || pos.id == id ) {
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