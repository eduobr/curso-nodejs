'use strict'

var http = require('http').createServer(serverUpload),
    util = require('util'),
    formidable = require('formidable'),
    fse = require('fs-extra')

function serverUpload(req, res){
	if(req.method.toLowerCase()=='get' && req.url=="/"){//va a forzar lo que vaya en el method a minusculas
		let form=`
		<h1>Hola Node.js</h1>
		<form action="/upload" enctype="multipart/form-data" method="post">
		   <div><input type="file" name="upload" required=""></div>
		   <div><input type="submit" value="Subir Archivo"></div>
		</form>`
	    res.writeHead(200,{'Content-Type':'text/html'})
	    res.end(form)
    }
    if(req.method.toLowerCase()=='post' && req.url=="/upload"){
       let form = new formidable.IncomingForm()
       form
       	.parse(req,function(err,fields,files){//cuando analize los datos
       		res.writeHead(200,{'Content-Type':'text/html'})
       		res.write(`<h1>Archivos Recibidos</h1>
       		           <a href="/">Regresar</a>}
       		           <br/>
       		           <code>${util.inspect({files:files})}<code>`)//inspect pasa un objeto javascript
       		res.end()
       	})
       	.on('progress',function(bytesReceived,bytesExpected){//cuando el archivo que se este subiendo progrese
       		let percentCompleted = (bytesReceived / bytesExpected)*100
       		console.log(percentCompleted.toFixed(2))//manda con 2 posiciones decimales
       	})
       	.on('error',function(err){//que hace en case de error
       		console.log(err)
       	})
       	.on('end',function(fields,files){//cuando se termine de subir el archivo
       		//Ubicación termporal del archivo
       		//por cada archivo subido va a ocupar una posición del arreglo
       		let tempPath = this.openedFiles[0].path, //this es el formulario, estrae la ruta termporal
       		    filename = this.openedFiles[0].name, //extrae el nombre
       		    //Nueva ubicación
       		    newLocation='./upload/'+filename

       		fse.copy(tempPath,newLocation,function(err){
       			return (err) ? console.log(err) : console.log('El archivo se subió con éxito')
       		})
       	})

       	return
    }
}

http.listen(3000)

console.log('Servidor corriendo en http://localhost:3000/')