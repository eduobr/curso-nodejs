/*
Streams
    'Chorros' de información que se transmiten en 'Pedazos' (Chunks)
    3 tipos: Lectura / Escritura / Duplex
    Instancias de EventEmitter
    Acceso asincrono
    Es raro crear streams directamente
    Pero muchos recursos nos ofrecen este interfaz
    Detrás de muchos mecanismos de Node.js
        stdin/stdout
        request de HTTP
        Sockets
        Manipulación de ficheros/imágenes

*/

'use strict'

var fs = require('fs'),
    readStream = fs.createReadStream('assets/nombres.txt'),
    writeStream = fs.createWriteStream('assets/nombre_copia.txt')

/*    readStream.pipe(writeStream)

    //el evento data hace que mientras haya datos
    readStream.on('data', function(chunk){
    	console.log(
    		'He leido',
    		chunk.length,
    		'caracteres')
    })

    readStream.on('end',function(){
    	console.log('Termine de leer el archivo')
    })
*/

//el metodo .pipe es terminante como end, osea que se necesita una
//intancia del objeto para ejecutarlo de forma independiente
readStream.pipe(writeStream)

readStream.on('data', function(chunk){
    console.log(
    	'He leido',
    	chunk.length,
    	'caracteres')
    })
    .on('end',function(){
    	console.log('Termine de leer el archivo')
    })
