'use strict'

var http = require( 'http' ).createServer( webServer ),
    fs = require( 'fs' ),
    path = require( 'path' ),
    url = require( 'url' ),
    urls = [ {
        id: 1,
        route: '',
        output: 'assets/index.html'
    }, {
        id: 2,
        route: 'acerca',
        output: 'assets/acerca.html'
    }, {
        id: 3,
        route: 'contacto',
        output: 'assets/contacto.html'
    } ]

//req y res son del http y son la petición y respuesta al servidor
function webServer( req, res ) {
    var pathURL = path.basename( req.url ), //omite la ruta y extrae la parte final

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
            //la callback del metodo readfile procesa un error(err) y luego envia los datos(data)
            fs.readFile( pos.output, function( err, data ) {
                if ( err ) throw err
                res.end( data )
            } )
        }
    } )

    //si la respuesta termina abruptamente
    if ( !res.finished ) {
        res.writeHead( 404, {
            'Content-Type': 'text/html'
        } )
        fs.readFile( 'assets/404.html', function( err, data ) {
            if ( err ) throw err
            res.end( data )
        } )
    }
}

http.listen( 3000 )

console.log( 'Servidor corriendo en http://localhost:3000/' )