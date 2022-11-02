'use strict'

var express = require('express'),
    router = express.Router();

function pug(req,res,next){
	let locals = {
		title:'Pug',
		link:'https://pugjs.org/',
		description:'Este es un archivo PUG',
	}
	res.render('index',locals)
}

function ejs(req,res,next){
	let locals = {
		title:'EJS',
		link:'http://www.embeddedjs.com/',
		description:'Este es un archivo EJS',
		nombre: 'EJS',
		seasons:[
			['Primavera',['Abril','Mayo','Junio']],
			['Verano',['Julio','Agosto','Septiembre']],
			['Otoño',['Octubre','Noviembre','Diciembre']],
			['Invierno',['Enero','Febrero','Marzo']],
		] 
	}
	res.render('index',locals)
}

function error404(req, res, next)
{
	let error = new Error()
	let locals={
		title:'Error 404',
		description: 'Recurso no encontrado',
		error: error
	}
	error.status = 404
	res.render('error',locals)
	next() //ejecuta el siguiente middleware dentro de la pila de middleware
}



router
	.get('/',(req,res)=>{
		res.end('<h1>Terminamos la configuraci&oacute;n de nuestra primer app en express</h1>');
	})
	.get('/pug',pug)
	.get('/ejs',ejs)
	.use(error404) //este middleware de error tiene que estar al final de las rutas

module.exports = router